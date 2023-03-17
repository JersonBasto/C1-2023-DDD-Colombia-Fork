import { Injectable } from '@nestjs/common';
import { IOpenGateDomainService } from '../../../domain';
import { OpenGateEntity } from '../entities/open-gate-entity/open-gate.entity';
import { OpenGateRepository } from '../repositories/open-gate-repository/open-gate.repository';

/**
 *
 * El OpenGateService es un servicio encargado de la logica que los repositorios no
 * pueden hacer
 *
 * @export OpenGateService
 * @class OpenGateService
 * @implements {IOpenGateDomainService<OpenGateEntity>}
 */
@Injectable()
export class OpenGateService implements IOpenGateDomainService<OpenGateEntity> {
  constructor(private readonly openGateRepository: OpenGateRepository) {}

  /**
   *
   * El metodo registerOpenAction se encarga de registrar la accion de abrir compuerta
   *
   * @param {OpenGateEntity} data
   * @return {Promise<OpenGateEntity>}
   * @memberof OpenGateService
   */
  registerOpenAction(data: OpenGateEntity): Promise<OpenGateEntity> {
    return this.openGateRepository.create(data);
  }

  /**
   *
   * El metodo getHistoryCloseAction se encarga de obtener todo el historial de abrir compuerta
   *
   * @return {Promise<OpenGateEntity[]>}
   * @memberof OpenGateService
   */
  getHistoryOpenAction(): Promise<OpenGateEntity[]> {
    return this.openGateRepository.findAll();
  }

  /**
   *
   * El metodo getCloseGateById se encarga de obtener un item de abrir compuerta a traves del Id
   *
   * @param {string} id
   * @return {Promise<OpenGateEntity>}
   * @memberof OpenGateService
   */
  getOpenGateById(id: string): Promise<OpenGateEntity> {
    return this.openGateRepository.findOne(id);
  }
}
