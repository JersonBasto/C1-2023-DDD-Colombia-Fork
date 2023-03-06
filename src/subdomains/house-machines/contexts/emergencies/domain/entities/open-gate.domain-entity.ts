import { OpenGateDateValueObject } from '../value-objects/open-gate/open-date/open.date.value-object';
import { OpenGateIdValueObject } from '../value-objects/open-gate/open-gate-id/open-gate-id.value-object';
import { IGateDomainEntity } from './interfaces/gate.domain-entity.interface';
import { IOpenGateDomainEntity } from './interfaces/open-gate.domain-entity.interface';

export class OpenGateDomainEntity implements IOpenGateDomainEntity {
  openGateId: string | OpenGateIdValueObject;
  openDate: number | Date | OpenGateDateValueObject;
  gate?: IGateDomainEntity
  constructor(data?: IOpenGateDomainEntity) {
    if (data?.openDate) this.openDate = data.openDate;
    if (data?.openGateId) this.openGateId = data.openGateId;
    if (data?.gate) this.gate = data.gate
  }
}
