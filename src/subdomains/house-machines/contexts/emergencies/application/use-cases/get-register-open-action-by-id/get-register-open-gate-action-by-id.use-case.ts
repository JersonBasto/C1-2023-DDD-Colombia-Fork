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
import { IGetRegisterOpenGateActionCommand } from '../../../domain/interfaces/commands/get-open-gate-by-id.command';
import { IGotRegisterOpenGateActionReponse } from '../../../domain/interfaces/responses/got-open-gate-by-id.response';

/**
 *
 * Se crea el caso de uso para obtener el registro de abrir compuerta
 * a traves del id
 *
 * @export
 * @class GetRegisterOpenGateActionByIdUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IGetRegisterOpenGateActionCommand, IGotRegisterOpenGateActionReponse>}
 */
export class GetRegisterOpenGateActionByIdUseCase
  extends ValueObjectErrorHandler
  implements
    IUseCase<
      IGetRegisterOpenGateActionCommand,
      IGotRegisterOpenGateActionReponse
    >
{
  private readonly gateAggregate: GateAggregateRoot;
  constructor(
    private readonly openGateService: IOpenGateDomainService,
    private readonly gotOpenGateByIdEvent: GotOpenGateByIdEventPublisher,
  ) {
    super();
    const events = new Map<Topic, EventPublisherBase<any>>();
    this.gateAggregate = new GateAggregateRoot({
      openGateService,
      events: events.set(
        Topic.EmergenciesGotOpenGateId,
        this.gotOpenGateByIdEvent,
      ),
    });
  }
  /**
   * 
   * Ejecuta la accion de getOpenGateById del agregado Root
   * 
   * @param command 
   * @returns state: true,
      message: 'El registrado es: ',
      data: answer,
   */
  async execute(
    command?: IGetRegisterOpenGateActionCommand | undefined,
  ): Promise<IGotRegisterOpenGateActionReponse> {
    //Validaciones
    const openGateId = new OpenGateIdValueObject(command?.id);

    //Captura de Errores
    if (openGateId.hasErrors()) this.setErrors(openGateId.getErrors());
    //Validar Errores
    if (this.hasErrors() === true) {
      throw new ValueObjectException(
        'Hay fallos en las validaciones',
        this.getErrors(),
      );
    }

    const answer = await this.gateAggregate.getOpenGateById(
      openGateId.valueOf(),
    );

    return {
      state: true,
      message: 'El registrado es: ',
      data: answer,
    };
  }
}
