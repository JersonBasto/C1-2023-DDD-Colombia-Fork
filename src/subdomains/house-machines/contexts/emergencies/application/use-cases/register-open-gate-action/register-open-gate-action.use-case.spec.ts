import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { IOpenGateDomainService } from '../../../domain/services/open-gate.domain-service';
import { RegisterOpenGateActionUseCase } from './register-open-gate-action.use-case';
import { RegisteredOpenGatePublisher } from '../../../infrastructure/messaging/publisher/registered-open-gate-action.publisher';
import { IRegisteredOpenACtionResponse } from '../../../domain/interfaces/responses/registered-open-action.response';
import { IRegisterOpenActionCommand } from '../../../domain/interfaces/commands/register-open-action.command';
describe('RegisterCloseGateActionUseCase', () => {
  let openGateService: IOpenGateDomainService;
  let registeredOpenActionEvent: RegisteredOpenGatePublisher;
  let aggregateRoot: GateAggregateRoot;
  let registerOpenGateActionUseCase: RegisterOpenGateActionUseCase;
  beforeEach(() => {
    openGateService = {
      registerOpenAction: jest.fn().mockReturnValue({
        gatesOpen: {
          id: '81e67a09-4d1c-4a7d-ba6a-7018dfbdde1e',
          description: 'Puerta Ubicada al norte',
        },
        description: 'Se acciona compuerta Norte por emergencia 3',
      }),
    } as unknown as IOpenGateDomainService;
    registeredOpenActionEvent = {
      publish: jest.fn(),
    } as unknown as RegisteredOpenGatePublisher;
    aggregateRoot = {
      registerOpenAction: jest.fn().mockResolvedValue({
        gatesOpen: {
          id: '81e67a09-4d1c-4a7d-ba6a-7018dfbdde1e',
          description: 'Puerta Ubicada al norte',
        },
        description: 'Se acciona compuerta Norte por emergencia 3',
      }),
    } as unknown as GateAggregateRoot;
    registerOpenGateActionUseCase = new RegisterOpenGateActionUseCase(
      openGateService,
      registeredOpenActionEvent,
    );
  });
  it('Should be defined', () => {
    expect(registerOpenGateActionUseCase).toBeDefined();
  });
  describe('Validations', () => {
    it('registrer close action', async () => {
      //Arrange
      const registerCloseActionCommand: IRegisterOpenActionCommand = {
        gatesOpen: {
          id: '81e67a09-4d1c-4a7d-ba6a-7018dfbdde1e',
          description: 'Puerta Ubicada al norte',
          stateGate: true,
          emergency: true,
        },
        description: 'Se acciona compuerta Norte por emergencia 3',
      };
      //Act
      jest
        .spyOn(registerOpenGateActionUseCase, 'hasErrors')
        .mockReturnValue(false);
      Object.defineProperty(
        registerOpenGateActionUseCase,
        'GateAggregateRoot',
        {
          value: aggregateRoot,
        },
      );
      const result: IRegisteredOpenACtionResponse =
        await registerOpenGateActionUseCase.execute();
      //Assert
      expect(result.data.description).toEqual(
        registerCloseActionCommand.description,
      );
      expect(result.data.gatesOpen.gateId).toEqual(
        registerCloseActionCommand.gatesOpen.gateId,
      );
    });
  });
});
