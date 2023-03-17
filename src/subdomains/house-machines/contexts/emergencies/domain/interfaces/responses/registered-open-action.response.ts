import { OpenGateDomainEntity } from '../../entities';

/**
 *
 * Se crea la interfaz IRegisteredOpenACtionResponse que va responder al evento de
 * registrar el abrir de la compuerta a traves del Id
 *
 * @export IRegisteredOpenACtionResponse
 * @interface IRegisteredOpenACtionResponse
 */
export interface IRegisteredOpenACtionResponse {
  state: boolean;
  message: string;
  data: OpenGateDomainEntity;
}
