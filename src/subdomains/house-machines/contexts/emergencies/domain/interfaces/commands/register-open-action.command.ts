import { GateEntity } from '../../../infrastructure/persistence/entities/gate-entity/gate-entity.entity';

export interface IRegisterOpenActionCommand {
  id?: string;
  date?: number | Date;
  gatesOpen: GateEntity;
}
