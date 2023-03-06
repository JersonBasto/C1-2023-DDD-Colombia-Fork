import { GateDomainEntity } from '../entities/gate.domain-entity';

export interface IGateDomainService<Entity extends GateDomainEntity> {
  openGates(): void;
  closeGates(): void;
}
