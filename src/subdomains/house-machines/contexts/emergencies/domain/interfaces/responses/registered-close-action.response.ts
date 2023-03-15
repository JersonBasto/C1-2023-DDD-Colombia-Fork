import { CloseGateDomainEntity } from '../../entities';

export interface IRegisteredCloseACtionResponse {
  state: boolean;
  message: string;
  data: CloseGateDomainEntity;
}
