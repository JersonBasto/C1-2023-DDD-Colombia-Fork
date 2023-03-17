import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from 'src/shared/sofka';
import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import {
  CloseGateDateValueObject,
  CloseGateDomainEntity,
  CloseGateIdValueObject,
  GateAggregateRoot,
  GateDomainEntity,
  GateIdValueObject,
  ICloseGateDomainService,
  RegisteredCloseActionEventPublisher,
  Topic,
} from '../../../domain';
import { IRegisterCloseActionCommand } from '../../../domain/interfaces/commands/register-close-action.command';
import { IRegisteredCloseACtionResponse } from '../../../domain/interfaces/responses/registered-close-action.response';
import { CloseGateDescriptionValueObject } from '../../../domain/value-objects/close-gate/close-date-description/close-gate-description.value-object';
import { DescriptionValueObject } from '../../../domain/value-objects/gate/description/description.value-object';

/**
 *
 * Se crea el caso de uso para registrar la accion de cerrar compuerta
 *
 * @export
 * @class RegisterCloseGateActionUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IRegisterCloseActionCommand, IRegisteredCloseACtionResponse>}
 */
export class RegisterCloseGateActionUseCase
  extends ValueObjectErrorHandler
  implements
    IUseCase<IRegisterCloseActionCommand, IRegisteredCloseACtionResponse>
{
  private readonly gateAggregate: GateAggregateRoot;
  constructor(
    private readonly closeGateService: ICloseGateDomainService,
    private readonly registeredCloseActionEvent: RegisteredCloseActionEventPublisher,
  ) {
    super();
    const events = new Map<Topic, EventPublisherBase<any>>();
    this.gateAggregate = new GateAggregateRoot({
      closeGateService,
      events: events.set(
        Topic.EmergenciesRegisteredCloseAction,
        this.registeredCloseActionEvent,
      ),
    });
  }
  /**
   * Ejecuta la accion de registerCloseAction del agregado Root
   *
   * @param command
   * @returns state: true, message: 'Se registrado la accion', data: result
   */
  async execute(
    command?: IRegisterCloseActionCommand | undefined,
  ): Promise<IRegisteredCloseACtionResponse> {
    //Validaciones
    const closeGateId = new CloseGateIdValueObject(command?.id);
    const closeDate = new CloseGateDateValueObject(command?.date);
    const gate = new GateIdValueObject(command?.gatesClose.id);
    const description = new CloseGateDescriptionValueObject(
      command?.description,
    );
    const descriptionGate = new DescriptionValueObject(
      command?.gatesClose.description,
    );

    //Captura de Errores
    if (closeGateId.hasErrors() === true)
      this.setErrors(closeGateId.getErrors());
    if (closeDate.hasErrors() === true) this.setErrors(closeDate.getErrors());
    if (gate.hasErrors() === true) this.setErrors(gate.getErrors());
    if (description.hasErrors() === true)
      this.setErrors(description.getErrors());
    if (descriptionGate.hasErrors() === true)
      this.setErrors(descriptionGate.getErrors());

    //Validar Errores
    if (this.hasErrors() === true) {
      throw new ValueObjectException(
        'Hay fallos en las validaciones',
        this.getErrors(),
      );
    }

    //Create Entity
    const gateEntity = new GateDomainEntity({
      gateId: command?.gatesClose.id,
      description: command?.gatesClose.description,
    });
    const entity = new CloseGateDomainEntity();
    entity.id = closeGateId.valueOf();
    entity.date = closeDate.valueOf();
    entity.description = description.valueOf();
    entity.gatesClose = gateEntity;

    //Retornar
    const result = await this.gateAggregate.registerCloseAction(entity);
    return { state: true, message: 'Se registrado la accion', data: result };
  }
}
