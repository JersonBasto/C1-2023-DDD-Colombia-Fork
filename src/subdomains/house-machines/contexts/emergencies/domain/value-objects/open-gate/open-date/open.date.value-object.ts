import { ValueObjectBase } from '../../../../../../../../shared/sofka/bases/object-value.base';
import { IsDateNow } from '../../../../../../../../shared/validations/is-date-now.validation';
import { IErrorValueObject } from '../../../../../../../../../dist/shared/sofka/interface/error-object-value.interface';

/**
 * Se valida que la fecha de OpenGate sea una fecha validad
 *
 * @export
 * @class OpenGateDateValueObject
 * @extends {(ValueObjectBase<Date | number>)}
 */
export class OpenGateDateValueObject extends ValueObjectBase<Date | number> {
  constructor(value: Date | number | undefined) {
    super(value);
  }

  /**
   *
   * Ejecuta las validaciones del dato
   *
   * @memberof OpenGateDateValueObject
   */
  validateData(): void {
    this.validateDate();
  }

  /**
   *
   * Valida que el dato sea una fecha valida
   *
   * @private validateDate
   * @memberof OpenGateDateValueObject
   */
  private validateDate() {
    if (!IsDateNow(this.value)) {
      this.setError({
        field: 'openGateDate',
        message: 'El "openGateDate" no tiene una fecha valida',
      } as IErrorValueObject);
    }
  }
}
