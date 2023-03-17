import { IErrorValueObject, ValueObjectBase } from 'src/shared/sofka';
import { IsUUID4 } from 'src/shared/validations/is-uuid-v4.validation';
import { v4 as uuid } from 'uuid';

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
