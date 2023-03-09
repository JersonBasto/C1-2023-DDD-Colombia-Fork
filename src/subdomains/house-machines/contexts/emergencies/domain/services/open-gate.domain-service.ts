import { OpenGateDomainEntity } from '../entities/open-gate.domain-entity';

/**
 * Se crea la interfaz del servicio de OpenGate el cual cuenta con 3 metodos
 * registerOpenAction, getHistoryOpenAction y getOpenGateById
 *
 * @export
 * @interface IOpenGateDomainService
 * @template Entity
 */
export interface IOpenGateDomainService<
  Entity extends OpenGateDomainEntity = OpenGateDomainEntity,
> {
  /**
   *
   * Se encarga de registrar la accion de Abrir compuerta
   *
   * @param {OpenGateDomainEntity} data
   * @return {*}  {Promise<Entity>}
   * @memberof IOpenGateDomainService
   */
  registerOpenAction(data: OpenGateDomainEntity): Promise<Entity>;

  /**
   *
   * Se encarga de obtener el historial de todos los items creados
   * al abrir la compuerta
   *
   * @return {*}  {Promise<Entity[]>}
   * @memberof IOpenGateDomainService
   */
  getHistoryOpenAction(): Promise<Entity[]>;

  /**
   *
   * Se encarga de obtener un item OpenGate a traves del ID
   *
   * @param {string} value
   * @return {*}  {Promise<Entity>}
   * @memberof IOpenGateDomainService
   */
  getOpenGateById(value: string): Promise<Entity>;
}
