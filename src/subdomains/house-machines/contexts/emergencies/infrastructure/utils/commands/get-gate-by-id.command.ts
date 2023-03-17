import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IGetGateByIdCommand } from '../../../domain/interfaces/commands/get-gate-by-id.command';

/**
 *
 * Se crea el comando para segurar la entrada de datos para obtener
 * una compuerta a traves del id
 *
 * @export GetGateByIdCommand
 * @class GetGateByIdCommand
 * @implements {IGetGateByIdCommand}
 */
export class GetGateByIdCommand implements IGetGateByIdCommand {
  @IsString()
  @ApiProperty()
  id: string;
}
