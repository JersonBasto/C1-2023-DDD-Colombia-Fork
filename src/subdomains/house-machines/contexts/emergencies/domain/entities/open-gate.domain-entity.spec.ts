import { v4 as uuid } from 'uuid';
import { OpenGateDomainEntity } from './open-gate.domain-entity';
describe('OpenGateDomainEntity', () => {
  let entity: OpenGateDomainEntity;
  describe('Validations', () => {
    it('Create Instance', () => {
      const openGate = new OpenGateDomainEntity();
      expect(openGate).toBeDefined();
    });
    it('Create entity', () => {
      const openGate = new OpenGateDomainEntity();
      openGate.date = Date.now();
      openGate.id = uuid();
      openGate.description = ' Se cierra la compuerta Norte';
      expect(openGate).toBeDefined();
    });
    it("empty values",()=>{
      const openGate = new OpenGateDomainEntity();
      expect(openGate.date).toBeUndefined()
      expect(openGate.description).toBeUndefined()
    })
  });
});
