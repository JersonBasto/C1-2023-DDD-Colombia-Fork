import { GateDomainEntity } from '../../entities/gate.domain-entity';

/**
 *
 * Se crea la interfaz ICloseGateResponse que va responder al evento de
 * cerrar compuerta
 *
 * @export ICloseGateResponse
 * @interface ICloseGateResponse
 */
export interface ICloseGateResponse {
  status: boolean;
  message: string;
  data: GateDomainEntity;
}
