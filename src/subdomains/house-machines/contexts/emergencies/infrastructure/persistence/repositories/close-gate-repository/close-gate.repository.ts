import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloseGateEntity } from '../../entities/close-gate-entity/close-gate.entity';
import { IBase } from '../interfaces/base.interface';

/**
 *
 * Se crea el repositorio CloseGateRepository encargado de contener los metodos
 * entregados por TypeOrm
 *
 * @export CloseGateRepository
 * @class CloseGateRepository
 * @implements {IBase<CloseGateEntity>}
 */
export class CloseGateRepository implements IBase<CloseGateEntity> {
  constructor(
    @InjectRepository(CloseGateEntity)
    private readonly closeGatesRepository: Repository<CloseGateEntity>,
  ) {}

  /**
   *
   * create se encarga de inyectar la informacion dentro de la base dde datos
   *
   * @param {CloseGateEntity} item
   * @return {Promise<CloseGateEntity>}
   * @memberof CloseGateRepository
   */
  async create(item: CloseGateEntity): Promise<CloseGateEntity> {
    return this.closeGatesRepository.save(item);
  }

  /**
   *
   * update se encarga de actualizar la informacion dentro de la base de datos
   *
   * @param {string} id
   * @param {CloseGateEntity} item
   * @return {Promise<CloseGateEntity>}
   * @memberof CloseGateRepository
   */
  async update(id: string, item: CloseGateEntity): Promise<CloseGateEntity> {
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

  /**
   *
   * delete se encarga de eliminar la informacion dentro de la base de datos
   *
   * @param {string} id
   * @return {Promise<boolean>}
   * @memberof CloseGateRepository
   */
  async delete(id: string): Promise<boolean> {
    const openGate = await this.closeGatesRepository.findOneBy({ id: id });
    if (openGate) {
      await this.closeGatesRepository.remove(openGate);
      return true;
    }
    return false;
  }

  /**
   *
   * findAll se encarga de obtener toda la informacion dentro de la base de datos
   *
   * @return {Promise<CloseGateEntity[]>}
   * @memberof CloseGateRepository
   */
  async findAll(): Promise<CloseGateEntity[]> {
    return this.closeGatesRepository.find();
  }

  /**
   *
   * findOne se encarga de obtener un item dentro de la base de datos
   *
   * @param {string} id
   * @return {Promise<CloseGateEntity>}
   * @memberof CloseGateRepository
   */
  async findOne(id: string): Promise<CloseGateEntity> {
    const data = await this.closeGatesRepository.findOneBy({ id: id });
    if (data) return data;
    throw new NotFoundException('No se encontro a traves de ID');
  }
}
