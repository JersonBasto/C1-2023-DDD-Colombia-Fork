import { IsString } from 'class-validator';
import { IGetRegisterOpenGateActionCommand } from '../../../domain';

export class GetRegisterOpenGateActionCommand
  implements IGetRegisterOpenGateActionCommand
{
  @IsString()
  id: string;
}
