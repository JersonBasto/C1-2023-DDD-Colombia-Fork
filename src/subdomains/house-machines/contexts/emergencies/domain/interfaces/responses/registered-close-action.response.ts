import { CloseGateDomainEntity } from '../../entities';

/**
 *
 * Se crea la interfaz IRegisteredCloseACtionResponse que va responder al evento de
 * registrar el cierre de la compuerta a traves del Id
 *
 * @export IRegisteredCloseACtionResponse
 * @interface IRegisteredCloseACtionResponse
 */
export interface IRegisteredCloseACtionResponse {
  state: boolean;
  message: string;
  data: CloseGateDomainEntity;
}
