import { EventPublisherBase } from '../../../../../../../shared/sofka/event-publisher.base';
import { ValueObjectErrorHandler } from '../../../../../../../shared/sofka/bases/value-object-error-handler.base';
import { IUseCase } from '../../../../../../../shared/sofka/interface/use-case.interface';
import { IGotRegisterOpenGateActionReponse } from '../../../domain/interfaces/responses/got-open-gate-by-id.response';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { Topic } from '../../../domain/events/enum/topic.enum';
import {
  IGetRegisterOpenGateActionCommand,
  IOpenGateDomainService,
  OpenGateIdValueObject,
} from '../../..';
import { ValueObjectException } from '../../../../../../../shared/sofka/exceptions/object-value.exception';
import { GotRegisterOpenGatePublisher } from '../../../infrastructure/messaging/publisher/got-register-open-action-by-id.publisher';

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
    private readonly gotRegisteredOpenGateAction: GotRegisterOpenGatePublisher,
  ) {
    super();
    const events = new Map<Topic, EventPublisherBase<any>>();
    this.gateAggregate = new GateAggregateRoot({
      openGateService,
      events: events.set(
        Topic.EmergenciesGotOpenGateId,
        this.gotRegisteredOpenGateAction,
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
