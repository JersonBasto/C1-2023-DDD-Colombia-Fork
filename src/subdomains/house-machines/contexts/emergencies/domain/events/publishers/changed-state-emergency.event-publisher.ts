import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { Topic } from '../enum/topic.enum';

/**
 * Se crea el evento publicador, encargado de emitir la accion de que
 * se realizo el cambio del estado de emergencia.
 *
 * @export
 * @abstract
 * @class ChangedStateEmergencyEventPusblisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedStateEmergencyEventPusblisher<
  Response = boolean,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Topic.EmergenciesChangedStateEmergency,
      JSON.stringify(this.response),
    );
  }
}
