/**
 *
 * Se crea interfaz con sus respectivos metodos para que sea usado por su servicio
 * corresopndiente
 *
 * @export ICloseGateService<T>
 * @interface ICloseGateService
 * @template T
 */
export interface ICloseGateService<T> {
  /**
   *
   * registerCloseAction se encargara de registrar la accion de
   * cerrar compuerta en la base de datos
   *
   * @param {T} item
   * @return {Promise<T>}
   * @memberof ICloseGateService
   */
  registerCloseAction(item: T): Promise<T>;

  /**
   *
   * getHistoryCloseAction se encargara de obtener todos los registros de
   * cerrar compuertas
   *
   * @return {Promise<T[]>}
   * @memberof ICloseGateService
   */
  getHistoryCloseAction(): Promise<T[]>;

  /**
   *
   * GetCloseAction se encargara de obtener un item de T a traves del id
   *
   * @param {string} id
   * @return {Promise<T>}
   * @memberof ICloseGateService
   */
  GetCloseAction(id: string): Promise<T>;
}
