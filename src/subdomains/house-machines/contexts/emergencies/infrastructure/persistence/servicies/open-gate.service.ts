import { Injectable } from '@nestjs/common';
import { IOpenGateDomainService } from '../../../domain';
import { OpenGateEntity } from '../entities/open-gate-entity/open-gate.entity';
import { OpenGateRepository } from '../repositories/open-gate-repository/open-gate.repository';
import { IOpenGateService } from './interface/open-gate/open-gate.interface';

@Injectable()
export class OpenGateService implements IOpenGateDomainService<OpenGateEntity> {
  constructor(private readonly openGateRepository: OpenGateRepository) {}
  registerOpenAction(data: OpenGateEntity): Promise<OpenGateEntity> {
    return this.openGateRepository.create(data);
  }
  getHistoryOpenAction(): Promise<OpenGateEntity[]> {
    return this.openGateRepository.findAll();
  }
  getOpenGateById(id: string): Promise<OpenGateEntity> {
    return this.openGateRepository.findOne(id);
  }
}
