import { IGateDomainService } from '../../..';
import { ClosedGateEventPublisher } from '../../../domain/events/publishers/closed-gate.event-publisher';
import { GateAggregateRoot } from '../../../domain/aggregates/gate.aggregate';
import { CloseGatesUseCase } from './close-gates.use-case';
import { IOpenGateCommand } from '../../../../../../../../dist/subdomains/house-machines/contexts/emergencies/domain/interfaces/commands/open-gate.command';
import { ICloseGateResponse } from '../../../domain/interfaces/responses/closed-gate.response';
import { ValueObjectException } from '../../../../../../../shared/sofka/exceptions/object-value.exception';

describe('CloseGatesUseCase', () => {
  let gateService: IGateDomainService;
  let closedGateEventPublisher: ClosedGateEventPublisher;
  let aggregateRoot: GateAggregateRoot;
  let closeGateUseCase: CloseGatesUseCase;

  beforeEach(() => {
    gateService = {
      closeGates: jest.fn().mockReturnValue({
        gateId: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
      }),
    } as unknown as IGateDomainService;
    closedGateEventPublisher = {
      publish: jest.fn(),
    } as unknown as ClosedGateEventPublisher;
    aggregateRoot = {
      closeGates: jest.fn().mockResolvedValue({
        gateId: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
      }),
    } as unknown as GateAggregateRoot;
    closeGateUseCase = new CloseGatesUseCase(
      gateService,
      closedGateEventPublisher,
    );
  });
  it('Should be defined', () => {
    expect(closeGateUseCase).toBeDefined();
  });
  describe('Validations', () => {
    it('Close Gate', async () => {
      //Arrange
      const openGateCommand: IOpenGateCommand = {
        id: '5191b2a5-ce4a-4fcf-aa68-38c0733a610b',
      };
      //Act
      jest.spyOn(closeGateUseCase, 'hasErrors').mockReturnValue(false);
      Object.defineProperty(closeGateUseCase, 'GateAggregateRoot', {
        value: aggregateRoot,
      });
      const result: ICloseGateResponse = await closeGateUseCase.execute();
      //Assert
      expect(result.data.gateId).toEqual(openGateCommand.id);
    });
    it('can not close gate', async () => {
      //Arrange
      //Act
      jest.spyOn(closeGateUseCase, 'hasErrors').mockReturnValue(true);
      const result = () => closeGateUseCase.execute();
      //Assert
      expect(result).rejects.toThrow(ValueObjectException);
    });
  });
});
