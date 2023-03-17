import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IGetRegisterOpenGateActionCommand } from '../../../domain';

/**
 *
 * Se crea el comando encargado de asegurar la entrada de datos para
 * obtener un item de OpenGateAction
 *
 * @export GetRegisterOpenGateActionCommand
 * @class GetRegisterOpenGateActionCommand
 * @implements {IGetRegisterOpenGateActionCommand}
 */
export class GetRegisterOpenGateActionCommand
  implements IGetRegisterOpenGateActionCommand
{
  @IsString()
  @ApiProperty()
  id: string;
}
