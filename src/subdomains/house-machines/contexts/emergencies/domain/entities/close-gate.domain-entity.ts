import { CloseGateDateValueObject } from '../value-objects/close-gate/close-date/close.date.value-object';
import { CloseGateIdValueObject } from '../value-objects/close-gate/close-gate-id/close-gate-id.value-object';
import { GateDomainEntity } from './gate.domain-entity';
import { ICloseGateDomainEntity } from './interfaces/close-gate.domain-entity.interface';

export class CloseGateDomainEntity implements ICloseGateDomainEntity {
  closeGateId: string | CloseGateIdValueObject;
  closeDate: number | Date | CloseGateDateValueObject;
  gate?: GateDomainEntity
  constructor(data?: CloseGateDomainEntity) {
    if (data?.closeGateId) this.closeGateId = data.closeGateId;
    if (data?.closeDate) this.closeDate = data.closeDate;
    if (data?.gate) this.gate = data.gate
  }
}
