import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { RegisterGateUseCase } from './register-gate.use-case';
import { IGateDomainService } from '../../../domain/services/gate.domain-service';
import { RegisteredGateEventPublisher } from '../../../domain/events/publishers/registered-gate.event-publisher';
import { GateDomainEntity } from '../../../domain/entities/gate.domain-entity';
import { RegisterGateCommand } from '../../../infrastructure/utils/commands/register-gate.command';
import { IRegisteredGateResponse } from '../../../domain/interfaces/responses/registeres-gate.response';
import { ValueObjectException } from '../../../../../../../shared/sofka/exceptions/object-value.exception';
describe('RegisterGateUseCase', () => {
  let gateService: IGateDomainService;
  let registerGateEvent: RegisteredGateEventPublisher;
  let aggregateRoot: GateAggregateRoot;
  let registerGateUseCase: RegisterGateUseCase;
  let dataRegister: GateDomainEntity;
  let dataResolve: GateDomainEntity;
  dataRegister = new GateDomainEntity();
  dataRegister.description = 'Puerta Ubicada al Sur';
  dataRegister.emergency = true;
  dataRegister.stateGate = true;
  dataResolve = new GateDomainEntity();
  dataResolve.description = 'Puerta Ubicada al Sur';
  dataResolve.emergency = true;
  dataResolve.stateGate = true;
  dataResolve.emergencyDate = Date.now();
  beforeEach(() => {
    gateService = {
      registerGate: jest.fn().mockReturnValue(dataRegister),
    } as unknown as IGateDomainService;
    registerGateEvent = {
      publish: jest.fn(),
    } as unknown as RegisteredGateEventPublisher;
    aggregateRoot = {
      registerGate: jest.fn().mockResolvedValue(dataResolve),
    } as unknown as GateAggregateRoot;
    registerGateUseCase = new RegisterGateUseCase(
      gateService,
      registerGateEvent,
    );
  });
  it('Should be Defined', () => {
    expect(registerGateUseCase).toBeDefined();
  });
  describe('Validations', () => {
    it('Register Gate', async () => {
      //Arrange
      const registerGateCommand: RegisterGateCommand = {
        description: 'Puerta Ubicada al Sur',
        emergency: true,
        stateGate: true,
      };
      //Act
      jest.spyOn(registerGateUseCase, 'hasErrors').mockReturnValue(false);
      Object.defineProperty(registerGateUseCase, 'GateAggregateRoot', {
        value: aggregateRoot,
      });
      const result: IRegisteredGateResponse =
        await registerGateUseCase.execute();
      //Assert
      expect(result.data.description).toEqual(registerGateCommand.description);
      expect(result.data.emergency).toEqual(registerGateCommand.emergency);
      expect(result.data.stateGate).toEqual(registerGateCommand.stateGate);
    });
    it('can not register gate', () => {
      jest.spyOn(registerGateUseCase, 'hasErrors').mockReturnValue(true);
      const result = () => registerGateUseCase.execute();
      expect(result).rejects.toThrow(ValueObjectException);
    });
  });
});
