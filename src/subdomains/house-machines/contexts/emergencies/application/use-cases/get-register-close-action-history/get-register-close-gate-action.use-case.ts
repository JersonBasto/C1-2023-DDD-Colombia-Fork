import { ValueObjectErrorHandler } from '../../../../../../../shared/sofka/bases/value-object-error-handler.base';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { Topic } from '../../../domain/events/enum/topic.enum';
import { EventPublisherBase } from '../../../../../../../shared/sofka/event-publisher.base';
import { ValueObjectException } from '../../../../../../../shared/sofka/exceptions/object-value.exception';
import { ICloseGateDomainService } from '../../../domain/services/close-gate.domain-service';
import { IUseCase } from '../../../../../../../shared/sofka/interface/use-case.interface';
import { CloseGateIdValueObject } from '../../../domain/value-objects/close-gate/close-gate-id/close-gate-id.value-object';
import { IGetRegisterCloseGateActionCommand } from '../../../domain/interfaces/commands/get-close-gate-by-id.command';
import { IGotRegisterCloseGateActionReponse } from '../../../domain/interfaces/responses/got-close-gate-by-id.response';
import { GotCloseGateByIdEventPublisher } from '../../../domain';

/**
 *
 * Se crea el caso de uso para obtener todos los registros de la accion de cerrar compuerta
 *
 * @export
 * @class GetRegisterCloseGateActionUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IGetHistoryCloseActionCommand, IGotHistoryCloseActionResponse>}
 */
export class GetRegisterCloseGateActionUseCase
  extends ValueObjectErrorHandler
  implements
    IUseCase<
      IGetRegisterCloseGateActionCommand,
      IGotRegisterCloseGateActionReponse
    >
{
  private readonly gateAggregate: GateAggregateRoot;
  constructor(
    private readonly closeGateService: ICloseGateDomainService,
    private readonly gotCloseGateByIdEvent: GotCloseGateByIdEventPublisher,
  ) {
    super();
    const events = new Map<Topic, EventPublisherBase<any>>();
    this.gateAggregate = new GateAggregateRoot({
      closeGateService,
      events: events.set(
        Topic.EmergenciesGotCloseGateById,
        this.gotCloseGateByIdEvent,
      ),
    });
  }
  /**
   * Ejecuta la accion del agregado Root getHistoryCloseAction
   * 
   * @param command 
   * @returns state: true,
      message: 'El registrado es: ',
      data: answer,
   */
  async execute(
    command?: IGetRegisterCloseGateActionCommand | undefined,
  ): Promise<IGotRegisterCloseGateActionReponse> {
    //Validaciones
    const closeGateId = new CloseGateIdValueObject(command?.id);
    //Captura de Errores
    if (closeGateId.hasErrors()) this.setErrors(closeGateId.getErrors());
    //Validar Errores
    if (this.hasErrors() === true) {
      throw new ValueObjectException(
        'Hay fallos en las validaciones',
        this.getErrors(),
      );
    }

    const answer = await this.gateAggregate.getCloseGateById(
      closeGateId.valueOf(),
    );

    return {
      state: true,
      message: 'El registrado es: ',
      data: answer,
    };
  }
}
