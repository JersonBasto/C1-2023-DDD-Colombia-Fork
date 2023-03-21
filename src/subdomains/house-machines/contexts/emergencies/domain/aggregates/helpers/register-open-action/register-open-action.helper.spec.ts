import { CloseGateDomainEntity } from '../../../entities/close-gate.domain-entity';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
import { v4 as uuid } from 'uuid';
import { OpenGateDomainEntity } from '../../../entities/open-gate.domain-entity';
import { IOpenGateDomainService } from '../../../services/open-gate.domain-service';
import { RegisteredOpenedActionEventPublisher } from '../../../events/publishers/registered-open-action.event-publisher';
import { RegisterOpenActionHelper } from './register-open-action.helper';
describe('RegisterCloseActionHelper', () => {
  let data: OpenGateDomainEntity;
  let openGateService: IOpenGateDomainService;
  let registeredOpenActionEvent: RegisteredOpenedActionEventPublisher;
  let helper: any;
  beforeEach(() => {
    data = new OpenGateDomainEntity();
    openGateService = {
      registerOpenAction: jest.fn(),
    } as unknown as IOpenGateDomainService;
    registeredOpenActionEvent = {
      publish: jest.fn(),
      response: new OpenGateDomainEntity(),
    } as unknown as RegisteredOpenedActionEventPublisher;
    helper = RegisterOpenActionHelper;
  });
  it('Should be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('No service', () => {
      //Arrange
      openGateService = undefined as unknown as IOpenGateDomainService;
      //Act
      const result = helper(data, openGateService, registeredOpenActionEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No service', () => {
      //Arrange
      registeredOpenActionEvent =
        undefined as unknown as RegisteredOpenedActionEventPublisher;
      //Act
      const result = helper(data, openGateService, registeredOpenActionEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('Register Gate', async () => {
      //Arrange
      const closeGate = new CloseGateDomainEntity();
      closeGate.description = 'Se cierra compuerta norte por emergencia';
      closeGate.id = uuid();
      openGateService.registerOpenAction = jest.fn().mockReturnValue(closeGate);
      //Act
      const result = await helper(
        closeGate,
        openGateService,
        registeredOpenActionEvent,
      );
      //Assert
      expect(result).toEqual(closeGate);
    });
  });
});
