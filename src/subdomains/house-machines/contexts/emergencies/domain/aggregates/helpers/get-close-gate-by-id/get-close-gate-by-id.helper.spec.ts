import { ICloseGateDomainService } from '../../../services/close-gate.domain-service';
import { GotCloseGateByIdEventPublisher } from '../../../events/publishers/got-close-gate-by-id.event-publisher';
import { v4 as uuid } from 'uuid';
import { CloseGateDomainEntity } from '../../../entities';
import { GetCloseGateByIdHelper } from './get-close-gate-by-id.helper';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
describe('GetCloseByIdHelper', () => {
  let gateId: string;
  let closeGateService: ICloseGateDomainService;
  let gotCloseGateByIdEvent: GotCloseGateByIdEventPublisher;
  let helper: any;
  beforeEach(() => {
    gateId = uuid();
    closeGateService = {
      getCloseGateById: jest.fn(),
    } as unknown as ICloseGateDomainService;
    gotCloseGateByIdEvent = {
      publish: jest.fn(),
      response: new CloseGateDomainEntity(),
    } as unknown as GotCloseGateByIdEventPublisher;
    helper = GetCloseGateByIdHelper;
  });
  it('Should be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('No service', () => {
      //Arrange
      closeGateService = undefined as unknown as ICloseGateDomainService;
      //Act
      const result = helper(uuid(), closeGateService, gotCloseGateByIdEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No event', () => {
      //Arrange
      gotCloseGateByIdEvent =
        undefined as unknown as GotCloseGateByIdEventPublisher;
      //Act
      const result = helper(uuid(), closeGateService, gotCloseGateByIdEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('Get Close Gate', async () => {
      //Arrange
      const closeGate = new CloseGateDomainEntity();
      closeGate.id = uuid();
      closeGate.description = 'Se acciona el cierre compuerta norte';
      closeGate.date = Date.now();
      closeGateService.getCloseGateById = jest.fn().mockReturnValue(closeGate);
      //Act
      const result = await helper(
        closeGate.id,
        closeGateService,
        gotCloseGateByIdEvent,
      );
      //Assert
      expect(result).toEqual(closeGate);
    });
  });
});
