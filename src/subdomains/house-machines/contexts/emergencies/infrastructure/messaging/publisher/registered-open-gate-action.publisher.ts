import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';
import { IEventPublisher } from 'src/shared';
import { lastValueFrom } from 'rxjs';
import { RegisteredOpenedActionEventPublisher } from '../../../domain';
import { OpenGateEntity } from '../../persistence/entities/open-gate-entity/open-gate.entity';

/**
 *
 * Es el evento publicador RegisteredOpenGatePublisher encargado de enviar el mensaje cuando
 * se registra la accion de abrir la compuertas por id a traves de Kafka
 *
 * @export RegisteredOpenGatePublisher
 * @class RegisteredOpenGatePublisher
 * @extends {RegisteredOpenedActionEventPublisher<OpenGateEntity>}
 */
@Injectable()
export class RegisteredOpenGatePublisher extends RegisteredOpenedActionEventPublisher<OpenGateEntity> {
  constructor(
    @Inject('EMERGENCIES_CONTEXT') private readonly proxy: ClientProxy,
  ) {
    super(proxy as unknown as IEventPublisher);
  }

  emit<Result = any, Input = OpenGateEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
