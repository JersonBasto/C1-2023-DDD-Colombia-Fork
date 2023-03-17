import { GateDomainEntity, OpenGateDomainEntity } from '../../entities';

/**
 *
 * Se crea la interfaz IRegisteredGateResponse que va responder al evento de
 * registrar la compuerta
 *
 * @export IRegisteredGateResponse
 * @interface IRegisteredGateResponse
 */
export interface IRegisteredGateResponse {
  state: boolean;
  message: string;
  data: GateDomainEntity;
}
