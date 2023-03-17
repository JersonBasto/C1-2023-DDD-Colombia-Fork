import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IRegisterOpenActionCommand } from '../../../domain';
import { GateEntity } from '../../persistence/entities/gate-entity/gate-entity.entity';

/**
 *
 * Se crea el comando para asegurar la entrada de datos para registrar la accion de
 * abrir compuerta
 *
 * @export RegisterOpenActionCommand
 * @class RegisterOpenActionCommand
 * @implements {IRegisterOpenActionCommand}
 */
export class RegisterOpenActionCommand implements IRegisterOpenActionCommand {
  id?: string | undefined;
  @ApiPropertyOptional()
  date?: number | Date | undefined;
  @IsString()
  @ApiProperty()
  gatesOpen: GateEntity;
  @IsString()
  @ApiProperty()
  description: string;
}
