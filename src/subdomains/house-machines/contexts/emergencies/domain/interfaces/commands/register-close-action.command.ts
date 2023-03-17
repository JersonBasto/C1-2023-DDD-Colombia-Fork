import { GateEntity } from '../../../infrastructure/persistence/entities/gate-entity/gate-entity.entity';

export interface IRegisterCloseActionCommand {
  id?: string;
  date?: number | Date;
  description: string;
  gatesClose: GateEntity;
}
