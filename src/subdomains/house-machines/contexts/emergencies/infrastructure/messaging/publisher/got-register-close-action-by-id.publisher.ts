import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from 'src/shared/sofka';
import { GotCloseGateByIdEventPublisher, GotOpenGateByIdEventPublisher } from '../../../domain/events/publishers';
import { OpenGateEntity } from '../../persistence/entities/open-gate-entity/open-gate.entity';
import { lastValueFrom } from 'rxjs';
import { CloseGateEntity } from '../../persistence/entities/close-gate-entity/close-gate.entity';

/**
 *
 * Es el evento publicador GotRegisterCloseGatePublisher encargado de enviar el mensaje cuando
 * se registra la accion de abrir la compuertas a traves de Kafka
 *
 * @export GotRegisterCloseGatePublisher
 * @class GotRegisterOpenGatePublisher
 * @extends {GotCloseGateByIdEventPublisher<CloseGateEntity>}
 */
@Injectable()
export class GotRegisterCloseGatePublisher extends GotCloseGateByIdEventPublisher<CloseGateEntity> {
  constructor(
    @Inject('EMERGENCIES_CONTEXT') private readonly proxy: ClientProxy,
  ) {
    super(proxy as unknown as IEventPublisher);
  }
  emit<Result = any, Input = CloseGateEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
