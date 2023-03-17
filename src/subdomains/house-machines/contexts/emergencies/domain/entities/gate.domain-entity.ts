import { EmergencyDateValueObject } from '../value-objects/gate/emergency-date/emergency-date.value-object';
import { EmergencyValueObject } from '../value-objects/gate/emergency/emergency.value-object';
import { GateIdValueObject } from '../value-objects/gate/gate-id/gate-id.value-object';
import { StateGateValueObject } from '../value-objects/gate/state-gate/state-gate.value-object';
import { CloseGateDomainEntity } from './close-gate.domain-entity';
import { IGateDomainEntity } from './interfaces/gate.domain-entity.interface';
import { OpenGateDomainEntity } from './open-gate.domain-entity';
import { v4 as uuid } from 'uuid';

/**
 *
 * Se crea la entidad GateDomainEntity implementando la interfaz
 * IGateDomainEntity para usar en los demas archivos
 *
 * @export GateDomainEntity
 * @class GateDomainEntity
 * @implements {IGateDomainEntity}
 */
export class GateDomainEntity implements IGateDomainEntity {
  emergency?: boolean | EmergencyValueObject | undefined;
  stateGate?: boolean | StateGateValueObject | undefined;
  emergencyDate?: number | Date | EmergencyDateValueObject | undefined | string;
  openGate?: OpenGateDomainEntity[];
  closeGate?: CloseGateDomainEntity[];
  gateId?: string | GateIdValueObject;
  description?: string;

  constructor(data?: GateDomainEntity) {
    if (data?.gateId) this.gateId = data.gateId;
    else this.gateId = uuid();
    if (data?.emergency) this.emergency = data.emergency;
    if (data?.stateGate) this.stateGate = data.stateGate;
    if (data?.emergencyDate) this.emergencyDate = data.emergencyDate;
    if (data?.openGate) this.openGate = data.openGate;
    if (data?.closeGate) this.closeGate = data.closeGate;
  }
}
