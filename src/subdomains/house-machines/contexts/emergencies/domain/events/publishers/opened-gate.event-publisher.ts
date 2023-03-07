import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { GateDomainEntity } from '../../entities/gate.domain-entity';
import { OpenGateDomainEntity } from '../../entities/open-gate.domain-entity';

export abstract class OpenedGateEventPublisher<
  Response = GateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit('emergencies.openedGate', JSON.stringify(this.response));
  }
}
