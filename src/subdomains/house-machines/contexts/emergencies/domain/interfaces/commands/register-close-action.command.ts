import { GateEntity } from '../../../infrastructure/persistence/entities/gate-entity/gate-entity.entity';

/**
 *
 * Se crea la interfaz IRegisterCloseActionCommand encargada de asegurar que los datos
 * para registrar la accion de cerrar compuerta sean los correctos
 *
 * @export IRegisterCloseActionCommand
 * @interface IRegisterCloseActionCommand
 */
export interface IRegisterCloseActionCommand {
  id?: string;
  date?: number | Date;
  description: string;
  gatesClose: GateEntity;
}
