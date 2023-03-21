import { IGateDomainService } from '../../../services/gate.domain-service';
import { ClosedGateEventPublisher } from '../../../events/publishers/closed-gate.event-publisher';
import { v4 as uuid } from 'uuid';
import { GateDomainEntity } from '../../../entities';
import { CloseGateHelper } from './close-gate.helper';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
describe('CloseGate', () => {
  let gateId: string;
  let gateService: IGateDomainService;
  let closedGateEvent: ClosedGateEventPublisher;
  let helper: any;
  beforeEach(() => {
    gateId = uuid();
    gateService = {
      closeGates: jest.fn(),
    } as unknown as IGateDomainService;
    closedGateEvent = {
      publish: jest.fn(),
      response: new GateDomainEntity(),
    } as unknown as ClosedGateEventPublisher;
    helper = CloseGateHelper;
  });
  it('sholud be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('no service', () => {
      //Arrange
      closedGateEvent = undefined as unknown as ClosedGateEventPublisher;
      //Act
      const result = helper(gateId, gateService, closedGateEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No event', () => {
      //Arrange
      gateService = undefined as unknown as IGateDomainService;
      //Act
      const result = helper(gateId, gateService, closedGateEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('close Gate', async () => {
      //Arrange
      const gate = new GateDomainEntity();
      gate.gateId = uuid();
      gate.description = 'Se crea compuerta salida norte';
      gate.emergency = false;
      gate.stateGate = false;
      gate.emergencyDate = Date.now();
      gateService.closeGates = jest.fn().mockReturnValue(gate);
      //Act
      const result = await helper(gate.gateId, gateService, closedGateEvent);
      //Assert
      expect(result).toEqual(gate);
    });
  });
});
