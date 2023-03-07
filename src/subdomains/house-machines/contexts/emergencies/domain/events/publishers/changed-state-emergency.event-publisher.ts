import { EventPublisherBase } from 'src/shared/sofka/bases/event-publisher.base';
import { GateDomainEntity } from '../../entities/gate.domain-entity';

export abstract class ChangedStateEmergencyEventPusblisher<
  Response = GateDomainEntity,
> extends EventPublisherBase<Response> {
    publish(): void {
        
    }
}
