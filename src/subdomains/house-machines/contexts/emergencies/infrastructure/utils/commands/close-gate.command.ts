import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ICloseGateCommand } from '../../../domain/interfaces/commands/close-gate.command';

/**
 *
 * Se crea el comando para asegurar la entrada de datos para cerrar la compuerta
 *
 * @export CloseGateCommand
 * @class CloseGateCommand
 * @implements {ICloseGateCommand}
 */
export class CloseGateCommand implements ICloseGateCommand {
  @IsString()
  @ApiProperty()
  id: string;
}
