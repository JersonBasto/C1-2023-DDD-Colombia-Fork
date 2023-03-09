import { GateIdValueObject } from '../../value-objects';
import { OpenGateDateValueObject } from '../../value-objects/open-gate/open-date/open.date.value-object';
import { OpenGateIdValueObject } from '../../value-objects/open-gate/open-gate-id/open-gate-id.value-object';
import { IGateDomainEntity } from './gate.domain-entity.interface';

export interface IOpenGateDomainEntity {
  openGateId?: string | OpenGateIdValueObject;
  openDate?: Date | number | OpenGateDateValueObject;
  gate?: string | GateIdValueObject;
}
