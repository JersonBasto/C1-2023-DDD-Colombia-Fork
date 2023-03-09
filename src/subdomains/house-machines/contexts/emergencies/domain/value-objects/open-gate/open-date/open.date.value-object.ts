import { IErrorValueObject, ValueObjectBase } from 'src/shared/sofka';
import { IsDateNow } from 'src/shared/validations/is-date-now.validation';

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
  validateData(): void {
    this.validateDate();
  }

  private validateDate() {
    if (!IsDateNow(this.value)) {
      this.setError({
        field: 'openGateDate',
        message: 'El "openGateDate" no tiene una fecha valida',
      } as IErrorValueObject);
    }
  }
}
