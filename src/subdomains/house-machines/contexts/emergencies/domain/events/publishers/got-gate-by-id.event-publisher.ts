import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { GateDomainEntity } from '../../entities/gate.domain-entity';

export abstract class GotGateByIdEventPublisher<
  Response = GateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit('emergencies.gotGateById', JSON.stringify(this.response));
  }
}
