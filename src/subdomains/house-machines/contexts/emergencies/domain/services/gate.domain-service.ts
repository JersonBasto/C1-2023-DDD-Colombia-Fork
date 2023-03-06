import { GateDomainEntity } from '../entities/gate.domain-entity';

export interface IGateDomainService<Entity extends GateDomainEntity> {
  openGates(): void;
  closeGates(): void;
  changeStateGate(value: boolean): GateDomainEntity;
  changeStateEmergency(value: boolean): GateDomainEntity;
}
