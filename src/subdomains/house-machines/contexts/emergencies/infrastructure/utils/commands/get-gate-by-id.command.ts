import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IGetGateByIdCommand } from "../../../domain/interfaces/commands/get-gate-by-id.command";

export class GetGateByIdCommand implements IGetGateByIdCommand{
    @IsString()
    @ApiProperty()
    id: string;
}