import { GateDomainEntity } from "../../entities/gate.domain-entity";

export interface ICloseGateResponse {
  status: boolean;
  message: string;
  data: GateDomainEntity;
}