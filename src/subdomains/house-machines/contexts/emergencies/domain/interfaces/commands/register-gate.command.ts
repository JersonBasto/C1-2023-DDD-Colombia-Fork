export interface IRegisterGateCommand {
  emergency: boolean;
  stateGate: boolean;
  description: string;
  emergencyDate?: number | Date;
}
