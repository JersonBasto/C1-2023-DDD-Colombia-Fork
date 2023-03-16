import { IsString } from 'class-validator';
import { IOpenGateCommand } from '../../../domain/interfaces/commands/open-gate.command';

export class OpenGateCommand implements IOpenGateCommand {
  @IsString()
  id: string;
}
