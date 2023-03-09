import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from 'src/shared/sofka';
import {
  GateAggregateRoot,
  GotOpenGateByIdEventPublisher,
  IOpenGateDomainService,
  OpenGateIdValueObject,
} from '../../../domain';
import { IGetRegisterOpenGateActionCommand } from '../../../domain/interfaces/commands/get-open-gate-by-id.command';
import { IGotRegisterOpenGateActionReponse } from '../../../domain/interfaces/responses/got-open-gate-by-id.response';

export class GetRegisterOpenGateActionUseCase
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
    this.gateAggregate = new GateAggregateRoot({
      openGateService,
      gotOpenGateByIdEvent,
    });
  }
  async execute(
    command?: IGetRegisterOpenGateActionCommand | undefined,
  ): Promise<IGotRegisterOpenGateActionReponse> {
    //Validaciones
    const openGateId = new OpenGateIdValueObject(command?.openGateId);

    //Captura de Errores
    if (openGateId.hasErrors()) this.setErrors(openGateId.getErrors());
    //Validar Errores
    if (this.hasErrors() === true) {
      throw new ValueObjectException(
        'Hay fallos en las validaciones',
        this.getErrors(),
      );
    }

    const answer = await this.openGateService.getOpenGateById(
      openGateId.valueOf(),
    );

    return {
      state: true,
      message: 'El registrado es: ',
      data: answer,
    };
  }
}
