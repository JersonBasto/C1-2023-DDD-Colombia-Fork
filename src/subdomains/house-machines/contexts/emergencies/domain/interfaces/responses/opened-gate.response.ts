import { GateDomainEntity } from "../../entities/gate.domain-entity";

export interface IOpenGateResponse {
  status: boolean;
  message: string;
  data: GateDomainEntity;
}
