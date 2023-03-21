import { IsDescriptionLength } from '../../../../../../../../shared/validations/is-description.validator';
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
export class OpenGateDescriptionValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value);
  }

  /**
   *
   * Ejecuta las validaciones al dato
   *
   * @memberof OpenGateDescriptionValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   *
   * Valida que el dato cumpla con la longitud necesaria
   *
   * @private
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
