import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { GateDomainEntity } from '../../entities/gate.domain-entity';

/**
 * Se crea el evento publicador, encargado de emitir la accion de
 * obtener un Gate a traves del ID
 *
 * @export
 * @abstract
 * @class GotGateByIdEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotGateByIdEventPublisher<
  Response = GateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit('emergencies.gotGateById', JSON.stringify(this.response));
  }
}
