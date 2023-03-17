import { EmergencyDateValueObject } from '../../value-objects/gate/emergency-date/emergency-date.value-object';
import { EmergencyValueObject } from '../../value-objects/gate/emergency/emergency.value-object';
import { GateIdValueObject } from '../../value-objects/gate/gate-id/gate-id.value-object';
import { StateGateValueObject } from '../../value-objects/gate/state-gate/state-gate.value-object';
import { ICloseGateDomainEntity } from './close-gate.domain-entity.interface';
import { IOpenGateDomainEntity } from './open-gate.domain-entity.interface';

export interface IGateDomainEntity {
  emergency?: boolean | EmergencyValueObject;
  stateGate?: boolean | StateGateValueObject;
  emergencyDate?: Date | number | EmergencyDateValueObject | string;
  openGate?: IOpenGateDomainEntity[];
  closeGate?: ICloseGateDomainEntity[];
  gateId?: string | GateIdValueObject;
  description?:string;
}
