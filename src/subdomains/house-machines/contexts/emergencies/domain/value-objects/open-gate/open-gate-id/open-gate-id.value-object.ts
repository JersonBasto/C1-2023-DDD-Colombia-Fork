import { v4 as uuid } from 'uuid';
import { ValueObjectBase } from '../../../../../../../../shared/sofka/bases/object-value.base';
import { IErrorValueObject } from '../../../../../../../../../dist/shared/sofka/interface/error-object-value.interface';
import { IsUUID4 } from '../../../../../../../../shared/validations/is-uuid-v4.validation';

/**
 * Se valida el ID de openGate, en caso de no tener se asigna uno con uuid v4
 *
 * @export
 * @class OpenGateIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class OpenGateIdValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : uuid());
  }

  /**
   *
   * Ejecuta las validaciones del dato
   *
   * @memberof OpenGateIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   *
   * Valida que el dato cumpla con ser un uuid
   *
   * @private validateStructure
   * @memberof OpenGateIdValueObject
   */
  private validateStructure(): void {
    if (this.value && IsUUID4(this.value) === false) {
      this.setError({
        field: 'openGateId',
        message: 'El "openGateId" no tiene un formato válido',
      } as IErrorValueObject);
    }
  }
}
