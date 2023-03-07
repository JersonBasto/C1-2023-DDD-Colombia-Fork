import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { GateDomainEntity } from '../../entities';
import { CloseGateDomainEntity } from '../../entities/close-gate.domain-entity';

export abstract class ClosedGateEventPublisher<
  Response = GateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit('emergencies.closedGate', JSON.stringify(this.response));
  }
}
