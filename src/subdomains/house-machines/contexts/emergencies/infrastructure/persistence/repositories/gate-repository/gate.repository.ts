import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GateEntity } from '../../entities/gate-entity/gate-entity.entity';
import { IBase } from '../interfaces/base.interface';

export class GateRepository implements IBase<GateEntity> {
  constructor(
    @InjectRepository(GateEntity)
    private readonly gateRepository: Repository<GateEntity>,
  ) {}
  async create(item: GateEntity): Promise<GateEntity> {
    return this.gateRepository.save(item);
  }
  async update(id: string, item: GateEntity): Promise<GateEntity> {
    let data = await this.gateRepository.findOneBy({ id: id });
    if (data) {
      data = {
        ...data,
        ...item,
        id,
      };
      return this.gateRepository.save(data);
    }
    throw new NotFoundException('No se encontro data con el Id');
  }
  async delete(id: string): Promise<boolean> {
    const data = await this.gateRepository.findOneBy({ id: id });
    if (data) {
      this.gateRepository.remove(data);
      return true;
    }
    return false;
  }
  async findAll(): Promise<GateEntity[]> {
    return this.gateRepository.find();
  }
  async findOne(id: string): Promise<GateEntity> {
    const data = await this.gateRepository.findOneBy({ id:id });
    if (data) return data;
    throw new NotFoundException('No se encontro Data con el Id');
  }
}
