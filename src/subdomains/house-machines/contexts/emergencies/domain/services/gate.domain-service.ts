import { GateDomainEntity } from '../entities/gate.domain-entity';

/**
 * Se crea la interfaz del servicio de Gate, la cual contiene 5 metodos
 * openGates,closeGates, changeStateGate, changeStateEmergency y getGateById
 *
 * @export
 * @interface IGateDomainService
 * @template Entity
 */
export interface IGateDomainService<
  Entity extends GateDomainEntity = GateDomainEntity,
> {
  /**
   *
   * Se encarga de abrir la compuerta cuando es necesario.
   *
   * @param {string} gateId
   * @return {*}  {Promise<Entity>}
   * @memberof IGateDomainService
   */
  openGates(gateId: string): Promise<Entity>;

  /**
   *
   * Se encarga de cerrar la compuerta cuando es necesario.
   *
   * @param {string} gateId
   * @return {*}  {Promise<Entity>}
   * @memberof IGateDomainService
   */
  closeGates(gateId: string): Promise<Entity>;

  /**
   *
   * Se encarga de realizar un cambio de estado en la compuerta
   *
   * @param {string} gateId
   * @param {boolean} value
   * @return {*}  {Promise<boolean>}
   * @memberof IGateDomainService
   */
  changeStateGate(gateId: string, value: boolean): Promise<boolean>;

  /**
   *
   * Se encarga de cambiar el estado de emergencia
   *
   * @param {boolean} value
   * @return {*}  {Promise<boolean>}
   * @memberof IGateDomainService
   */
  changeStateEmergency(gateId: string, value: boolean): Promise<boolean>;

  /**
   *
   * Se encarga de obtener un Gate a traves del ID
   *
   * @param {string} value
   * @return {*}  {Promise<Entity>}
   * @memberof IGateDomainService
   */
  getGateById(value: string): Promise<Entity>;
  
  /**
   * Se encarga de registrar el item de Gate
   *
   * @param {GateDomainEntity} entity
   * @return {*}  {Promise<Entity>}
   * @memberof IGateDomainService
   */
  registerGate(entity: GateDomainEntity): Promise<Entity>;
}
