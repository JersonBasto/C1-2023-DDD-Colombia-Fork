import { v4 as uuid } from 'uuid';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
import { CloseGateDomainEntity } from '../../../entities/close-gate.domain-entity';
import { IOpenGateDomainService } from '../../../services/open-gate.domain-service';
import { GotHistoryOpenActionEventPublisher } from '../../../events/publishers/got-history-open-action.event-publisher';
import { GetHistoryOpenActionHelper } from './get-history-open-action.helper';
import { OpenGateDomainEntity } from '../../../entities/open-gate.domain-entity';
describe('GetHistoryOpenAction', () => {
  let gateId: string;
  let openGateService: IOpenGateDomainService;
  let gotHistoryOpenGateByIdEvent: GotHistoryOpenActionEventPublisher;
  let helper: any;
  beforeEach(() => {
    gateId = uuid();
    openGateService = {
      getHistoryOpenAction: jest.fn(),
    } as unknown as IOpenGateDomainService;
    gotHistoryOpenGateByIdEvent = {
      publish: jest.fn(),
      response: new CloseGateDomainEntity(),
    } as unknown as GotHistoryOpenActionEventPublisher;
    helper = GetHistoryOpenActionHelper;
  });
  it('Should be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('No services', () => {
      //Arrange
      openGateService = undefined as unknown as IOpenGateDomainService;
      //Act
      const result = helper(
        openGateService,
        gotHistoryOpenGateByIdEvent,
      );
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No Event', () => {
      //Arrange
      gotHistoryOpenGateByIdEvent =
        undefined as unknown as GotHistoryOpenActionEventPublisher;
      //Act
      const result = helper(openGateService, gotHistoryOpenGateByIdEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('Get History', async () => {
      //Arrange
      const openGate = new OpenGateDomainEntity();
      openGate.id = uuid();
      openGate.description = 'Se cierra compuerta norte';
      openGate.date = Date.now();
      openGateService.getHistoryOpenAction = jest
        .fn()
        .mockReturnValue([openGate]);
      //Act
      const result = await helper(openGateService, gotHistoryOpenGateByIdEvent);
      //Assert
      expect(result).toEqual([openGate]);
    });
  });
});
