import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from 'src/shared/sofka';
import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import {
  ClosedGateEventPublisher,
  GateIdValueObject,
  IGateDomainService,
  Topic,
} from '../../../domain';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { ICloseGateCommand } from '../../../domain/interfaces/commands/close-gate.command';
import { ICloseGateResponse } from '../../../domain/interfaces/responses/closed-gate.response';

/**
 * Caso de Uso para Cerrar Compuertas
 *
 * @export
 * @class CloseGatesUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<ICloseGateCommand, ICloseGateResponse>}
 */
export class CloseGatesUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<ICloseGateCommand, ICloseGateResponse>
{
  private readonly gateAggregate: GateAggregateRoot;
  constructor(
    private readonly gateService: IGateDomainService,
    private readonly closedGateEventPublisher: ClosedGateEventPublisher,
  ) {
    super();
    const events = new Map<Topic, EventPublisherBase<any>>();
    this.gateAggregate = new GateAggregateRoot({
      gateService,
      events: events.set(
        Topic.EmergenciesClosedGate,
        this.closedGateEventPublisher,
      ),
    });
  }
  /**
   *
   * Ejecuta la accion del agregador Root closeGates
   *
   * @param command
   * @returns status: true, message: 'Se ha cerrado la puerta:', data: result
   */
  async execute(
    command?: ICloseGateCommand | undefined,
  ): Promise<ICloseGateResponse> {
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
    const result = await this.gateAggregate.closeGates(gateId.valueOf());
    return {
      status: true,
      message: 'Se ha cerrado la puerta:',
      data: result,
    };
  }
}
