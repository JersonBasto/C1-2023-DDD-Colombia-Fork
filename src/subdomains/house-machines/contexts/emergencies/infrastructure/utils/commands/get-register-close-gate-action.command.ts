import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IGetRegisterCloseGateActionCommand } from '../../../domain/interfaces/commands/get-close-gate-by-id.command';

/**
 *
 * Se crea el comando encargado de asegurar la entrada de datos para
 * obtener un item de CloseGateAction
 *
 * @export GetRegisterCloseGateActionCommand
 * @class GetRegisterCloseGateActionCommand
 * @implements {IGetRegisterCloseGateActionCommand}
 */
export class GetRegisterCloseGateActionCommand
  implements IGetRegisterCloseGateActionCommand
{
  @IsString()
  @ApiProperty()
  id: string;
}
