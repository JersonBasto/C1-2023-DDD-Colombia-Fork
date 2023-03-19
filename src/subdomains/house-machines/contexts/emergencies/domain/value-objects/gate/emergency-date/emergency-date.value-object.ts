import { ValueObjectBase } from '../../../../../../../../shared/sofka/bases/object-value.base';
import { IsDateNow } from '../../../../../../../../shared/validations/is-date-now.validation';
import { IErrorValueObject } from '../../../../../../../../../dist/shared/sofka/interface/error-object-value.interface';

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
