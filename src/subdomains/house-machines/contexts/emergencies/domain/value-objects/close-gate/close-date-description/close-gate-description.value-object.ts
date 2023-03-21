import {
  IErrorValueObject,
  ValueObjectBase,
} from '../../../../../../../../shared/sofka';
import { IsDescriptionLength } from '../../../../../../../../shared/validations/is-description.validator';

/**
 * Se valida el ID de Gate, en caso no tener uno se genera otro con uuid v4
 *
 * @export
 * @class GateIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class CloseGateDescriptionValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value);
  }

  /**
   *
   * Ejecuta las validaciones del dato
   *
   * @memberof CloseGateDescriptionValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   *
   * Se encarga de validar que el dato cumpla con las condiciones
   *
   * @private validateStructure
   * @memberof OpenGateDescriptionValueObject
   */
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
