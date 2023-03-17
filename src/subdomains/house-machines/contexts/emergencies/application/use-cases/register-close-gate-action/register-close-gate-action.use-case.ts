import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from 'src/shared/sofka';
import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import {
  CloseGateDateValueObject,
  CloseGateDomainEntity,
  CloseGateIdValueObject,
  GateAggregateRoot,
  GateIdValueObject,
  ICloseGateDomainService,
  Topic,
} from '../../../domain';
import { IRegisterCloseActionCommand } from '../../../domain/interfaces/commands/register-close-action.command';
import { IRegisteredCloseACtionResponse } from '../../../domain/interfaces/responses/registered-close-action.response';

/**
 *
 * Se crea el caso de uso para registrar la accion de cerrar compuerta
 *
 * @export
 * @class RegisterCloseGateActionUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<IRegisterCloseActionCommand, IRegisteredCloseACtionResponse>}
 */
export class RegisterCloseGateActionUseCase
  extends ValueObjectErrorHandler
  implements
    IUseCase<IRegisterCloseActionCommand, IRegisteredCloseACtionResponse>
{
  private readonly gateAggregate: GateAggregateRoot;
  constructor(
    private readonly closeGateService: ICloseGateDomainService,
    private readonly events: Map<Topic, EventPublisherBase<any>>,
  ) {
    super();
    this.gateAggregate = new GateAggregateRoot({
      closeGateService,
      events: (this.events = new Map<Topic, EventPublisherBase<any>>()),
    });
  }
  /**
   * Ejecuta la accion de registerCloseAction del agregado Root
   *
   * @param command
   * @returns state: true, message: 'Se registrado la accion', data: result
   */
  async execute(
    command?: IRegisterCloseActionCommand | undefined,
  ): Promise<IRegisteredCloseACtionResponse> {
    //Validaciones
    const closeGateId = new CloseGateIdValueObject(command?.id);
    const closeDate = new CloseGateDateValueObject(command?.date);
    const gate = new GateIdValueObject(command?.gatesClose.id);

    //Captura de Errores
    if (closeGateId.hasErrors() === true)
      this.setErrors(closeGateId.getErrors());
    if (closeDate.hasErrors() === true) this.setErrors(closeDate.getErrors());
    if (gate.hasErrors() === true) this.setErrors(gate.getErrors());

    //Validar Errores
    if (this.hasErrors() === true) {
      throw new ValueObjectException(
        'Hay fallos en las validaciones',
        this.getErrors(),
      );
    }

    //Create Entity
    const entity = new CloseGateDomainEntity();
    entity.gate = gate.valueOf();
    entity.id = closeGateId.valueOf();
    entity.date = closeDate.valueOf();

    //Retornar
    const result = await this.gateAggregate.registerCloseAction(entity);
    return { state: true, message: 'Se registrado la accion', data: result };
  }
}
