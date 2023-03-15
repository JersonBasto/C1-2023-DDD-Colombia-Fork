import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloseGateEntity } from '../../entities/close-gate-entity/close-gate.entity';
import { IBase } from '../interfaces/base.interface';

export class CloseGateRepository implements IBase<CloseGateEntity> {
  constructor(
    @InjectRepository(CloseGateEntity)
    private readonly closeGatesRepository: Repository<CloseGateEntity>,
  ) {}
  async create(item: CloseGateEntity): Promise<CloseGateEntity> {
    return this.closeGatesRepository.save(item);
  }
  async update(
    id: string,
    item: CloseGateEntity,
  ): Promise<CloseGateEntity> {
    const openGate = await this.closeGatesRepository.findOneBy({ id: id });
    if (openGate) {
      const newOpenGate = {
        ...openGate,
        ...item,
        id,
      };
      return this.closeGatesRepository.save(newOpenGate);
    }
    throw new NotFoundException('No se encontro con el ID');
  }
  async delete(id: string): Promise<boolean> {
    const openGate = await this.closeGatesRepository.findOneBy({ id: id });
    if (openGate) {
      await this.closeGatesRepository.remove(openGate);
      return true;
    }
    return false;
  }
  async findAll(): Promise<CloseGateEntity[]> {
    return this.closeGatesRepository.find();
  }
  async findOne(id: string): Promise<CloseGateEntity> {
    const data = await this.closeGatesRepository.findOneBy({ id: id });
    if (data) return data;
    throw new NotFoundException('No se encontro a traves de ID');
  }
}
