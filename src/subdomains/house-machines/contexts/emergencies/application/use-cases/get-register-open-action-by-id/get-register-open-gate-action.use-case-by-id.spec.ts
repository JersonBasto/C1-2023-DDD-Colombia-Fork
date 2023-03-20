import { GotRegisterOpenGatePublisher } from '../../../infrastructure/messaging/publisher/got-register-open-action-by-id.publisher';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { GetRegisterOpenGateActionByIdUseCase } from './get-register-open-gate-action-by-id.use-case';
import { IOpenGateDomainService } from '../../..';
import { GetRegisterOpenGateActionCommand } from '../../../infrastructure/utils/commands/get-register-open-gate-action.command';
import { OpenGateDomainEntity } from '../../../domain/entities/open-gate.domain-entity';
import { IGotRegisterOpenGateActionReponse } from '../../../domain/interfaces/responses/got-open-gate-by-id.response';
import { ValueObjectException } from '../../../../../../../shared/sofka/exceptions/object-value.exception';
describe('GetRegisteredOpenGateActionUseCase', () => {
  let openGateService: IOpenGateDomainService;
  let gotRegisteredOpenGateAction: GotRegisterOpenGatePublisher;
  let aggregateRoot: GateAggregateRoot;
  let getRegisterOpenGateActionByIdUseCase: GetRegisterOpenGateActionByIdUseCase;
  beforeEach(() => {
    openGateService = {
      getOpenGateById: jest.fn().mockReturnValue({
        id: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
      }),
    } as unknown as IOpenGateDomainService;
    gotRegisteredOpenGateAction = {
      publish: jest.fn(),
    } as unknown as GotRegisterOpenGatePublisher;
    aggregateRoot = {
      getOpenGateById: jest.fn().mockResolvedValue({
        gateId: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
      }),
    } as unknown as GateAggregateRoot;
    getRegisterOpenGateActionByIdUseCase =
      new GetRegisterOpenGateActionByIdUseCase(
        openGateService,
        gotRegisteredOpenGateAction,
      );
  });
  it('Should be defined', () => {
    expect(getRegisterOpenGateActionByIdUseCase).toBeDefined();
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
        .spyOn(getRegisterOpenGateActionByIdUseCase, 'hasErrors')
        .mockReturnValue(false);
      Object.defineProperty(
        getRegisterOpenGateActionByIdUseCase,
        'GateAggregateRoot',
        {
          value: aggregateRoot,
        },
      );
      const result: IGotRegisterOpenGateActionReponse =
        await getRegisterOpenGateActionByIdUseCase.execute();
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
        .spyOn(getRegisterOpenGateActionByIdUseCase, 'hasErrors')
        .mockReturnValue(true);
      Object.defineProperty(
        getRegisterOpenGateActionByIdUseCase,
        'GateAggregateRoot',
        {
          value: aggregateRoot,
        },
      );
      const result = () => getRegisterOpenGateActionByIdUseCase.execute();
      //Assert
      expect(result).rejects.toThrow(ValueObjectException);
    });
  });
});
