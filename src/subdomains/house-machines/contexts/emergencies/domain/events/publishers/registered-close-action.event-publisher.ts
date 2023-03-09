import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { CloseGateDomainEntity } from '../../entities/close-gate.domain-entity';

/**
 * Se crea en evento publicador, encargado de emitir la accion de
 * registrar el CloseGate
 *
 * @export
 * @abstract
 * @class RegisteredCloseActionEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class RegisteredCloseActionEventPublisher<
  Response = CloseGateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'emergencies.registeredCloseAction',
      JSON.stringify(this.response),
    );
  }
}
