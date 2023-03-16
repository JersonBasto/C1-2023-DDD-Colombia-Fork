import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IGateDomainService } from '../../../domain';
import { GateEntity } from '../entities/gate-entity/gate-entity.entity';
import { GateRepository } from '../repositories/gate-repository/gate.repository';
import * as moment from 'moment';

@Injectable()
export class GateService implements IGateDomainService<GateEntity> {
  constructor(private readonly gateRepository: GateRepository) {}
  async registerGate(entity: GateEntity): Promise<GateEntity> {
    return await this.gateRepository.create(entity);
  }
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
  async changeStateGate(gateId: string, value: boolean): Promise<boolean> {
    const data = await this.gateRepository.findOne(gateId);
    if (data) {
      data.stateGate = value;
      this.gateRepository.update(gateId, data);
      return true;
    }
    return false;
  }
  async changeStateEmergency(gateId: string, value: boolean): Promise<boolean> {
    const data = await this.gateRepository.findOne(gateId);
    if (data) {
      data.emergency = value;
      this.gateRepository.update(gateId, data);
      return true;
    }
    return false;
  }
  async getGateById(gateId: string): Promise<GateEntity> {
    const data = await this.gateRepository.findOne(gateId);
    if (data) return data;
    throw new NotFoundException('No se encontro data con el Id: ' + gateId);
  }
}
