import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { GateDomainEntity } from '../../entities/gate.domain-entity';

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
      'emergencies.changedStateEmergency',
      JSON.stringify(this.response),
    );
  }
}
