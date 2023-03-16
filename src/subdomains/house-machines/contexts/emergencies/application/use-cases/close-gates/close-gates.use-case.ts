import {
    IUseCase,
    ValueObjectErrorHandler,
    ValueObjectException,
  } from 'src/shared/sofka';
  import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
  import { GateIdValueObject, IGateDomainService, Topic } from '../../../domain';
  import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { ICloseGateCommand } from '../../../domain/interfaces/commands/close-gate.command';
  import { IOpenGateCommand } from '../../../domain/interfaces/commands/open-gate.command';
import { ICloseGateResponse } from '../../../domain/interfaces/responses/closed-gate.response';
  import { IOpenGateResponse } from '../../../domain/interfaces/responses/opened-gate.response';
  
  export class CloseGatesUseCase
    extends ValueObjectErrorHandler
    implements IUseCase<ICloseGateCommand, ICloseGateResponse>
  {
    private readonly gateAggregate: GateAggregateRoot;
    constructor(
      private readonly gateService: IGateDomainService,
      private readonly events: Map<Topic, EventPublisherBase<any>>,
    ) {
      super();
      this.gateAggregate = new GateAggregateRoot({
        gateService,
        events: (this.events = new Map<Topic, EventPublisherBase<any>>()),
      });
    }
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
        message: 'Se han abierto las puertas',
        data: result,
      };
    }
  }