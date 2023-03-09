import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { GateDomainEntity } from '../../entities/gate.domain-entity';
import { OpenGateDomainEntity } from '../../entities/open-gate.domain-entity';

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
    return this.emit('emergencies.openedGate', JSON.stringify(this.response));
  }
}
