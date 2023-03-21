import { OpenGateDomainEntity } from '../../entities';
import { CloseGateDomainEntity } from '../../entities/close-gate.domain-entity';

/**
 *
 * Se crea la interfaz IGotRegisterCloseGateActionReponse que va responder al evento de
 * obtener la accion de cerrar compuerta a traves del Id
 *
 * @export IGotRegisterCloseGateActionReponse
 * @interface IGotRegisterCloseGateActionReponse
 */
export interface IGotRegisterCloseGateActionReponse {
  state: boolean;
  message: string;
  data: CloseGateDomainEntity;
}
