import { CloseGateDateValueObject } from '../../value-objects/close-gate/close-date/close.date.value-object';
import { CloseGateIdValueObject } from '../../value-objects/close-gate/close-gate-id/close-gate-id.value-object';
import { GateIdValueObject } from '../../value-objects/gate/gate-id';

/**
 *
 * Se crea la interface para manejar los datos
 * de cerrar Compuerta
 *
 * @export ICloseGateDomainEntity
 * @interface ICloseGateDomainEntity
 */
export interface ICloseGateDomainEntity {
  closeGateId?: string | CloseGateIdValueObject;
  closeDate?: Date | number | CloseGateDateValueObject;
  description?: string;
  gate?: string | GateIdValueObject;
}
