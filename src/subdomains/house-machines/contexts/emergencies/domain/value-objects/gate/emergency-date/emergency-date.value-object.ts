import { IErrorValueObject, ValueObjectBase } from 'src/shared/sofka';
import { IsDateNow } from 'src/shared/validations/is-date-now.validation';

export class EmergencyDateValueObject extends ValueObjectBase<Date | number> {
  constructor(value: Date | number) {
    super(value);
  }
  
  validateData(): void {
    this.validateDateNow();
  }

  private validateDateNow() {
    if (!IsDateNow(this.value)) {
      this.setError({
        field: 'emergencyDate',
        message: 'El "emergencyDate" no tiene una fecha válida',
      } as IErrorValueObject);
    }
  }
}
