import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenGateEntity } from 'src/subdomains/house-machines/contexts/emergencies/infrastructure/persistence/entities/open-gate-entity/open-gate.entity';
import { Repository } from 'typeorm';
import { IBase } from '../interfaces/base.interface';

export class OpenGateRepository implements IBase<OpenGateEntity> {
  constructor(
    @InjectRepository(OpenGateEntity)
    private readonly openGatesRepository: Repository<OpenGateEntity>,
  ) {}
  async create(item: OpenGateEntity): Promise<OpenGateEntity> {
    return this.openGatesRepository.save(item);
  }
  async update(id: string, item: OpenGateEntity): Promise<OpenGateEntity> {
    const openGate = await this.openGatesRepository.findOneBy({ id: id });
    if (openGate) {
      const newOpenGate = {
        ...openGate,
        ...item,
        id,
      };
      return this.openGatesRepository.save(newOpenGate);
    }
    throw new NotFoundException('No se encontro con el ID');
  }
  async delete(id: string): Promise<boolean> {
    const openGate = await this.openGatesRepository.findOneBy({ id: id });
    if (openGate) {
      await this.openGatesRepository.remove(openGate);
      return true;
    }
    return false;
  }
  async findAll(): Promise<OpenGateEntity[]> {
    return this.openGatesRepository.find();
  }
  async findOne(id: string): Promise<OpenGateEntity> {
    const data = await this.openGatesRepository.findOneBy({ id: id });
    if (data) return data;
    throw new NotFoundException('No se encontro a traves de ID');
  }
}
