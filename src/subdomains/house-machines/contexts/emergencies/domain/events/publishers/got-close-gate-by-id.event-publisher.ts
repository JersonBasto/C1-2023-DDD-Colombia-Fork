import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { CloseGateDomainEntity } from '../../entities/close-gate.domain-entity';
import { Topic } from '../enum/topic.enum';

/**
 * Se crea el evento publicador, encargado de emitir la accion de
 * obtener un CloseGate a traves del ID
 *
 * @export
 * @abstract
 * @class GotCloseGateByIdEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotCloseGateByIdEventPublisher<
  Response = CloseGateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Topic.EmergenciesGotCloseGateById,
      JSON.stringify(this.response),
    );
  }
}
