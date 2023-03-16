import { IsBoolean } from 'class-validator';
import { IRegisterGateCommand } from '../../../domain/interfaces/commands/register-gate.command';

export class RegisterGateCommand implements IRegisterGateCommand {
  @IsBoolean()
  emergency: boolean;
  @IsBoolean()
  stateGate: boolean;
  emergencyDate?: number | Date | undefined;
}
