import { CloseGateDomainEntity } from '../../entities';

/**
 *
 * Se crea la interfaz IGotHistoryCloseActionResponse que va responder al evento de
 * obtener el historial de cerrar compuerta
 *
 * @export IGotHistoryCloseActionResponse
 * @interface IGotHistoryCloseActionResponse
 */
export interface IGotHistoryCloseActionResponse {
  state: boolean;
  message: string;
  data: CloseGateDomainEntity[];
}
