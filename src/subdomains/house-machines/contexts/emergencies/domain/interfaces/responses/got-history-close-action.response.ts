import { CloseGateDomainEntity } from '../../entities';

export interface IGotHistoryCloseActionResponse {
  state: boolean;
  message: string;
  data: CloseGateDomainEntity[];
}
