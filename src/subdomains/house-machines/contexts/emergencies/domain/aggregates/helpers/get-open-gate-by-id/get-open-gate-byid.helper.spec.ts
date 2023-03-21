import { v4 as uuid } from 'uuid';
import { CloseGateDomainEntity } from '../../../entities';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
import { IOpenGateDomainService } from '../../../services/open-gate.domain-service';
import { GotOpenGateByIdEventPublisher } from '../../../events/publishers/got-open-gate-by-id.event-publisher';
import { GetOpenGateByIdHelper } from './get-open-gate-byid.helper';
describe('GetCloseByIdHelper', () => {
  let gateId: string;
  let openGateService: IOpenGateDomainService;
  let gotOpenGateByIdEvent: GotOpenGateByIdEventPublisher;
  let helper: any;
  beforeEach(() => {
    gateId = uuid();
    openGateService = {
      getOpenGateById: jest.fn(),
    } as unknown as IOpenGateDomainService;
    gotOpenGateByIdEvent = {
      publish: jest.fn(),
      response: new CloseGateDomainEntity(),
    } as unknown as GotOpenGateByIdEventPublisher;
    helper = GetOpenGateByIdHelper;
  });
  it('Should be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('No service', () => {
      //Arrange
      openGateService = undefined as unknown as IOpenGateDomainService;
      //Act
      const result = helper(uuid(), openGateService, gotOpenGateByIdEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No event', () => {
      //Arrange
      gotOpenGateByIdEvent =
        undefined as unknown as GotOpenGateByIdEventPublisher;
      //Act
      const result = helper(uuid(), openGateService, gotOpenGateByIdEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('Get Close Gate', async () => {
      //Arrange
      const closeGate = new CloseGateDomainEntity();
      closeGate.id = uuid();
      closeGate.description = 'Se acciona el cierre compuerta norte';
      closeGate.date = Date.now();
      openGateService.getOpenGateById = jest.fn().mockReturnValue(closeGate);
      //Act
      const result = await helper(
        closeGate.id,
        openGateService,
        gotOpenGateByIdEvent,
      );
      //Assert
      expect(result).toEqual(closeGate);
    });
  });
});
