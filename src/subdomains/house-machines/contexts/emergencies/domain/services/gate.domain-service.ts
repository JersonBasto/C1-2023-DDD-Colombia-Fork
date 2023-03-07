import { GateDomainEntity } from '../entities/gate.domain-entity';

export interface IGateDomainService<
  Entity extends GateDomainEntity = GateDomainEntity,
> {
  openGates(gateId: string): Promise<Entity>;
  closeGates(gateId: string): Promise<Entity>;
  changeStateGate(value: boolean): Promise<Entity>;
  changeStateEmergency(value: boolean): Promise<Entity>;
  getGateById(value: string): Promise<Entity>;
}
