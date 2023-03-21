import { v4 as uuid } from 'uuid';
import { GateDomainEntity } from './gate.domain-entity';
describe('GateDomainEntity', () => {
  let entity: GateDomainEntity;
  describe('Validations', () => {
    it('Create Instance', () => {
      const gate = new GateDomainEntity();
      expect(gate).toBeDefined();
    });
    it('Create entity', () => {
      const gate = new GateDomainEntity();
      gate.emergencyDate = Date.now();
      gate.gateId = uuid();
      gate.description = ' Se crea la compuerta Norte';
      gate.emergency = true;
      gate.stateGate = true;
      expect(gate).toBeDefined();
    });
    it('empty values', () => {
      const gate = new GateDomainEntity();
      expect(gate.emergencyDate).toBeUndefined();
      expect(gate.description).toBeUndefined();
      expect(gate.emergency).toBeUndefined();
      expect(gate.stateGate).toBeUndefined();
    });
  });
});
