import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { GateDomainEntity } from '../../entities/gate.domain-entity';

/**
 * Se crea el evento publicador, encargado de emitir la accion de que
 * se hace cambio al estado de una compuerta.
 *
 * @export
 * @abstract
 * @class ChangedStateGateEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedStateGateEventPublisher<
  Response = boolean,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'emergencies.changedStateGate',
      JSON.stringify(this.response),
    );
  }
}
