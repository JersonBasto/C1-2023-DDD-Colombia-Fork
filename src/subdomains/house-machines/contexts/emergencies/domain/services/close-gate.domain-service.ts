import { CloseGateDomainEntity } from '../entities';

/**
 * Se crea la interfaz del servicio de CloseGate, la cual contiene 3 metodos
 * registerCloseAction: Registra la accion de CloseGate
 * getHistoryCloseAction: Obtiene todo el historial de CloseGate
 * getCloseGateById: Obtiene la informacion a traves del ID
 *
 * @export
 * @interface ICloseGateDomainService
 * @template Entity
 */
export interface ICloseGateDomainService<
  Entity extends CloseGateDomainEntity = CloseGateDomainEntity,
> {
  /**
   *
   * Es el metodo que se encarga de registrar la accion de CloseGate
   *
   * @param {CloseGateDomainEntity} data
   * @return {*}  {Promise<Entity>}
   * @memberof ICloseGateDomainService
   */
  registerCloseAction(data: CloseGateDomainEntity): Promise<Entity>;

  /**
   *
   * Es el metodo encargado de obtener el historial completo
   * de todas las acciones de CloseGate
   *
   * @return {*}  {Promise<Entity[]>}
   * @memberof ICloseGateDomainService
   */
  getHistoryCloseAction(): Promise<Entity[]>;

  /**
   *
   * Es el metodo encargado de obtener un solo item de CloseGate
   * a traves del ID
   *
   * @param {string} value
   * @return {*}  {Promise<Entity>}
   * @memberof ICloseGateDomainService
   */
  getCloseGateById(value: string): Promise<Entity>;
}
