import { CloseGateDomainEntity } from '../../../entities/close-gate.domain-entity';
import { RegisteredCloseActionEventPublisher } from '../../../events/publishers/registered-close-action.event-publisher';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
import { v4 as uuid } from 'uuid';
import { IGateDomainService } from '../../../services/gate.domain-service';
import { RegisterGateHelper } from './register-gate.helper';
import { GateDomainEntity } from '../../../entities/gate.domain-entity';
import { RegisteredGateEventPublisher } from '../../../events/publishers/registered-gate.event-publisher';
describe('RegisterCloseActionHelper', () => {
  let data: GateDomainEntity;
  let gateService: IGateDomainService;
  let registeredGateActionEvent: RegisteredGateEventPublisher;
  let helper: any;
  beforeEach(() => {
    data = new CloseGateDomainEntity();
    gateService = {
      registerGate: jest.fn(),
    } as unknown as IGateDomainService;
    registeredGateActionEvent = {
      publish: jest.fn(),
      response: new CloseGateDomainEntity(),
    } as unknown as RegisteredGateEventPublisher;
    helper = RegisterGateHelper;
  });
  it('Should be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('No service', () => {
      //Arrange
      gateService = undefined as unknown as IGateDomainService;
      //Act
      const result = helper(data, gateService, registeredGateActionEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No service', () => {
      //Arrange
      registeredGateActionEvent =
        undefined as unknown as RegisteredCloseActionEventPublisher;
      //Act
      const result = helper(data, gateService, registeredGateActionEvent);
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('Register Gate', async () => {
      //Arrange
      const gate = new GateDomainEntity();
      gate.description = 'Se crea compuerta norte';
      gate.gateId = uuid();
      gate.emergency = false;
      gate.stateGate = false;
      gate.emergencyDate = Date.now();
      gateService.registerGate = jest.fn().mockReturnValue(gate);
      //Act
      const result = await helper(
        gate,
        gateService,
        registeredGateActionEvent,
      );
      //Assert
      expect(result).toEqual(gate);
    });
  });
});
