import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { OpenGateDomainEntity } from '../../entities/open-gate.domain-entity';

export abstract class GotHistoryOpenActionEventPublisher<
  Response = OpenGateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'emergencies.gotHistoryOpenAction',
      JSON.stringify(this.response),
    );
  }
}
