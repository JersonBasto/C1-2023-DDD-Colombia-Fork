import { IsString } from "class-validator";
import { ICloseGateCommand } from "../../../domain/interfaces/commands/close-gate.command";

export class CloseGateCommand implements ICloseGateCommand{
    @IsString()
    id: string;
    @IsString()
    description: string;
}