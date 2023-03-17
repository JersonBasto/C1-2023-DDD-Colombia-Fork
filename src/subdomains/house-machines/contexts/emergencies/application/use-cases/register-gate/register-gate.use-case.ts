import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from 'src/shared/sofka';
import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import {
  EmergencyDateValueObject,
  EmergencyValueObject,
  GateAggregateRoot,
  GateDomainEntity,
  IGateDomainService,
  IOpenGateDomainService,
  RegisteredOpenedActionEventPublisher,
  StateGateValueObject,
  Topic,
} from '../../../domain';
import { RegisteredGateEventPublisher } from '../../../domain/events/publishers/registered-gate.event-publisher';
import { IRegisterGateCommand } from '../../../domain/interfaces/commands/register-gate.command';
import { IRegisteredGateResponse } from '../../../domain/interfaces/responses/registeres-gate.response';
import { DescriptionValueObject } from '../../../domain/value-objects/gate/description/description.value-object';

export class RegisterGateUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IRegisterGateCommand, IRegisteredGateResponse>
{
  private readonly gateAggregate: GateAggregateRoot;
  constructor(
    private readonly gateService: IGateDomainService,
    private readonly registerGateEvent: RegisteredGateEventPublisher,
  ) {
    super();
    const events = new Map<Topic, EventPublisherBase<any>>();
    this.gateAggregate = new GateAggregateRoot({
      gateService,
      events: events.set(
        Topic.EmergenciesRegisteredGate,
        this.registerGateEvent,
      ),
    });
  }
  async execute(
    command?: IRegisterGateCommand | undefined,
  ): Promise<IRegisteredGateResponse> {
    //Validaciones
    console.log(command);
    const emergency = new EmergencyValueObject(command?.emergency);
    const stateGate = new StateGateValueObject(command?.stateGate);
    const description = new DescriptionValueObject(command?.description);

    //Captura de Errores
    if (emergency.hasErrors() === true) this.setErrors(emergency.getErrors());
    if (stateGate.hasErrors() === true) this.setErrors(stateGate.getErrors());
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
    const entity = new GateDomainEntity();
    entity.emergency = emergency.valueOf();
    entity.stateGate = stateGate.valueOf();
    entity.description = description.valueOf();

    //Retornar
    const result = await this.gateAggregate.registerGate(entity);
    return { state: true, message: 'Se registrado la gate', data: result };
  }
}
