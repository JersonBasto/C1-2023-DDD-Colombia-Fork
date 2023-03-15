import { GateDomainEntity, OpenGateDomainEntity } from '../../entities';

export interface IRegisteredGateResponse {
  state: boolean;
  message: string;
  data: GateDomainEntity;
}
