/**
 *
 * Se crea interfaz con sus respectivos metodos para que sea usado por su servicio
 * corresopndiente
 *
 * @export IOpenGateService<T>
 * @interface IOpenGateService
 * @template T
 */
export interface IOpenGateService<T> {
  /**
   *
   * registerOpenAction se encargara de registrar la accion de
   * abrir compuerta en la base de datos
   *
   * @param {T} item
   * @return {Promise<T>}
   * @memberof IOpenGateService
   */
  registerOpenAction(item: T): Promise<T>;

  /**
   *
   * getHistoryOpenAction se encargara de obtener todos los registros de
   * abrir compuertas
   *
   * @return {Promise<T[]>}
   * @memberof IOpenGateService
   */
  getHistoryOpenAction(): Promise<T[]>;

  /**
   *
   * GetOpenAction se encargara de obtener un item de T a traves del id
   *
   * @param {string} id
   * @return {Promise<T>}
   * @memberof IOpenGateService
   */
  GetOpenAction(id: string): Promise<T>;
}
