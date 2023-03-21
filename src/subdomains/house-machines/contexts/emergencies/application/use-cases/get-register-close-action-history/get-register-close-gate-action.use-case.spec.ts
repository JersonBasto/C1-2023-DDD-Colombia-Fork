import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { GetRegisterOpenGateActionCommand } from '../../../infrastructure/utils/commands/get-register-open-gate-action.command';
import { OpenGateDomainEntity } from '../../../domain/entities/open-gate.domain-entity';
import { ValueObjectException } from '../../../../../../../shared/sofka/exceptions/object-value.exception';
import { GetRegisterCloseGateActionUseCase } from './get-register-close-gate-action.use-case';
import { ICloseGateDomainService } from '../../../domain/services/close-gate.domain-service';
import { GotRegisterCloseGatePublisher } from '../../../infrastructure/messaging/publisher/got-register-close-action-by-id.publisher';
import { IGotRegisterCloseGateActionReponse } from '../../../domain/interfaces/responses/got-close-gate-by-id.response';
describe('GetRegisteredCloseGateActionUseCase', () => {
  let closeGateService: ICloseGateDomainService;
  let gotRegisteredCloseGateAction: GotRegisterCloseGatePublisher;
  let aggregateRoot: GateAggregateRoot;
  let getRegisterCloseGateActionByIdUseCase: GetRegisterCloseGateActionUseCase;
  beforeEach(() => {
    closeGateService = {
      getCloseGateById: jest.fn().mockReturnValue({
        id: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
      }),
    } as unknown as ICloseGateDomainService;
    gotRegisteredCloseGateAction = {
      publish: jest.fn(),
    } as unknown as GotRegisterCloseGatePublisher;
    aggregateRoot = {
      getOpenGateById: jest.fn().mockResolvedValue({
        gateId: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
      }),
    } as unknown as GateAggregateRoot;
    getRegisterCloseGateActionByIdUseCase =
      new GetRegisterCloseGateActionUseCase(
        closeGateService,
        gotRegisteredCloseGateAction,
      );
  });
  it('Should be defined', () => {
    expect(getRegisterCloseGateActionByIdUseCase).toBeDefined();
  });
  describe('Validations', () => {
    it('Get register Open Gate', async () => {
      //Arrange
      const getRegisterOpenGateActionCommand: GetRegisterOpenGateActionCommand =
        {
          id: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
        };
      const openGateEntity = new OpenGateDomainEntity();
      openGateEntity.id = '5191b2a5-ce4a-4fcf-aa68-38c0733a610b';
      //Act
      jest
        .spyOn(getRegisterCloseGateActionByIdUseCase, 'hasErrors')
        .mockReturnValue(false);
      Object.defineProperty(
        getRegisterCloseGateActionByIdUseCase,
        'GateAggregateRoot',
        {
          value: aggregateRoot,
        },
      );
      const result: IGotRegisterCloseGateActionReponse =
        await getRegisterCloseGateActionByIdUseCase.execute();
      //Assert
      expect(result.data.id).toEqual(getRegisterOpenGateActionCommand.id);
    });
    it('Can not Get register Open Gate', async () => {
      //Arrange
      const getRegisterOpenGateActionCommand: GetRegisterOpenGateActionCommand =
        {
          id: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
        };
      const openGateEntity = new OpenGateDomainEntity();
      openGateEntity.id = '5191b2a5-ce4a-4fcf-aa68-38c0733a610b';
      //Act
      jest
        .spyOn(getRegisterCloseGateActionByIdUseCase, 'hasErrors')
        .mockReturnValue(true);
      Object.defineProperty(
        getRegisterCloseGateActionByIdUseCase,
        'GateAggregateRoot',
        {
          value: aggregateRoot,
        },
      );
      const result = () => getRegisterCloseGateActionByIdUseCase.execute();
      //Assert
      expect(result).rejects.toThrow(ValueObjectException);
    });
  });
});
