import { IsDateNow } from '../../../../../../../../shared/validations/is-date-now.validation';
import {
  IErrorValueObject,
  ValueObjectBase,
} from '../../../../../../../../shared/sofka';
/**
 * Se valida la fecha de Emergencia y que cumpla las condiciones
 *
 * @export
 * @class EmergencyDateValueObject
 * @extends {(ValueObjectBase<Date | number>)}
 */
export class EmergencyDateValueObject extends ValueObjectBase<Date | number> {
  constructor(value?: Date | number) {
    super(value);
  }

  /**
   *
   * Ejecuta las validaciones del dato
   *
   * @memberof EmergencyDateValueObject
   */
  validateData(): void {
    this.validateDateNow();
  }

  /**
   *
   * Valida que el dato entregado sea un Date valido
   *
   * @private
   * @memberof EmergencyDateValueObject
   */
  private validateDateNow() {
    if (!IsDateNow(this.value)) {
      this.setError({
        field: 'emergencyDate',
        message: 'El "emergencyDate" no tiene una fecha válida',
      } as IErrorValueObject);
    }
  }
}
