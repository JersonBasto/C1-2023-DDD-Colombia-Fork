/**
 *
 * Se crea la interfaz IRegisterGateCommand encargada de asegurar que los datos
 * para registrar la compuerta sean los correctos
 *
 * @export IRegisterGateCommand
 * @interface IRegisterGateCommand
 */
export interface IRegisterGateCommand {
  emergency: boolean;
  stateGate: boolean;
  description: string;
  emergencyDate?: number | Date;
}
