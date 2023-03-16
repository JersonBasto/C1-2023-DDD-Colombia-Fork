import { IErrorValueObject, ValueObjectBase } from 'src/shared/sofka';
import { IsBoolean } from 'src/shared/validations/is-boolean.validator';

/**
 * Valida que la variable de Emergencia sea un booleano
 *
 * @export
 * @class EmergencyValueObject
 * @extends {ValueObjectBase<boolean>}
 */
export class EmergencyValueObject extends ValueObjectBase<boolean> {
  constructor(value?: boolean) {
    super(value);
  }

  validateData(): void {
    this.validateContent();
  }

  private validateContent() {
    if (!IsBoolean(this.value)) {
      this.setError({
        field: 'emergency',
        message: 'El "emergency" no tiene un contenido válido',
      } as IErrorValueObject);
    }
  }
}
