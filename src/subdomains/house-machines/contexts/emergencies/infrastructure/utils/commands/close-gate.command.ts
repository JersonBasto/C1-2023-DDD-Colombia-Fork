import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ICloseGateCommand } from "../../../domain/interfaces/commands/close-gate.command";

export class CloseGateCommand implements ICloseGateCommand{
    @IsString()
    @ApiProperty()
    id: string;
}