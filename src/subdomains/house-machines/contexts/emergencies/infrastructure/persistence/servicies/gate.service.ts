import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IGateDomainService } from '../../../domain';
import { GateEntity } from '../entities/gate-entity/gate-entity.entity';
import { GateRepository } from '../repositories/gate-repository/gate.repository';
import * as moment from 'moment';

/**
 *
 * El GateService es un servicio encargado de la logica que los repositorios no
 * pueden hacer
 *
 * @export GateService
 * @class GateService
 * @implements {IGateDomainService<GateEntity>}
 */
@Injectable()
export class GateService implements IGateDomainService<GateEntity> {
  constructor(private readonly gateRepository: GateRepository) {}

  /**
   *
   * Se encarga de registrar un item de GateEntity
   *
   * @param {GateEntity} entity
   * @return {Promise<GateEntity>}
   * @memberof GateService
   */
  async registerGate(entity: GateEntity): Promise<GateEntity> {
    return await this.gateRepository.create(entity);
  }

  /**
   *
   * Se encarga de abrir una compuerta a traves del id
   *
   * @param {string} gateId
   * @return {Promise<GateEntity>}
   * @memberof GateService
   */
  async openGates(gateId: string): Promise<GateEntity> {
    const data = await this.gateRepository.findOne(gateId);
    if (data.emergency && data.stateGate) {
      data.emergencyDate = moment(Date.now()).format('DD-MMM-YYYY HH:mm:ss');
      this.gateRepository.update(gateId, data);
      const newData = await this.gateRepository.findOne(gateId);
      return newData;
    }
    throw new BadRequestException(
      'No se puede abrir la puerta, no cumple condiciones',
    );
  }

  /**
   *
   * Se encarga de cerrar una compuerta a traves del id
   *
   * @param {string} gateId
   * @return {Promise<GateEntity>}
   * @memberof GateService
   */
  async closeGates(gateId: string): Promise<GateEntity> {
    const data = await this.gateRepository.findOne(gateId);
    if (data.emergency === false && data.stateGate === false) {
      data.emergencyDate = moment(0).format('DD-MMM-YYYY HH:mm:ss');
      this.gateRepository.update(gateId, data);
      const newData = await this.gateRepository.findOne(gateId);
      return newData;
    }
    throw new BadRequestException(
      'No se puede cerrar la puerta, no cumple condiciones',
    );
  }

  /**
   *
   * Se encarga de cambiar el estado de la compuerta
   *
   * @param {string} gateId
   * @param {boolean} value
   * @return {Promise<boolean>}
   * @memberof GateService
   */
  async changeStateGate(gateId: string, value: boolean): Promise<boolean> {
    const data = await this.gateRepository.findOne(gateId);
    if (data) {
      data.stateGate = value;
      this.gateRepository.update(gateId, data);
      return true;
    }
    return false;
  }

  /**
   *
   * Se encarga de cambiar el estado de emergencia de la compuerta
   *
   * @param {string} gateId
   * @param {boolean} value
   * @return {Promise<boolean>}
   * @memberof GateService
   */
  async changeStateEmergency(gateId: string, value: boolean): Promise<boolean> {
    const data = await this.gateRepository.findOne(gateId);
    if (data) {
      data.emergency = value;
      this.gateRepository.update(gateId, data);
      return true;
    }
    return false;
  }

  /**
   *
   * Se encarga de obtener un item de GateEntity a traves del id
   *
   * @param {string} gateId
   * @return {Promise<GateEntity>}
   * @memberof GateService
   */
  async getGateById(gateId: string): Promise<GateEntity> {
    const data = await this.gateRepository.findOne(gateId);
    if (data) return data;
    throw new NotFoundException('No se encontro data con el Id: ' + gateId);
  }
}
