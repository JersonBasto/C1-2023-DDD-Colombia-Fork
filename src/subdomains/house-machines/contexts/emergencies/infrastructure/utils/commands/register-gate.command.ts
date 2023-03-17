import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { IsBoolean, IsString } from 'class-validator';
import { IRegisterGateCommand } from '../../../domain/interfaces/commands/register-gate.command';

export class RegisterGateCommand implements IRegisterGateCommand {
  @IsBoolean()
  @ApiProperty()
  emergency: boolean;
  @IsBoolean()
  @ApiProperty()
  stateGate: boolean;
  @IsString()
  @ApiProperty({default:"La compuerta Norte ha sido registrada"})
  description: string;
  @ApiPropertyOptional()
  emergencyDate?: number | Date | undefined;
}
