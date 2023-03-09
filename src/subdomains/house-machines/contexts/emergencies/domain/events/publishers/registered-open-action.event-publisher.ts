import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { OpenGateDomainEntity } from '../../entities/open-gate.domain-entity';

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
      'emergencies.registeredOpenedAction',
      JSON.stringify(this.response),
    );
  }
}
