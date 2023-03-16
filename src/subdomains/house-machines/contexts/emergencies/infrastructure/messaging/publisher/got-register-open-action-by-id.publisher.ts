import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from 'src/shared/sofka';
import { GotOpenGateByIdEventPublisher } from '../../../domain/events/publishers';
import { OpenGateEntity } from '../../persistence/entities/open-gate-entity/open-gate.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GotRegisterOpenGatePublisher extends GotOpenGateByIdEventPublisher<OpenGateEntity> {
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
