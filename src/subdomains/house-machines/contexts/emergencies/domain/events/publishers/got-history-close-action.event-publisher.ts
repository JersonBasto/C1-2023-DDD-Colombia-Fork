import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { CloseGateDomainEntity } from '../../entities/close-gate.domain-entity';

export abstract class GotHistoryCloseActionEventPublisher<
  Response = CloseGateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'emergencies.gotHistoryCloseAction',
      JSON.stringify(this.response),
    );
  }
}
