import { ValueObjectBase } from '../../../../../../../../shared/sofka/bases/object-value.base';
import { IsBoolean } from '../../../../../../../../shared/validations/is-boolean.validator';
import { IErrorValueObject } from '../../../../../../../../../dist/shared/sofka/interface/error-object-value.interface';

/**
 * Se valida  que la variable contenga un booleano
 *
 * @export
 * @class StateGateValueObject
 * @extends {ValueObjectBase<boolean>}
 */
export class StateGateValueObject extends ValueObjectBase<boolean> {
  constructor(value?: boolean) {
    super(value);
  }

  /**
   *
   * Ejecuta las validaciones del dato
   *
   * @memberof StateGateValueObject
   */
  validateData(): void {
    if (this.value) {
      this.validateContent();
    }
  }

  /**
   *
   * Valida que el dato entregado sea un Boolean
   *
   * @private validateContent
   * @memberof StateGateValueObject
   */
  private validateContent() {
    if (!IsBoolean(this.value)) {
      this.setError({
        field: 'stateGate',
        message: 'El "stateGate" no tiene un contenido válido',
      } as IErrorValueObject);
    }
  }
}
