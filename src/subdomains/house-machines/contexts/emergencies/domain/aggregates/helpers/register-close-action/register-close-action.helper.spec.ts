import { ICloseGateDomainService } from '../../../services/close-gate.domain-service';
import { CloseGateDomainEntity } from '../../../entities/close-gate.domain-entity';
import { RegisteredCloseActionEventPublisher } from '../../../events/publishers/registered-close-action.event-publisher';
import { RegisterCloseActionHelper } from './register-close-action.helper';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
import { v4 as uuid } from 'uuid';
import { RegisterCloseActionCommand } from '../../../../infrastructure/utils/commands/register-close-gate.command';
describe('RegisterCloseActionHelper', () => {
  let data: CloseGateDomainEntity;
  let closeGateService: ICloseGateDomainService;
  let registeredCloseActionEvent: RegisteredCloseActionEventPublisher;
  let helper: any;
  beforeEach(() => {
    data = new CloseGateDomainEntity();
    closeGateService = {
      registerCloseAction: jest.fn(),
    } as unknown as ICloseGateDomainService;
    registeredCloseActionEvent = {
      publish: jest.fn(),
      response: new CloseGateDomainEntity(),
    } as unknown as RegisteredCloseActionEventPublisher;
    helper = RegisterCloseActionHelper;
  });
  it('Should be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('No service', () => {
      //Arrange
      closeGateService = undefined as unknown as ICloseGateDomainService;
      //Act
      const result = helper(data, closeGateService, registeredCloseActionEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No service', () => {
      //Arrange
      registeredCloseActionEvent =
        undefined as unknown as RegisteredCloseActionEventPublisher;
      //Act
      const result = helper(data, closeGateService, registeredCloseActionEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('Register Gate', async () => {
      //Arrange
      const closeGate = new CloseGateDomainEntity();
      closeGate.description = 'Se cierra compuerta norte por emergencia';
      closeGate.id = uuid();
      closeGateService.registerCloseAction = jest
        .fn()
        .mockReturnValue(closeGate);
      //Act
      const result = await helper(
        closeGate,
        closeGateService,
        registeredCloseActionEvent,
      );
      //Assert
      expect(result).toEqual(closeGate);
    });
  });
});
