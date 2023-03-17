import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IRegisterOpenActionCommand } from '../../../domain';
import { GateEntity } from '../../persistence/entities/gate-entity/gate-entity.entity';

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
