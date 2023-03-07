import { EmergencyDateValueObject } from '../value-objects/gate/emergency-date/emergency-date.value-object';
import { EmergencyValueObject } from '../value-objects/gate/emergency/emergency.value-object';
import { GateIdValueObject } from '../value-objects/gate/gate-id/gate-id.value-object';
import { StateGateValueObject } from '../value-objects/gate/state-gate/state-gate.value-object';
import { CloseGateDomainEntity } from './close-gate.domain-entity';
import { IGateDomainEntity } from './interfaces/gate.domain-entity.interface';
import { OpenGateDomainEntity } from './open-gate.domain-entity';

export class GateDomainEntity implements IGateDomainEntity {
  emergency?: boolean | EmergencyValueObject | undefined;
  stateGate?: boolean | StateGateValueObject | undefined;
  emergencyDate?: number | Date | EmergencyDateValueObject | undefined;
  openGate?: OpenGateDomainEntity[];
  closeGate?: CloseGateDomainEntity[];
  gateId: string | GateIdValueObject;

  constructor(data?: GateDomainEntity) {
    if (data?.gateId) this.gateId = data.gateId;
    if (data?.emergency) this.emergency = data.emergency;
    if (data?.stateGate) this.stateGate = data.stateGate;
    if (data?.emergencyDate) this.emergencyDate = data.emergencyDate;
    if (data?.openGate) this.openGate = data.openGate;
    if (data?.closeGate) this.closeGate = data.closeGate;
  }
}