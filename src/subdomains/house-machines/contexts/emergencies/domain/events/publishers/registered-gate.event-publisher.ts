import { EventPublisherBase } from '../../../../../../../shared/sofka/event-publisher.base';
import { GateDomainEntity } from '../../entities';
import { Topic } from '../enum/topic.enum';

/**
 * Se crea en evento publicador, encargado de emitir la accion de
 * registrar el Gate
 *
 * @export
 * @abstract
 * @class RegisteredOpenedActionEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class RegisteredGateEventPublisher<
  Response = GateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Topic.EmergenciesRegisteredGate,
      JSON.stringify(this.response),
    );
  }
}
