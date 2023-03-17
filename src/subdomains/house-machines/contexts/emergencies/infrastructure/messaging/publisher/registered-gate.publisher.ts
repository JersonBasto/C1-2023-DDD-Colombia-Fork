import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';
import { IEventPublisher } from 'src/shared';
import { lastValueFrom } from 'rxjs';
import { RegisteredGateEventPublisher } from '../../../domain/events/publishers/registered-gate.event-publisher';
import { GateEntity } from '../../persistence/entities/gate-entity/gate-entity.entity';

/**
 *
 * Es el evento publicador RegisteredGatePublisher encargado de enviar el mensaje cuando
 * se registra la compuertas a traves de Kafka
 *
 * @export
 * @class RegisteredGatePublisher
 * @extends {RegisteredGateEventPublisher<GateEntity>}
 */
@Injectable()
export class RegisteredGatePublisher extends RegisteredGateEventPublisher<GateEntity> {
  constructor(
    @Inject('EMERGENCIES_CONTEXT') private readonly proxy: ClientProxy,
  ) {
    super(proxy as unknown as IEventPublisher);
  }

  emit<Result = any, Input = GateEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
