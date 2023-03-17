import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IGetRegisterOpenGateActionCommand } from '../../../domain';

export class GetRegisterOpenGateActionCommand
  implements IGetRegisterOpenGateActionCommand
{
  @IsString()
  @ApiProperty()
  id: string;
}
