import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import { OpenGateDomainEntity } from '../../entities/open-gate.domain-entity';
import { Topic } from '../enum/topic.enum';

/**
 * Se crea el evento publicador, encargado de emitir la accion de
 * obtener un OpenGate a traves del ID
 *
 * @export
 * @abstract
 * @class GotOpenGateByIdEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class GotOpenGateByIdEventPublisher<
  Response = OpenGateDomainEntity,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Topic.EmergenciesGotOpenGateId,
      JSON.stringify(this.response),
    );
  }
}
