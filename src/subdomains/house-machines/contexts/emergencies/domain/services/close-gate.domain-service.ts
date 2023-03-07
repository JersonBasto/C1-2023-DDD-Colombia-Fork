import { CloseGateDomainEntity } from '../entities';

export interface ICloseGateDomainService<
  Entity extends CloseGateDomainEntity = CloseGateDomainEntity,
> {
  registerCloseAction(data: CloseGateDomainEntity): Promise<Entity>;
  getHistoryCloseAction(): Promise<Entity[]>;
  getCloseGateById(value: string): Promise<Entity>;
}
