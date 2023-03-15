import { Injectable } from '@nestjs/common';
import { OpenGateEntity } from '../entities/open-gate-entity/open-gate.entity';
import { OpenGateRepository } from '../repositories/open-gate-repository/open-gate.repository';
import { IOpenGateService } from './interface/open-gate/open-gate.interface';

@Injectable()
export class OpenGateService implements IOpenGateService<OpenGateEntity> {
  constructor(private readonly openGateRepository: OpenGateRepository) {}
  registerOpenAction(item: OpenGateEntity): Promise<OpenGateEntity> {
    return this.openGateRepository.create(item);
  }
  getHistoryOpenAction(): Promise<OpenGateEntity[]> {
    return this.openGateRepository.findAll();
  }
  GetOpenAction(id: string): Promise<OpenGateEntity> {
    return this.openGateRepository.findOne(id);
  }
}
