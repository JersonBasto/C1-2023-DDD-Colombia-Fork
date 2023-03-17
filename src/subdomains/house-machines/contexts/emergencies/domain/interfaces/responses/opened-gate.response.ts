import { GateDomainEntity } from '../../entities/gate.domain-entity';

/**
 *
 * Se crea la interfaz IOpenGateResponse que va responder al evento de
 * abrir compuerta a traves del Id
 *
 * @export IOpenGateResponse
 * @interface IOpenGateResponse
 */
export interface IOpenGateResponse {
  status: boolean;
  message: string;
  data: GateDomainEntity;
}
