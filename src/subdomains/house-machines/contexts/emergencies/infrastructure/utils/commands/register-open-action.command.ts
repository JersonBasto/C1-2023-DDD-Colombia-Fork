import { IsString } from "class-validator";
import { IRegisterOpenActionCommand } from "../../../domain";
import { GateEntity } from "../../persistence/entities/gate-entity/gate-entity.entity";

export class RegisterOpenActionCommand implements IRegisterOpenActionCommand{
    id?: string | undefined;
    date?: number | Date | undefined;
    @IsString()
    gatesOpen: GateEntity;
}