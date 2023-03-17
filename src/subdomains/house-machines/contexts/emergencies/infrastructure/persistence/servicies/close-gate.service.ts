import { Injectable } from '@nestjs/common';
import { ICloseGateDomainService } from '../../../domain';
import { CloseGateEntity } from '../entities/close-gate-entity/close-gate.entity';
import { CloseGateRepository } from '../repositories/close-gate-repository/close-gate.repository';

/**
 *
 * El CloseGateService es un servicio encargado de la logica que los repositorios no
 * pueden hacer
 *
 * @export CloseGateService
 * @class CloseGateService
 * @implements {ICloseGateDomainService<CloseGateEntity>}
 */
@Injectable()
export class CloseGateService
  implements ICloseGateDomainService<CloseGateEntity>
{
  constructor(private readonly closeGateRepository: CloseGateRepository) {}

  /**
   *
   * El metodo registerCloseAction se encarga de registrar la accion de cerrar compuerta
   *
   * @param {CloseGateEntity} item
   * @return {Promise<CloseGateEntity>}
   * @memberof CloseGateService
   */
  registerCloseAction(item: CloseGateEntity): Promise<CloseGateEntity> {
    return this.closeGateRepository.create(item);
  }

  /**
   *
   * El metodo getHistoryCloseAction se encarga de obtener todo el historial de cerrrar compuerta
   *
   * @return {Promise<CloseGateEntity[]>}
   * @memberof CloseGateService
   */
  getHistoryCloseAction(): Promise<CloseGateEntity[]> {
    return this.closeGateRepository.findAll();
  }

  /**
   *
   * El metodo getCloseGateById se encarga de obtener un item de cerrar compuerta a traves del Id
   *
   * @param {string} id
   * @return {Promise<CloseGateEntity>}
   * @memberof CloseGateService
   */
  getCloseGateById(id: string): Promise<CloseGateEntity> {
    return this.closeGateRepository.findOne(id);
  }
}
