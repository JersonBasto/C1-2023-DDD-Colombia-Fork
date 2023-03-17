import { OpenGateDateValueObject } from '../value-objects/open-gate/open-date/open.date.value-object';
import { OpenGateIdValueObject } from '../value-objects/open-gate/open-gate-id/open-gate-id.value-object';
import { GateDomainEntity } from './gate.domain-entity';
import { IOpenGateDomainEntity } from './interfaces/open-gate.domain-entity.interface';
import { v4 as uuid } from 'uuid';

/**
 *
 * Se crea la entidad OpenGateDomainEntity implementando la interfaz
 * IOpenGateDomainEntity para usar en los demas archivos
 *
 * @export OpenGateDomainEntity
 * @class OpenGateDomainEntity
 * @implements {IOpenGateDomainEntity}
 */
export class OpenGateDomainEntity implements IOpenGateDomainEntity {
  id?: string | OpenGateIdValueObject;
  date?: number | Date | OpenGateDateValueObject;
  gatesOpen: GateDomainEntity;
  description?: string;
  constructor(data?: OpenGateDomainEntity) {
    if (data?.date) this.date = data.date;
    if (data?.id) this.id = data.id;
    else this.id = uuid();
    if (data?.gatesOpen) this.gatesOpen = data.gatesOpen;
  }
}
