import { IErrorValueObject, ValueObjectBase } from 'src/shared/sofka';
import { IsDateNow } from 'src/shared/validations/is-date-now.validation';

/**
 * Se crea la validacion para la fecha del closeGate
 *
 * @export La clase CloseGateDateValueObject
 * @class CloseGateDateValueObject
 * @extends {(ValueObjectBase<Date | number>)}
 */
export class CloseGateDateValueObject extends ValueObjectBase<Date | number> {
  constructor(value: Date | number | undefined) {
    super(value);
  }
  validateData(): void {
    this.validateDate();
  }

  private validateDate() {
    if (!IsDateNow(this.value)) {
      this.setError({
        field: 'closeGateDate',
        message: 'El "closeGateDate" no tiene una fecha valida',
      } as IErrorValueObject);
    }
  }
}
