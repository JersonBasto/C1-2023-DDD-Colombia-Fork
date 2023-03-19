import { v4 as uuid } from 'uuid';
import { ValueObjectBase } from '../../../../../../../../shared/sofka/bases/object-value.base';
import { IsUUID4 } from '../../../../../../../../shared/validations/is-uuid-v4.validation';
import { IErrorValueObject } from '../../../../../../../../../dist/shared/sofka/interface/error-object-value.interface';

/**
 * Se crea la validacion para el id de closeGate, en caso de no existir se asigna uno
 *
 * @export La clase CloseGateIdValueObject
 * @class CloseGateIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class CloseGateIdValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : uuid());
  }

  /**
   *
   * Se encarga de ejecutar los metodo para validar el value
   *
   * @memberof CloseGateIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   *
   * Se encarga de validar que el valor entregado sea un uuid
   *
   * @private validateStructure
   * @memberof CloseGateIdValueObject
   */
  private validateStructure(): void {
    if (this.value && IsUUID4(this.value) === false) {
      this.setError({
        field: 'closeGateId',
        message: 'El "closeGateId" no tiene un formato válido',
      } as IErrorValueObject);
    }
  }
}
