import { IGateDomainService } from '../../../services/gate.domain-service';
import { GotGateByIdEventPublisher } from '../../../events/publishers/got-gate-by-id.event-publisher';
import { v4 as uuid } from 'uuid';
import { GateDomainEntity } from '../../../entities';
import { GetGateByIdHelper } from './get-gate-by-id.helper';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
describe('GetGateByIdHelper', () => {
  let gateId: string;
  let gateService: IGateDomainService;
  let gotGateByIdEvent: GotGateByIdEventPublisher;
  let helper: any;
  beforeEach(() => {
    gateId = uuid();
    gateService = {
      getGateById: jest.fn(),
    } as unknown as IGateDomainService;
    gotGateByIdEvent = {
      publish: jest.fn(),
      response: new GateDomainEntity(),
    } as unknown as GotGateByIdEventPublisher;
    helper = GetGateByIdHelper;
  });
  it('Should be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('No service', () => {
      //Arrange
      gateService = undefined as unknown as IGateDomainService;
      //Act
      const result = helper(gateId, gateService, gotGateByIdEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No event', () => {
      //Arrange
      gotGateByIdEvent = undefined as unknown as GotGateByIdEventPublisher;
      //Act
      const result = helper(gateId, gateService, gotGateByIdEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('get Gate by Id', async () => {
      //Arrange
      const gate = new GateDomainEntity();
      gate.gateId = uuid();
      gate.description = 'Se crea la compuerta norte';
      gate.emergency = true;
      gate.stateGate = true;
      gate.emergencyDate = Date.now();
      gateService.getGateById = jest.fn().mockReturnValue(gate);
      //Act
      const result = await helper(gate.gateId, gateService, gotGateByIdEvent);
      //Assert
      expect(result).toEqual(gate);
    });
  });
});
