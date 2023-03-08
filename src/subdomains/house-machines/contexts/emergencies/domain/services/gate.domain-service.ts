import { GateDomainEntity } from '../entities/gate.domain-entity';

export interface IGateDomainService<
  Entity extends GateDomainEntity = GateDomainEntity,
> {
  openGates(gateId: string): Promise<Entity>;
  closeGates(gateId: string): Promise<Entity>;
  changeStateGate(gateId: string, value: boolean): Promise<boolean>;
  changeStateEmergency(value: boolean): Promise<boolean>;
  getGateById(value: string): Promise<Entity>;
}
