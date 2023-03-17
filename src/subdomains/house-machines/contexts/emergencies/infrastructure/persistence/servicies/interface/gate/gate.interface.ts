/**
 *
 * Se crea interfaz con sus respectivos metodos para que sea usado por su servicio
 * corresopndiente
 *
 * @export IGateService<T>
 * @interface IGateService
 * @template T
 */
export interface IGateService<T> {
  /**
   *
   * registerGate se encargara de registrar la
   * compuerta en la base de datos
   *
   * @param {T} entity
   * @return {Promise<T>}
   * @memberof IGateService
   */
  registerGate(entity: T): Promise<T>;

  /**
   *
   * openGate se encargara de abrir una compuerta a traves del id
   *
   * @param {string} gateId
   * @return {Promise<T>}
   * @memberof IGateService
   */
  openGate(gateId: string): Promise<T>;

  /**
   *
   * closeGates se encargara de abrir una compuerta a traves del id
   *
   * @param {string} gateId
   * @return {Promise<T>}
   * @memberof IGateService
   */
  closeGates(gateId: string): Promise<T>;

  /**
   *
   * changeStateGate se encargara de cambiar el estado de la compuerta
   *
   * @param {string} gateId
   * @param {boolean} value
   * @return {Promise<boolean>}
   * @memberof IGateService
   */
  changeStateGate(gateId: string, value: boolean): Promise<boolean>;

  /**
   *
   * changeStateEmergency se encargara de cambiar el estado de emergencia
   *
   * @param {string} gateId
   * @param {boolean} value
   * @return {Promise<boolean>}
   * @memberof IGateService
   */
  changeStateEmergency(gateId: string, value: boolean): Promise<boolean>;

  /**
   *
   * getGateById Se obtiene compuerta por id
   *
   * @param {string} gateId
   * @return {Promise<T>}
   * @memberof IGateService
   */
  getGateById(gateId: string): Promise<T>;
}
