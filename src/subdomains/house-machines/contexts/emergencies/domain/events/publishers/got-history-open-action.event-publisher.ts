import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { OpenGateDomainEntity } from '../../entities/open-gate.domain-entity';
import { Topic } from '../enum/topic.enum';

/**
 * Se crea el evento publicador, encargado de emitir la accion de
 * obtener el historial de OpenGate
 *
 * @export
 * @abstract
 * @class GotHistoryOpenActionEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotHistoryOpenActionEventPublisher<
  Response = OpenGateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Topic.EmergenciesGotHistoryOpenAction,
      JSON.stringify(this.response),
    );
  }
}
