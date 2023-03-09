import { IErrorValueObject, ValueObjectBase } from 'src/shared/sofka';
import { IsBoolean } from 'src/shared/validations/is-boolean.validator';

/**
 * Se valida  que la variable contenga un booleano
 *
 * @export
 * @class StateGateValueObject
 * @extends {ValueObjectBase<boolean>}
 */
export class StateGateValueObject extends ValueObjectBase<boolean> {
  constructor(value: boolean) {
    super(value);
  }

  validateData(): void {
    this.validateContent();
  }

  private validateContent() {
    if (!IsBoolean(this.value)) {
      this.setError({
        field: 'stateGate',
        message: 'El "stateGate" no tiene un contenido válido',
      } as IErrorValueObject);
    }
  }
}
