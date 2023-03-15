import { CloseGateDateValueObject } from '../../value-objects/close-gate/close-date/close.date.value-object';
import { CloseGateIdValueObject } from '../../value-objects/close-gate/close-gate-id/close-gate-id.value-object';
import { GateIdValueObject } from '../../value-objects/gate/gate-id';
import { IGateDomainEntity } from './gate.domain-entity.interface';

export interface ICloseGateDomainEntity {
  closeGateId?: string | CloseGateIdValueObject;
  closeDate?: Date | number | CloseGateDateValueObject;
  gate?: string | GateIdValueObject
}
