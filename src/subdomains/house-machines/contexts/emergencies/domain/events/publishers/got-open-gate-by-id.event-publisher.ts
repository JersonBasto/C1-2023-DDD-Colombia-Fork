import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { OpenGateDomainEntity } from '../../entities/open-gate.domain-entity';

export abstract class GotOpenGateByIdEventPublisher<
  Response = OpenGateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.send(
      'emergencies.gotOpenGateId',
      JSON.stringify(this.response),
    );
  }
}
