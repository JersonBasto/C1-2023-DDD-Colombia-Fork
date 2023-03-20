import { ICloseGateDomainService } from '../../../domain';
import { RegisteredCloseActionEventPublisher } from '../../../domain/events/publishers/registered-close-action.event-publisher';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { RegisterCloseGateActionUseCase } from './register-close-gate-action.use-case';
import { IRegisterCloseActionCommand } from '../../../domain/interfaces/commands/register-close-action.command';
import { IRegisteredCloseACtionResponse } from '../../../domain/interfaces/responses/registered-close-action.response';
describe('RegisterCloseGateActionUseCase', () => {
  let closeGateService: ICloseGateDomainService;
  let registeredCloseActionEvent: RegisteredCloseActionEventPublisher;
  let aggregateRoot: GateAggregateRoot;
  let registerCloseGateActionUseCase: RegisterCloseGateActionUseCase;
  beforeEach(() => {
    closeGateService = {
      registerCloseAction: jest.fn().mockReturnValue({
        gatesClose: {
          id: '81e67a09-4d1c-4a7d-ba6a-7018dfbdde1e',
          description: 'Puerta Ubicada al norte',
        },
        description: 'Se acciona compuerta Norte por emergencia 3',
      }),
    } as unknown as ICloseGateDomainService;
    registeredCloseActionEvent = {
      publish: jest.fn(),
    } as unknown as RegisteredCloseActionEventPublisher;
    aggregateRoot = {
      registerCloseAction: jest.fn().mockResolvedValue({
        gatesClose: {
          id: '81e67a09-4d1c-4a7d-ba6a-7018dfbdde1e',
          description: 'Puerta Ubicada al norte',
        },
        description: 'Se acciona compuerta Norte por emergencia 3',
      }),
    } as unknown as GateAggregateRoot;
    registerCloseGateActionUseCase = new RegisterCloseGateActionUseCase(
      closeGateService,
      registeredCloseActionEvent,
    );
  });
  it('Should be defined', () => {
    expect(registerCloseGateActionUseCase).toBeDefined();
  });
  describe('Validations', () => {
    it('registrer close action', async () => {
      //Arrange
      const registerCloseActionCommand: IRegisterCloseActionCommand = {
        gatesClose: {
          id: '81e67a09-4d1c-4a7d-ba6a-7018dfbdde1e',
          description: 'Puerta Ubicada al norte',
          stateGate: true,
          emergency: true,
        },
        description: 'Se acciona compuerta Norte por emergencia 3',
      };
      //Act
      jest
        .spyOn(registerCloseGateActionUseCase, 'hasErrors')
        .mockReturnValue(false);
      Object.defineProperty(
        registerCloseGateActionUseCase,
        'GateAggregateRoot',
        {
          value: aggregateRoot,
        },
      );
      const result: IRegisteredCloseACtionResponse =
        await registerCloseGateActionUseCase.execute();
      //Assert
      expect(result.data.description).toEqual(registerCloseActionCommand.description);
      expect(result.data.gatesClose.gateId).toEqual(registerCloseActionCommand.gatesClose.gateId);
    });
  });
});
