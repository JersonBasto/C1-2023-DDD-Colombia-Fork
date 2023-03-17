import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IOpenGateCommand } from '../../../domain/interfaces/commands/open-gate.command';

/**
 *
 * Se crea el comando para asegurar la entrada de los datos para abrir compuerta
 *
 * @export OpenGateCommand
 * @class OpenGateCommand
 * @implements {IOpenGateCommand}
 */
export class OpenGateCommand implements IOpenGateCommand {
  @IsString()
  @ApiProperty()
  id: string;
}
