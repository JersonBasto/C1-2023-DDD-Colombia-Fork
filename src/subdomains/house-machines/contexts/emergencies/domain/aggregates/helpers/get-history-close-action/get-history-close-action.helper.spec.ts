import { v4 as uuid } from 'uuid';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
import { GetHistoryCloseActionHelper } from './get-history-close-action.helper';
import { ICloseGateDomainService } from '../../../services/close-gate.domain-service';
import { GotHistoryCloseActionEventPublisher } from '../../../events/publishers/got-history-close-action.event-publisher';
import { CloseGateDomainEntity } from '../../../entities/close-gate.domain-entity';
describe('GetHistoryCloseAction', () => {
  let gateId: string;
  let closeGateService: ICloseGateDomainService;
  let gotHistoryCloseGateByIdEvent: GotHistoryCloseActionEventPublisher;
  let helper: any;
  beforeEach(() => {
    gateId = uuid();
    closeGateService = {
      getHistoryCloseAction: jest.fn(),
    } as unknown as ICloseGateDomainService;
    gotHistoryCloseGateByIdEvent = {
      publish: jest.fn(),
      response: new CloseGateDomainEntity(),
    } as unknown as GotHistoryCloseActionEventPublisher;
    helper = GetHistoryCloseActionHelper;
  });
  it('Should be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('No services', () => {
      //Arrange
      closeGateService = undefined as unknown as ICloseGateDomainService;
      //Act
      const result = helper(
        closeGateService,
        gotHistoryCloseGateByIdEvent,
      );
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No Event', () => {
      //Arrange
      gotHistoryCloseGateByIdEvent =
        undefined as unknown as GotHistoryCloseActionEventPublisher;
      //Act
      const result = helper(closeGateService, gotHistoryCloseGateByIdEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('Get History', async () => {
      //Arrange
      const closeGate = new CloseGateDomainEntity();
      closeGate.id = uuid();
      closeGate.description = 'Se cierra compuerta norte';
      closeGate.date = Date.now();
      closeGateService.getHistoryCloseAction = jest
        .fn()
        .mockReturnValue([closeGate]);
      //Act
      const result = await helper(
        closeGateService,
        gotHistoryCloseGateByIdEvent,
      );
      //Assert
      expect(result).toEqual([closeGate]);
    });
  });
});
