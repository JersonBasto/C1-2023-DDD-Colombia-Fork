import { CloseGateDateValueObject } from '../../value-objects/close-gate/close-date/close.date.value-object';
import { CloseGateIdValueObject } from '../../value-objects/close-gate/close-gate-id/close-gate-id.value-object';

export interface ICloseGateDomainEntity {
  closeGateId: string | CloseGateIdValueObject;
  closeDate: Date | number | CloseGateDateValueObject;
}
