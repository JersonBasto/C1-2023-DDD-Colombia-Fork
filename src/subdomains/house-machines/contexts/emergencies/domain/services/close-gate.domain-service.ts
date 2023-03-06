import { ICloseGateDomainEntity } from '../entities/interfaces/close-gate.domain-entity.interface';

export interface ICloseGateDomainService<
  Entity extends ICloseGateDomainEntity,
> {
  registerCloseAction(data: ICloseGateDomainEntity): ICloseGateDomainEntity;
  getHistoryCloseAction(): ICloseGateDomainEntity[];
}
