import { OpenGateDateValueObject } from '../value-objects/open-gate/open-date/open.date.value-object';
import { OpenGateIdValueObject } from '../value-objects/open-gate/open-gate-id/open-gate-id.value-object';
import { IOpenGateDomainEntity } from './interfaces/open-gate.domain-entity.interface';

export class OpenGateDomainEntity implements IOpenGateDomainEntity {
  openGateId: string | OpenGateIdValueObject;
  openDate: number | Date | OpenGateDateValueObject;
  constructor(data?: IOpenGateDomainEntity) {
    if (data?.openDate) this.openDate = data.openDate;
    if (data?.openGateId) this.openGateId = data.openGateId;
  }
}
