import { OpenGateDateValueObject } from '../../value-objects/open-gate/open-date/open.date.value-object';
import { OpenGateIdValueObject } from '../../value-objects/open-gate/open-gate-id/open-gate-id.value-object';
import { GateDomainEntity } from '../gate.domain-entity';

/**
 *
 * Se crea la interface para los datos de registrar la
 * accion de abrir compuerta
 *
 * @export IOpenGateDomainEntity
 * @interface IOpenGateDomainEntity
 */
export interface IOpenGateDomainEntity {
  openGateId?: string | OpenGateIdValueObject;
  openDate?: Date | number | OpenGateDateValueObject;
  description?: string;
  gatesOpen: GateDomainEntity;
}
