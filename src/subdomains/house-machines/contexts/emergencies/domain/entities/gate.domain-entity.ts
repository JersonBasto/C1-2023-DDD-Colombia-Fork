import { EmergencyDateValueObject } from '../value-objects/gate/emergency-date/emergency-date.value-object';
import { EmergencyValueObject } from '../value-objects/gate/emergency/emergency.value-object';
import { GateIdValueObject } from '../value-objects/gate/gate-id/gate-id.value-object';
import { StateGateValueObject } from '../value-objects/gate/state-gate/state-gate.value-object';
import { ICloseGateDomainEntity } from './interfaces/close-gate.domain-entity.interface';
import { IGateDomainEntity } from './interfaces/gate.domain-entity.interface';
import { IOpenGateDomainEntity } from './interfaces/open-gate.domain-entity.interface';

export class GateDomainEntity implements IGateDomainEntity {
  emergency?: boolean | EmergencyValueObject | undefined;
  stateGate?: boolean | StateGateValueObject | undefined;
  emergencyDate?: number | Date | EmergencyDateValueObject | undefined;
  openGate: IOpenGateDomainEntity;
  closeGate: ICloseGateDomainEntity;
  gateId: string | GateIdValueObject;

  constructor(data?: IGateDomainEntity) {
    if (data?.gateId) this.gateId = data.gateId;
    if (data?.emergency) this.emergency = data.emergency;
    if (data?.stateGate) this.stateGate = data.stateGate;
    if (data?.emergencyDate) this.emergencyDate = data.emergencyDate;
    if (data?.openGate) this.openGate = data.openGate;
    if (data?.closeGate) this.closeGate = data.closeGate;
  }
}