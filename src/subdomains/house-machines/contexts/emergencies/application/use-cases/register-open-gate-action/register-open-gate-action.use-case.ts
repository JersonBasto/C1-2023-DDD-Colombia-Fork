import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from 'src/shared/sofka';
import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import {
  GateAggregateRoot,
  GateDomainEntity,
  GateIdValueObject,
  IOpenGateDomainService,
  OpenGateDateValueObject,
  OpenGateDomainEntity,
  OpenGateIdValueObject,
  RegisteredOpenedActionEventPublisher,
  Topic,
} from '../../../domain';
import { IRegisterOpenActionCommand } from '../../../domain/interfaces/commands/register-open-action.command';
import { IRegisteredOpenACtionResponse } from '../../../domain/interfaces/responses/registered-open-action.response';
import { OpenGateDescriptionValueObject } from '../../../domain/value-objects/open-gate/open-date-description/open-gate-description.value-object';

/**
 *
 * Se crea el caso de uso para registrar la accion de abrir compuerta
 *
 * @export
 * @class RegisterOpenGateActionUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IRegisterOpenActionCommand, IRegisteredOpenACtionResponse>}
 */
export class RegisterOpenGateActionUseCase
  extends ValueObjectErrorHandler
  implements
    IUseCase<IRegisterOpenActionCommand, IRegisteredOpenACtionResponse>
{
  private readonly gateAggregate: GateAggregateRoot;
  constructor(
    private readonly openGateService: IOpenGateDomainService,
    private readonly registerOpenGateEvent: RegisteredOpenedActionEventPublisher,
  ) {
    super();
    const events = new Map<Topic, EventPublisherBase<any>>();
    this.gateAggregate = new GateAggregateRoot({
      openGateService,
      events: events.set(
        Topic.EmergenciesRegisteredOpenAction,
        this.registerOpenGateEvent,
      ),
    });
  }
  /**
   *
   * Ejecuta la accion registerOpenAction del agregado Root
   *
   * @param command
   * @returns state: true, message: 'Se registrado la accion', data: result
   */
  async execute(
    command?: IRegisterOpenActionCommand | undefined,
  ): Promise<IRegisteredOpenACtionResponse> {
    //Validaciones
    const openGateId = new OpenGateIdValueObject(command?.id);
    const openDate = new OpenGateDateValueObject(command?.date);
    const gateId = new GateIdValueObject(command?.gatesOpen.id);

    const description = new OpenGateDescriptionValueObject(
      command?.description,
    );

    //Captura de Errores
    if (gateId.hasErrors() === true) this.setErrors(gateId.getErrors());
    if (openGateId.hasErrors() === true) this.setErrors(openGateId.getErrors());
    if (openDate.hasErrors() === true) this.setErrors(openDate.getErrors());
    if (description.hasErrors() === true)
      this.setErrors(description.getErrors());

    //Validar Errores
    if (this.hasErrors() === true) {
      throw new ValueObjectException(
        'Hay fallos en las validaciones',
        this.getErrors(),
      );
    }

    //Create Entity
    const entity = new OpenGateDomainEntity();
    const gate = new GateDomainEntity({
      gateId: command?.id,
    });
    entity.gatesOpen = gate.valueOf();
    entity.id = openGateId.valueOf();
    entity.date = openDate.valueOf();
    entity.description = description.valueOf();

    //Retornar
    const result = await this.gateAggregate.registerOpenAction(entity);
    return { state: true, message: 'Se registrado la accion', data: result };
  }
}
