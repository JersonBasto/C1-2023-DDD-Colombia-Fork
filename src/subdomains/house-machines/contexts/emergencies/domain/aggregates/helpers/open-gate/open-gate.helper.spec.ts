import { IGateDomainService } from '../../../services/gate.domain-service';
import { ClosedGateEventPublisher } from '../../../events/publishers/closed-gate.event-publisher';
import { v4 as uuid } from 'uuid';
import { GateDomainEntity } from '../../../entities';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
import { OpenedGateEventPublisher } from '../../../events/publishers/opened-gate.event-publisher';
import { OpenGateHelper } from './open-gate.helper';
describe('CloseGate', () => {
  let gateId: string;
  let gateService: IGateDomainService;
  let openedGateEvent: OpenedGateEventPublisher;
  let helper: any;
  beforeEach(() => {
    gateId = uuid();
    gateService = {
      openGates: jest.fn(),
    } as unknown as IGateDomainService;
    openedGateEvent = {
      publish: jest.fn(),
      response: new GateDomainEntity(),
    } as unknown as OpenedGateEventPublisher;
    helper = OpenGateHelper;
  });
  it('sholud be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('no service', () => {
      //Arrange
      openedGateEvent = undefined as unknown as OpenedGateEventPublisher;
      //Act
      const result = helper(gateId, gateService, openedGateEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No event', () => {
      //Arrange
      gateService = undefined as unknown as IGateDomainService;
      //Act
      const result = helper(gateId, gateService, openedGateEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('open Gate', async () => {
      //Arrange
      const gate = new GateDomainEntity();
      gate.gateId = uuid();
      gate.description = 'Se crea compuerta salida norte';
      gate.emergency = true;
      gate.stateGate = true;
      gate.emergencyDate = Date.now();
      gateService.openGates = jest.fn().mockReturnValue(gate);
      //Act
      const result = await helper(gate.gateId, gateService, openedGateEvent);
      //Assert
      expect(result).toEqual(gate);
    });
  });
});
