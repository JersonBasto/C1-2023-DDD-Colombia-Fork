export interface IRegisterGateCommand {
  emergency: boolean;
  stateGate: boolean;
  emergencyDate?: number | Date;
}
