import { CloseGateDateValueObject } from '../value-objects/close-gate/close-date/close.date.value-object';
import { CloseGateIdValueObject } from '../value-objects/close-gate/close-gate-id/close-gate-id.value-object';
import { GateDomainEntity } from './gate.domain-entity';
import { ICloseGateDomainEntity } from './interfaces/close-gate.domain-entity.interface';
import { v4 as uuid } from 'uuid';
import { GateIdValueObject } from '../value-objects/gate/gate-id';

export class CloseGateDomainEntity implements ICloseGateDomainEntity {
  closeGateId: string | CloseGateIdValueObject;
  closeDate: number | Date | CloseGateDateValueObject;
  gate?: string | GateIdValueObject;
  constructor(data?: CloseGateDomainEntity) {
    if (data?.closeGateId) this.closeGateId = data.closeGateId;
    else this.closeGateId = uuid();
    if (data?.closeDate) this.closeDate = data.closeDate;
    if (data?.gate) this.gate = data.gate;
  }
}
