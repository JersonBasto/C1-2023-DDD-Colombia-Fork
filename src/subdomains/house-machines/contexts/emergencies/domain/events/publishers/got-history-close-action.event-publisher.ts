import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { CloseGateDomainEntity } from '../../entities/close-gate.domain-entity';
import { Topic } from '../enum/topic.enum';

/**
 * se crea el evento publicador, encargado de emitir la accion de
 * obtener el historial de CloseGate
 *
 * @export
 * @abstract
 * @class GotHistoryCloseActionEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotHistoryCloseActionEventPublisher<
  Response = CloseGateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Topic.EmergenciesGotHistoryCloseAction,
      JSON.stringify(this.response),
    );
  }
}
