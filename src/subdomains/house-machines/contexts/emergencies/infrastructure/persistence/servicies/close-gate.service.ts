import { Injectable } from '@nestjs/common';
import { isKeyObject } from 'util/types';
import { ICloseGateDomainService } from '../../../domain';
import { CloseGateEntity } from '../entities/close-gate-entity/close-gate.entity';
import { CloseGateRepository } from '../repositories/close-gate-repository/close-gate.repository';
import { ICloseGateService } from './interface/close-gate/close-gate.interface';

@Injectable()
export class CloseGateService implements ICloseGateDomainService<CloseGateEntity> {
  constructor(private readonly closeGateRepository: CloseGateRepository) {}
  registerCloseAction(item: CloseGateEntity): Promise<CloseGateEntity> {
    return this.closeGateRepository.create(item);
  }
  getHistoryCloseAction(): Promise<CloseGateEntity[]> {
    return this.closeGateRepository.findAll();
  }
  getCloseGateById(id: string): Promise<CloseGateEntity> {
    return this.closeGateRepository.findOne(id);
  }
}
