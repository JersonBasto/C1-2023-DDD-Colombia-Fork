import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GateEntity } from '../../entities/gate-entity/gate-entity.entity';
import { IBase } from '../interfaces/base.interface';

/**
 *
 * Se crea el repositorio GateRepository encargado de contener los metodos
 * entregados por TypeOrm
 *
 * @export GateRepository
 * @class GateRepository
 * @implements {IBase<GateEntity>}
 */
export class GateRepository implements IBase<GateEntity> {
  constructor(
    @InjectRepository(GateEntity)
    private readonly gateRepository: Repository<GateEntity>,
  ) {}

  /**
   *
   * create se encarga de inyectar la informacion dentro de la base dde datos
   *
   * @param {GateEntity} item
   * @return {Promise<GateEntity>}
   * @memberof GateRepository
   */
  async create(item: GateEntity): Promise<GateEntity> {
    return this.gateRepository.save(item);
  }

  /**
   *
   * update se encarga de actualizar la informacion dentro de la base de datos
   *
   * @param {string} id
   * @param {GateEntity} item
   * @return {Promise<GateEntity>}
   * @memberof GateRepository
   */
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

  /**
   *
   * delete se encarga de eliminar la informacion dentro de la base de datos
   *
   * @param {string} id
   * @return {Promise<boolean>}
   * @memberof GateRepository
   */
  async delete(id: string): Promise<boolean> {
    const data = await this.gateRepository.findOneBy({ id: id });
    if (data) {
      this.gateRepository.remove(data);
      return true;
    }
    return false;
  }

  /**
   *
   * findAll se encarga de obtener toda la informacion dentro de la base de datos
   *
   * @return {Promise<GateEntity[]>}
   * @memberof GateRepository
   */
  async findAll(): Promise<GateEntity[]> {
    return this.gateRepository.find();
  }

  /**
   *
   * findOne se encarga de obtener un item dentro de la base de datos
   *
   * @param {string} id
   * @return {Promise<GateEntity>}
   * @memberof GateRepository
   */
  async findOne(id: string): Promise<GateEntity> {
    const data = await this.gateRepository.findOneBy({ id:id });
    if (data) return data;
    throw new NotFoundException('No se encontro Data con el Id');
  }
}
