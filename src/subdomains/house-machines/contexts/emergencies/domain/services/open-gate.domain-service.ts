import { IOpenGateDomainEntity } from '../entities/interfaces/open-gate.domain-entity.interface';

export interface IOpenGateDomainService<Entity extends IOpenGateDomainEntity> {
  registerOpenAction(data: IOpenGateDomainEntity): Promise<Entity>;
  getHistoryOpenAction(): Promise<Entity[]>;
}
