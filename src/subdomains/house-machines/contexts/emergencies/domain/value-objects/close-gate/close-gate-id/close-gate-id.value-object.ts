import { IErrorValueObject, ValueObjectBase } from 'src/shared/sofka';
import { IsUUID4 } from 'src/shared/validations/is-uuid-v4.validation';
import { v4 as uuid } from 'uuid';

/**
 * Se crea la validacion para el id de closeGate, en caso de no existir se asigna uno
 *
 * @export La clase CloseGateIdValueObject
 * @class CloseGateIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class CloseGateIdValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : uuid());
  }
  validateData(): void {
    this.validateStructure();
  }
  private validateStructure(): void {
    if (this.value && IsUUID4(this.value) === false) {
      this.setError({
        field: 'closeGateId',
        message: 'El "closeGateId" no tiene un formato válido',
      } as IErrorValueObject);
    }
  }
}
