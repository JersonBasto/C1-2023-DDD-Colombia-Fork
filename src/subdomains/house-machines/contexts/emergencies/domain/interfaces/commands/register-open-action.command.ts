import { GateEntity } from '../../../infrastructure/persistence/entities/gate-entity/gate-entity.entity';

/**
 * Se crea la interfaz IRegisterOpenActionCommand encargada de asegurar que los datos
 * para registrar la accion de abrir la compuerta sean los correctos
 *
 * @export IRegisterOpenActionCommand
 * @interface IRegisterOpenActionCommand
 */
export interface IRegisterOpenActionCommand {
  id?: string;
  date?: number | Date;
  description: string;
  gatesOpen: GateEntity;
}
