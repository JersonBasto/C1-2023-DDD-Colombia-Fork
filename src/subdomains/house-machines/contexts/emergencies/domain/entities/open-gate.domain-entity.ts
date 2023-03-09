import { OpenGateDateValueObject } from '../value-objects/open-gate/open-date/open.date.value-object';
import { OpenGateIdValueObject } from '../value-objects/open-gate/open-gate-id/open-gate-id.value-object';
import { GateDomainEntity } from './gate.domain-entity';
import { IOpenGateDomainEntity } from './interfaces/open-gate.domain-entity.interface';
import { v4 as uuid } from 'uuid';
import { GateIdValueObject } from '../value-objects';

export class OpenGateDomainEntity implements IOpenGateDomainEntity {
  openGateId: string | OpenGateIdValueObject;
  openDate: number | Date | OpenGateDateValueObject;
  gate?: string | GateIdValueObject;
  constructor(data?: OpenGateDomainEntity) {
    if (data?.openDate) this.openDate = data.openDate;
    if (data?.openGateId) this.openGateId = data.openGateId;
    else this.openGateId = uuid();
    if (data?.gate) this.gate = data.gate;
  }
}
