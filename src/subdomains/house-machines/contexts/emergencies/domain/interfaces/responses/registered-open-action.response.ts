import { OpenGateDomainEntity } from '../../entities';

export interface IRegisteredOpenACtionResponse {
  state: boolean;
  message: string;
  data: OpenGateDomainEntity;
}
