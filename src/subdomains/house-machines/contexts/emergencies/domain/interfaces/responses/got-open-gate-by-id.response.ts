import { OpenGateDomainEntity } from '../../entities';

export interface IGotRegisterOpenGateActionReponse {
  state: boolean;
  message: string;
  data: OpenGateDomainEntity;
}
