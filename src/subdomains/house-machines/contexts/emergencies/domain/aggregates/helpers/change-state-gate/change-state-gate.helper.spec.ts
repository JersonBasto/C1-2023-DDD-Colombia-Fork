import { IGateDomainService } from '../../../services/gate.domain-service';
import { ChangedStateEmergencyEventPusblisher } from '../../../events/publishers/changed-state-emergency.event-publisher';
import { GateDomainEntity } from '../../../entities/gate.domain-entity';
import { v4 as uuid } from 'uuid';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
import { ChangedStateGateEventPublisher } from '../../../events';
import { ChangeStateEmergencyHelper } from '../change-state-emergency';
import { ChangeStateGateHelper } from './change-state-gate.helper';

describe('changeStateEmergencyHelper', () => {
  let value: boolean;
  let gateService: IGateDomainService;
  let changedStateGateEvent: ChangedStateGateEventPublisher;
  let helper: any;
  beforeEach(() => {
    value = true;
    gateService = {
      changeStateGate: jest.fn(),
    } as unknown as IGateDomainService;
    changedStateGateEvent = {
      publish: jest.fn(),
      response: new GateDomainEntity(),
    } as unknown as ChangedStateGateEventPublisher;
    helper =  ChangeStateGateHelper;
  });
  it('Should be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('No service', () => {
      //Arrange
      gateService = undefined as unknown as IGateDomainService;
      //Act
      const result = helper(
        true,
        uuid(),
        gateService,
        changedStateGateEvent,
      );
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No event', () => {
      //Arrange
      changedStateGateEvent =
        undefined as unknown as ChangedStateGateEventPublisher;
      //Act
      const result = helper(
        true,
        uuid(),
        gateService,
        changedStateGateEvent,
      );
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it("change state Gate", async () => {
      //Arrange
      const gate = new GateDomainEntity()
      gate.gateId = uuid()
      gate.description = "Se crea compuerta salida norte"
      gate.emergency = false
      gate.stateGate = false
      gate.emergencyDate = Date.now()
      gateService.changeStateGate = jest.fn().mockReturnValue(gate)
      //Act
      const result = await helper(true, gate.gateId, gateService, changedStateGateEvent)
      //Assert
      gate.stateGate = true
      expect(result).toEqual(gate)
    })
  });
});