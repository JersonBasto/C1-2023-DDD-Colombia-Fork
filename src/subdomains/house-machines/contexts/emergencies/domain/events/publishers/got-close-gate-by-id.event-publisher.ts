import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { CloseGateDomainEntity } from '../../entities/close-gate.domain-entity';

export abstract class GotCloseGateByIdEventPublisher<
  Response = CloseGateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.send(
      'emergencies.gotCloseGateById',
      JSON.stringify(this.response),
    );
  }
}
