import { v4 as uuid } from 'uuid';
import { IsUUID4 } from '../../../../../../../../shared/validations/is-uuid-v4.validation';
import {
  IErrorValueObject,
  ValueObjectBase,
} from '../../../../../../../../shared/sofka';

/**
 * Se valida el ID de Gate, en caso no tener uno se genera otro con uuid v4
 *
 * @export
 * @class GateIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class GateIdValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : uuid());
  }

  /**
   *
   * Ejecuta las validaciones del dato
   *
   * @memberof GateIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   *
   * Valida que el dato entregado cumpla con ser un uuid
   *
   * @private validateStructure
   * @memberof GateIdValueObject
   */
  private validateStructure(): void {
    if (this.value && IsUUID4(this.value) === false) {
      this.setError({
        field: 'gateId',
        message: 'El "gateId" no tiene un formato válido',
      } as IErrorValueObject);
    }
  }
}
