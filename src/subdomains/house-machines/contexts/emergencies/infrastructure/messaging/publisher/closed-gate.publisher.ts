import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from 'src/shared';
import { ClosedGateEventPublisher } from '../../../domain';
import { lastValueFrom } from 'rxjs';
import { GateEntity } from '../../persistence/entities/gate-entity/gate-entity.entity';

@Injectable()
export class ClosedGatePublisher extends ClosedGateEventPublisher<GateEntity> {
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