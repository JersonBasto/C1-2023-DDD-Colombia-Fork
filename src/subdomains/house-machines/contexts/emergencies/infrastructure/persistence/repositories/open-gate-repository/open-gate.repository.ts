import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenGateEntity } from 'src/subdomains/house-machines/contexts/emergencies/infrastructure/persistence/entities/open-gate-entity/open-gate.entity';
import { Repository } from 'typeorm';
import { IBase } from '../interfaces/base.interface';

/**
 *
 * Se crea el repositorio OpenGateRepository encargado de contener los metodos
 * entregados por TypeOrm
 *
 * @export OpenGateRepository
 * @class OpenGateRepository
 * @implements {IBase<OpenGateEntity>}
 */
export class OpenGateRepository implements IBase<OpenGateEntity> {
  constructor(
    @InjectRepository(OpenGateEntity)
    private readonly openGatesRepository: Repository<OpenGateEntity>,
  ) {}

  /**
   *
   * create se encarga de inyectar la informacion dentro de la base dde datos
   *
   * @param {OpenGateEntity} item
   * @return {Promise<OpenGateEntity>}
   * @memberof OpenGateRepository
   */
  async create(item: OpenGateEntity): Promise<OpenGateEntity> {
    return this.openGatesRepository.save(item);
  }

  /**
   *
   * update se encarga de actualizar la informacion dentro de la base de datos
   *
   * @param {string} id
   * @param {OpenGateEntity} item
   * @return {Promise<OpenGateEntity>}
   * @memberof OpenGateRepository
   */
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

  /**
   *
   * delete se encarga de eliminar la informacion dentro de la base de datos
   *
   * @param {string} id
   * @return {Promise<boolean>}
   * @memberof OpenGateRepository
   */
  async delete(id: string): Promise<boolean> {
    const openGate = await this.openGatesRepository.findOneBy({ id: id });
    if (openGate) {
      await this.openGatesRepository.remove(openGate);
      return true;
    }
    return false;
  }

  /**
   *
   * findAll se encarga de obtener toda la informacion dentro de la base de datos
   *
   * @return {Promise<OpenGateEntity[]>}
   * @memberof OpenGateRepository
   */
  async findAll(): Promise<OpenGateEntity[]> {
    return this.openGatesRepository.find();
  }

  /**
   *
   * findOne se encarga de obtener un item dentro de la base de datos
   *
   * @param {string} id
   * @return {Promise<OpenGateEntity>}
   * @memberof OpenGateRepository
   */
  async findOne(id: string): Promise<OpenGateEntity> {
    const data = await this.openGatesRepository.findOneBy({ id: id });
    if (data) return data;
    throw new NotFoundException('No se encontro a traves de ID');
  }
}
