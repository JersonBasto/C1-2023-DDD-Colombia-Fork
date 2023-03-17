import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from 'src/shared';
import { OpenedGateEventPublisher } from '../../../domain';
import { lastValueFrom } from 'rxjs';
import { GateEntity } from '../../persistence/entities/gate-entity/gate-entity.entity';

/**
 *
 * Es el evento publicador OpenedGatePublisher encargado de enviar el mensaje cuando
 * se abre las compuertas a traves de Kafka
 *
 * @export OpenedGatePublisher
 * @class OpenedGatePublisher
 * @extends {OpenedGateEventPublisher<GateEntity>}
 */
@Injectable()
export class OpenedGatePublisher extends OpenedGateEventPublisher<GateEntity> {
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
