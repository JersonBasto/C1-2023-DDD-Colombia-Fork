import { ValueObjectErrorHandler } from '../../../../../../../shared/sofka/bases/value-object-error-handler.base';
import { IRegisterCloseActionCommand } from '../../../domain/interfaces/commands/register-close-action.command';
import { IUseCase } from '../../../../../../../../dist/shared/sofka/interface/use-case.interface';
import { IRegisteredCloseACtionResponse } from '../../../domain/interfaces/responses/registered-close-action.response';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { ICloseGateDomainService } from '../../../domain/services/close-gate.domain-service';
import { RegisteredCloseActionEventPublisher } from '../../../domain/events/publishers/registered-close-action.event-publisher';
import { Topic } from '../../../domain/events/enum/topic.enum';
import { EventPublisherBase } from '../../../../../../../shared/sofka/event-publisher.base'
import { CloseGateIdValueObject } from '../../../domain/value-objects/close-gate/close-gate-id/close-gate-id.value-object';
import { CloseGateDateValueObject } from '../../../domain/value-objects/close-gate/close-date/close.date.value-object';
import { GateIdValueObject } from '../../../domain/value-objects/gate/gate-id/gate-id.value-object';
import { CloseGateDescriptionValueObject } from '../../../domain/value-objects/close-gate/close-date-description/close-gate-description.value-object';
import { DescriptionValueObject } from '../../../domain/value-objects/gate/description/description.value-object';
import { ValueObjectException } from '../../../../../../../shared/sofka/exceptions/object-value.exception';
import { GateDomainEntity } from '../../../domain/entities/gate.domain-entity';
import { CloseGateDomainEntity } from '../../../domain/entities/close-gate.domain-entity';


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
