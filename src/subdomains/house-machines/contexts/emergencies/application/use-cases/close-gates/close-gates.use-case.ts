import { ValueObjectErrorHandler } from '../../../../../../../shared/sofka/bases/value-object-error-handler.base';
import { IUseCase } from '../../../../../../../shared/sofka/interface/use-case.interface';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { ClosedGateEventPublisher, IGateDomainService } from '../../..';
import { EventPublisherBase } from '../../../../../../../shared/sofka/event-publisher.base';
import { Topic } from '../../../domain/events/enum/topic.enum';
import { GateIdValueObject } from '../../../domain/value-objects/gate/gate-id/gate-id.value-object';
import { ValueObjectException } from '../../../../../../../shared/sofka/exceptions/object-value.exception';
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
