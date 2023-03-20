import { EventPublisherBase } from '../../../../../../../shared/sofka/event-publisher.base';
import { Topic } from '../enum/topic.enum';

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
      Topic.EmergenciesChangedStategate,
      JSON.stringify(this.response),
    );
  }
}
