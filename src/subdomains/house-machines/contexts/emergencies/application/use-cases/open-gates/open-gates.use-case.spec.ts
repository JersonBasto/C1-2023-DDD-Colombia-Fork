import { IGateDomainService, OpenedGateEventPublisher } from '../../../domain';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { OpenGatesUseCase } from './open-gates.use-case';
import { OpenGateCommand } from '../../../infrastructure/utils/commands/open-gate.command';
import { IOpenGateResponse } from '../../../domain/interfaces/responses/opened-gate.response';
import { ValueObjectException } from '../../../../../../../shared/sofka/exceptions/object-value.exception';
describe('OpenGatesUseCase', () => {
  let gateService: IGateDomainService;
  let openedGateEvent: OpenedGateEventPublisher;
  let openGatesUseCase: OpenGatesUseCase;
  let aggregateRoot: GateAggregateRoot;
  beforeEach(() => {
    gateService = {
      openGates: jest.fn().mockReturnValue({
        gateId: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
      }),
    } as unknown as IGateDomainService;
    openedGateEvent = {
      publish: jest.fn(),
    } as unknown as OpenedGateEventPublisher;
    aggregateRoot = {
      openGates: jest.fn().mockResolvedValue({
        gateId: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
      }),
    } as unknown as GateAggregateRoot;
    openGatesUseCase = new OpenGatesUseCase(gateService, openedGateEvent);
  });
  it('Should be defined', () => {
    expect(openGatesUseCase).toBeDefined();
  });
  describe('Validations', () => {
    it('Open Gate', async () => {
      //Arrange
      const openGateCommand: OpenGateCommand = {
        id: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
      };
      //Act
      jest.spyOn(openGatesUseCase, 'hasErrors').mockReturnValue(false);
      Object.defineProperty(openGatesUseCase, 'aggregateRoot', {
        value: aggregateRoot,
      });
      const result: IOpenGateResponse = await openGatesUseCase.execute();
      //Assert
      expect(result.data.gateId).toEqual(openGateCommand.id);
    });
    it('can not open Gate', () => {
      jest.spyOn(openGatesUseCase, 'hasErrors').mockReturnValue(true);
      const result = () => openGatesUseCase.execute();
      expect(result).rejects.toThrow(ValueObjectException);
    });
  });
});
