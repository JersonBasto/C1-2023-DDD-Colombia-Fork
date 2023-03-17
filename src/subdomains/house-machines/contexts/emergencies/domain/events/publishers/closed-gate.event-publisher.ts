import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { GateDomainEntity } from '../../entities';
import { CloseGateDomainEntity } from '../../entities/close-gate.domain-entity';
import { Topic } from '../enum/topic.enum';

/**
 * Se crea el evento publicador, encargado de emitir la accion de
 * cerrar la compuerta
 *
 * @export
 * @abstract
 * @class ClosedGateEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ClosedGateEventPublisher<
  Response = GateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Topic.EmergenciesClosedGate,
      JSON.stringify(this.response),
    );
  }
}
