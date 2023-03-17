import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from 'src/shared/sofka';
import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import {
  GateAggregateRoot,
  GotOpenGateByIdEventPublisher,
  IOpenGateDomainService,
  OpenGateIdValueObject,
  Topic,
} from '../../../domain';
import { IGetHistoryCloseActionCommand } from '../../../domain/interfaces/commands/get-history-close-action.command';
import { IGotHistoryCloseActionResponse } from '../../../domain/interfaces/responses/got-history-close-action.response';

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
