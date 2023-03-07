import { IOpenGateDomainEntity } from '../entities/interfaces/open-gate.domain-entity.interface';

export interface IOpenGateDomainService<
  Entity extends IOpenGateDomainEntity = IOpenGateDomainEntity,
> {
  registerOpenAction(data: IOpenGateDomainEntity): Promise<Entity>;
  getHistoryOpenAction(): Promise<Entity[]>;
  getOpenGateById(value: string): Promise<Entity>;
}
