import { IErrorValueObject, ValueObjectBase } from 'src/shared/sofka';
import { IsDescriptionLength } from 'src/shared/validations/is-description.validator';
import { IsUUID4 } from 'src/shared/validations/is-uuid-v4.validation';

/**
 * Se valida el ID de Gate, en caso no tener uno se genera otro con uuid v4
 *
 * @export
 * @class GateIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class OpenGateDescriptionValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value);
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (!IsDescriptionLength(this.value)) {
      this.setError({
        field: 'description',
        message:
          'El "description" no tiene un formato válido, debe contener mas de 20 caracteres y menos de 60',
      } as IErrorValueObject);
    }
  }
}
