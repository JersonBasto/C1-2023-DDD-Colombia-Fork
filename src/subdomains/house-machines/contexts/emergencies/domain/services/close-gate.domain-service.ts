import { ICloseGateDomainEntity } from '../entities/interfaces/close-gate.domain-entity.interface';

export interface ICloseGateDomainService<
  Entity extends ICloseGateDomainEntity = ICloseGateDomainEntity,
> {
  registerCloseAction(data: ICloseGateDomainEntity): Promise<Entity>;
  getHistoryCloseAction(): Promise<Entity[]>;
  getCloseGateById(value: string): Promise<Entity>;
}
