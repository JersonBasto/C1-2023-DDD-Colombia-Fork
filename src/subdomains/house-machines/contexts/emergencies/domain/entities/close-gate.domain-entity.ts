import { CloseGateDateValueObject } from '../value-objects/close-gate/close-date/close.date.value-object';
import { CloseGateIdValueObject } from '../value-objects/close-gate/close-gate-id/close-gate-id.value-object';
import { ICloseGateDomainEntity } from './interfaces/close-gate.domain-entity.interface';
import { v4 as uuid } from 'uuid';
import { GateDomainEntity } from './gate.domain-entity';

/**
 *
 * Se crea la entidad CloseGateDomainEntity implementando la interfaz
 * ICloseGateDomainEntity para usar en los demas archivos
 *
 * @export CloseGateDomainEntity
 * @class CloseGateDomainEntity
 * @implements {ICloseGateDomainEntity}
 */
export class CloseGateDomainEntity implements ICloseGateDomainEntity {
  id?: string | CloseGateIdValueObject;
  date?: number | Date | CloseGateDateValueObject;
  gatesClose: GateDomainEntity;
  description: string;

  constructor(data?: CloseGateDomainEntity) {
    if (data?.id) this.id = data.id;
    else this.id = uuid();
    if (data?.date) this.date = data.date;
    if (data?.gatesClose) this.gatesClose = data.gatesClose;
  }
}
