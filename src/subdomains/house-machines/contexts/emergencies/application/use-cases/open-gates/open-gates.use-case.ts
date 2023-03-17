import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from 'src/shared/sofka';
import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import {
  GateIdValueObject,
  IGateDomainService,
  OpenedGateEventPublisher,
  Topic,
} from '../../../domain';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { IOpenGateCommand } from '../../../domain/interfaces/commands/open-gate.command';
import { IOpenGateResponse } from '../../../domain/interfaces/responses/opened-gate.response';

/**
 *
 * Se crea el caso de uso de abrir la compuerta a traves del id
 *
 * @export
 * @class OpenGatesUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IOpenGateCommand, IOpenGateResponse>}
 */
export class OpenGatesUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<IOpenGateCommand, IOpenGateResponse>
{
  private readonly gateAggregate: GateAggregateRoot;
  constructor(
    private readonly gateService: IGateDomainService,
    private readonly openedGateEvent: OpenedGateEventPublisher,
  ) {
    super();
    const events = new Map<Topic, EventPublisherBase<any>>();
    this.gateAggregate = new GateAggregateRoot({
      gateService,
      events: events.set(Topic.EmergenciesOpenedGate, this.openedGateEvent),
    });
  }
  /**
   * 
   * Ejecuta el openGates del agregado Root
   * 
   * @param command 
   * @returns status: true,
      message: 'Se ha abierto la puerta',
      data: result,
   */
  async execute(
    command?: IOpenGateCommand | undefined,
  ): Promise<IOpenGateResponse> {
    //Validaciones
    const gateId = new GateIdValueObject(command?.id);
    //Captura de errores
    if (gateId.hasErrors() === true) this.setErrors(gateId.getErrors());
    //Validaciones de errores
    if (this.hasErrors() === true) {
      throw new ValueObjectException(
        'Hay fallos en las validaciones',
        this.getErrors(),
      );
    }
    //Create entity

    //Retonar
    const result = await this.gateAggregate.openGates(gateId.valueOf());
    return {
      status: true,
      message: 'Se ha abierto la puerta',
      data: result,
    };
  }
}
