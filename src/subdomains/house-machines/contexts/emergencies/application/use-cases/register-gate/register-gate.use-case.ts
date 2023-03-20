import { ValueObjectErrorHandler } from '../../../../../../../shared/sofka/bases/value-object-error-handler.base';
import { IUseCase } from '../../../../../../../shared/sofka/interface/use-case.interface';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { RegisteredGateEventPublisher } from '../../../domain/events/publishers/registered-gate.event-publisher';
import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { Topic } from '../../../domain/events/enum/topic.enum';
import {
  DescriptionValueObject,
  EmergencyValueObject,
  IGateDomainService,
  StateGateValueObject,
} from '../../..';
import { ValueObjectException } from '../../../../../../../shared/sofka/exceptions/object-value.exception';
import { GateDomainEntity } from '../../../domain/entities/gate.domain-entity';
import { IRegisteredGateResponse } from '../../../domain/interfaces/responses/registeres-gate.response';
import { IRegisterGateCommand } from '../../../domain/interfaces/commands/register-gate.command';

/**
 *
 * Se crea el caso de uso para registrar el item de compuerta
 *
 * @export
 * @class RegisterGateUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IRegisterGateCommand, IRegisteredGateResponse>}
 */
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
  /**
   *
   * Ejecuta la accion de registerGate del agregado Root
   *
   * @param command
   * @returns state: true, message: 'Se registrado la gate', data: result
   */
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
