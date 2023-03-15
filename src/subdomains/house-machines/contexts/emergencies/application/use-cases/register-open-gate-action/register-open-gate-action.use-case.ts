import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from 'src/shared/sofka';
import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import {
  GateAggregateRoot,
  GateIdValueObject,
  IOpenGateDomainService,
  OpenGateDateValueObject,
  OpenGateDomainEntity,
  OpenGateIdValueObject,
  RegisteredOpenedActionEventPublisher,
  Topic,
} from '../../../domain';
import { IRegisterOpenActionCommand } from '../../../domain/interfaces/commands/register-open-action.command';
import { IRegisteredOpenACtionResponse } from '../../../domain/interfaces/responses/registered-open-action.response';

export class RegisterOpenGateActionUseCase
  extends ValueObjectErrorHandler
  implements
    IUseCase<IRegisterOpenActionCommand, IRegisteredOpenACtionResponse>
{
  private readonly gateAggregate: GateAggregateRoot;
  constructor(
    private readonly openGateService: IOpenGateDomainService,
    private readonly events: Map<Topic, EventPublisherBase<any>>,
  ) {
    super();
    this.gateAggregate = new GateAggregateRoot({
      openGateService,
      events: (this.events = new Map<Topic, EventPublisherBase<any>>()),
    });
  }
  async execute(
    command?: IRegisterOpenActionCommand | undefined,
  ): Promise<IRegisteredOpenACtionResponse> {
    //Validaciones
    const openGateId = new OpenGateIdValueObject(command?.openGateId);
    const openDate = new OpenGateDateValueObject(command?.openDate);
    const gate = new GateIdValueObject(command?.gate);

    //Captura de Errores
    if (openGateId.hasErrors() === true) this.setErrors(openGateId.getErrors());
    if (openDate.hasErrors() === true) this.setErrors(openDate.getErrors());
    if (gate.hasErrors() === true) this.setErrors(gate.getErrors());

    //Validar Errores
    if (this.hasErrors() === true) {
      throw new ValueObjectException(
        'Hay fallos en las validaciones',
        this.getErrors(),
      );
    }

    //Create Entity
    const entity = new OpenGateDomainEntity();
    entity.gate = gate.valueOf();
    entity.openGateId = openGateId.valueOf();
    entity.openDate = openDate.valueOf();
    
    //Retornar
    const result = await this.gateAggregate.registerOpenAction(entity);
    return { state: true, message: 'Se registrado la accion', data: result };
  }
}
