import { CloseGateDateValueObject } from '../value-objects/close-gate/close-date/close.date.value-object';
import { CloseGateIdValueObject } from '../value-objects/close-gate/close-gate-id/close-gate-id.value-object';
import { GateDomainEntity } from './gate.domain-entity';
import { ICloseGateDomainEntity } from './interfaces/close-gate.domain-entity.interface';
import { v4 as uuid } from 'uuid';
import { GateIdValueObject } from '../value-objects/gate/gate-id';

export class CloseGateDomainEntity implements ICloseGateDomainEntity {
  id?: string | CloseGateIdValueObject;
  date?: number | Date | CloseGateDateValueObject;
  gate?: string | GateIdValueObject;
  constructor(data?: CloseGateDomainEntity) {
    if (data?.id) this.id = data.id;
    else this.id = uuid();
    if (data?.date) this.date = data.date;
    if (data?.gate) this.gate = data.gate;
  }
}
