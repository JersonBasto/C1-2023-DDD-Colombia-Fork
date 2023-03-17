import { IsBoolean, IsString } from 'class-validator';
import { IRegisterGateCommand } from '../../../domain/interfaces/commands/register-gate.command';

export class RegisterGateCommand implements IRegisterGateCommand {
  @IsBoolean()
  emergency: boolean;
  @IsBoolean()
  stateGate: boolean;
  @IsString()
  description: string;
  emergencyDate?: number | Date | undefined;
}
