import { EventPublisherBase } from '../../../../../../../shared/sofka/event-publisher.base';
import { GateDomainEntity } from '../../entities/gate.domain-entity';
import { Topic } from '../enum/topic.enum';

/**
 * Se crea el evento publicador, encargado de emitir la accion de
 * abrir la Gate
 *
 * @export
 * @abstract
 * @class OpenedGateEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class OpenedGateEventPublisher<
  Response = GateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Topic.EmergenciesOpenedGate,
      JSON.stringify(this.response),
    );
  }
}
