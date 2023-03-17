import { OpenGateDomainEntity } from '../../entities';

/**
 *
 * Se crea la interfaz IGotRegisterOpenGateActionReponse que va responder al evento de
 * obtener la accion de abrir compuerta a traves del Id
 *
 * @export IGotRegisterOpenGateActionReponse
 * @interface IGotRegisterOpenGateActionReponse
 */
export interface IGotRegisterOpenGateActionReponse {
  state: boolean;
  message: string;
  data: OpenGateDomainEntity;
}
