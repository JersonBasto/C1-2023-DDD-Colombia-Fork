import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { OpenGateDomainEntity } from '../../entities/open-gate.domain-entity';
import { Topic } from '../enum/topic.enum';

/**
 * Se crea en evento publicador, encargado de emitir la accion de
 * registrar el OpenGate
 *
 * @export
 * @abstract
 * @class RegisteredOpenedActionEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class RegisteredOpenedActionEventPublisher<
  Response = OpenGateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Topic.EmergenciesRegisteredOpenAction,
      JSON.stringify(this.response),
    );
  }
}
