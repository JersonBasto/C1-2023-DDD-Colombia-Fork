import { OpenGateDomainEntity } from '../entities/open-gate.domain-entity';

export interface IOpenGateDomainService<
  Entity extends OpenGateDomainEntity = OpenGateDomainEntity,
> {
  registerOpenAction(data: OpenGateDomainEntity): Promise<Entity>;
  getHistoryOpenAction(): Promise<Entity[]>;
  getOpenGateById(value: string): Promise<Entity>;
}
