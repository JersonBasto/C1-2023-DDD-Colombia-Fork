import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IRegisterCloseActionCommand } from '../../../domain/interfaces/commands/register-close-action.command';
import { GateEntity } from '../../persistence/entities/gate-entity/gate-entity.entity';

/**
 *
 * Se crea el comando para asegurar la entrada de datos para registrar la accion de
 * cerrar compuerta
 *
 * @export RegisterOpenActionCommand
 * @class RegisterOpenActionCommand
 * @implements {IRegisterOpenActionCommand}
 */
export class RegisterCloseActionCommand implements IRegisterCloseActionCommand {
  id?: string | undefined;
  @ApiPropertyOptional()
  date?: number | Date | undefined;
  @IsString()
  @ApiProperty()
  gatesClose: GateEntity;
  @IsString()
  @ApiProperty()
  description: string;
}
