import { CloseGateDomainEntity } from './close-gate.domain-entity';
import { v4 as uuid } from 'uuid';
describe('CloseGateDomainEntity', () => {
  let entity: CloseGateDomainEntity;
  describe('Validations', () => {
    it('Create Instance', () => {
      const closeGate = new CloseGateDomainEntity();
      expect(closeGate).toBeDefined();
    });
    it('Create entity', () => {
      const closeGate = new CloseGateDomainEntity();
      closeGate.date = Date.now();
      closeGate.id = uuid();
      closeGate.description = ' Se cierra la compuerta Norte';
      expect(closeGate).toBeDefined();
    });
    it("empty values",()=>{
      const closeGate = new CloseGateDomainEntity();
      expect(closeGate.date).toBeUndefined()
      expect(closeGate.description).toBeUndefined()
    })
  });
});
