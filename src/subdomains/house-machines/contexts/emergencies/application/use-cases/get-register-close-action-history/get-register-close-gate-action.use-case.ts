import { ValueObjectErrorHandler } from '../../../../../../../shared/sofka/bases/value-object-error-handler.base';
import { IGetHistoryCloseActionCommand } from '../../../domain/interfaces/commands/get-history-close-action.command';
import { IUseCase } from '../../../../../../../../dist/shared/sofka/interface/use-case.interface';
import { IGotHistoryCloseActionResponse } from '../../../domain/interfaces/responses/got-history-close-action.response';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { IOpenGateDomainService } from '../../../domain/services/open-gate.domain-service';
import { GotOpenGateByIdEventPublisher } from '../../../domain/events/publishers/got-open-gate-by-id.event-publisher';
import { Topic } from '../../../domain/events/enum/topic.enum';
import { EventPublisherBase } from '../../../../../../../shared/sofka/event-publisher.base'
import { ValueObjectException } from '../../../../../../../shared/sofka/exceptions/object-value.exception';


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
    IUseCase<IGetHistoryCloseActionCommand, IGotHistoryCloseActionResponse>
{
  private readonly gateAggregate: GateAggregateRoot;
  constructor(
    private readonly openGateService: IOpenGateDomainService,
    private readonly gotOpenGateByIdEvent: GotOpenGateByIdEventPublisher,
    private readonly events?: Map<Topic, EventPublisherBase<any>>,
  ) {
    super();
    this.gateAggregate = new GateAggregateRoot({
      openGateService,
      events: (this.events = new Map<Topic, EventPublisherBase<any>>()),
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
    command?: IGetHistoryCloseActionCommand | undefined,
  ): Promise<IGotHistoryCloseActionResponse> {
    //Validaciones
    //Captura de Errores
    //Validar Errores
    if (this.hasErrors() === true) {
      throw new ValueObjectException(
        'Hay fallos en las validaciones',
        this.getErrors(),
      );
    }

    const answer = await this.gateAggregate.getHistoryCloseAction();

    return {
      state: true,
      message: 'El registrado es: ',
      data: answer,
    };
  }
}
