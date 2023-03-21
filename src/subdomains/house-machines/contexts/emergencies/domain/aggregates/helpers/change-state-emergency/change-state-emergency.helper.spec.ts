import { IGateDomainService } from '../../../services/gate.domain-service';
import { ChangedStateEmergencyEventPusblisher } from '../../../events/publishers/changed-state-emergency.event-publisher';
import { ChangeStateEmergencyHelper } from './change-state-emergency.helper';
import { GateDomainEntity } from '../../../entities/gate.domain-entity';
import { v4 as uuid } from 'uuid';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';

describe('changeStateEmergencyHelper', () => {
  let value: boolean;
  let gateService: IGateDomainService;
  let changedStateEmergencyEvent: ChangedStateEmergencyEventPusblisher;
  let helper: any;
  beforeEach(() => {
    value = true;
    gateService = {
      changeStateEmergency: jest.fn(),
    } as unknown as IGateDomainService;
    changedStateEmergencyEvent = {
      publish: jest.fn(),
      response: new GateDomainEntity(),
    } as unknown as ChangedStateEmergencyEventPusblisher;
    helper = ChangeStateEmergencyHelper;
  });
  it('Should be defined', () => {
    expect(helper).toBeDefined();
  });
  describe('Validations', () => {
    it('prueba', () => {
      value = true;
      gateService = {
        changeStateEmergency: jest.fn(),
      } as unknown as IGateDomainService;
      changedStateEmergencyEvent = {
        response: true,
        publish: jest.fn(),
      } as unknown as ChangedStateEmergencyEventPusblisher;
      helper = ChangeStateEmergencyHelper;
      expect(changedStateEmergencyEvent.response).toBe(true || false);
    });
    it('No service', () => {
      //Arrange
      gateService = undefined as unknown as IGateDomainService;
      //Act
      const result = helper(
        true,
        uuid(),
        gateService,
        changedStateEmergencyEvent,
      );
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it('No event', () => {
      //Arrange
      changedStateEmergencyEvent =
        undefined as unknown as ChangedStateEmergencyEventPusblisher;
      //Act
      const result = helper(
        true,
        uuid(),
        gateService,
        changedStateEmergencyEvent,
      );
      //Assert
      expect(result).rejects.toThrow(AggregateRootException);
    });
    it("change state emergecy", async () => {
      //Arrange
      const gate = new GateDomainEntity()
      gate.gateId = uuid()
      gate.description = "Se crea compuerta salida norte"
      gate.emergency = false
      gate.stateGate = false
      gate.emergencyDate = Date.now()
      gateService.changeStateEmergency = jest.fn().mockReturnValue(gate)
      //Act
      const result = await helper(true, gate.gateId, gateService, changedStateEmergencyEvent)
      //Assert
      gate.emergency = true
      expect(result).toEqual(gate)
    })
  });
});
