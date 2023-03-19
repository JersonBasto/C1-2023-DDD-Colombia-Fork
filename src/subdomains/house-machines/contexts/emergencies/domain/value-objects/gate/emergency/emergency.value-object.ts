import { ValueObjectBase } from '../../../../../../../../shared/sofka/bases/object-value.base';
import { IsBoolean } from '../../../../../../../../shared/validations/is-boolean.validator';
import { IErrorValueObject } from '../../../../../../../../../dist/shared/sofka/interface/error-object-value.interface';

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

  /**
   *
   * Ejecuta las validaciones al dato
   *
   * @memberof EmergencyValueObject
   */
  validateData(): void {
    if (this.value) {
      this.validateContent();
    }
  }

  /**
   *
   * Valida que el dato entregado sea Booleano
   *
   * @private validateContent
   * @memberof EmergencyValueObject
   */
  private validateContent() {
    if (!IsBoolean(this.value)) {
      this.setError({
        field: 'emergency',
        message: 'El "emergency" no tiene un contenido válido',
      } as IErrorValueObject);
    }
  }
}
