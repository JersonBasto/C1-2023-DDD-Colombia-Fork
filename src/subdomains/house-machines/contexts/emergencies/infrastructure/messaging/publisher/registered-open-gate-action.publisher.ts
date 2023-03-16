import { Inject, Injectable } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';
import { IEventPublisher } from 'src/shared';
import { lastValueFrom } from 'rxjs';
import { RegisteredOpenedActionEventPublisher } from '../../../domain';
import { OpenGateEntity } from '../../persistence/entities/open-gate-entity/open-gate.entity';

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
