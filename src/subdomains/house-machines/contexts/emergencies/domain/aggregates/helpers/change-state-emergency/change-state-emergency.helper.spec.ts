/*
import { ChangeStateEmergencyHelper } from './change-state-emergency.helper';
import { IGateDomainService } from '../../../services';
import { ChangedStateEmergencyEventPusblisher } from '../../../events';
import { AggregateRootException } from 'src/shared/sofka';

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
      response: '123',
      publish: jest.fn(),
    } as unknown as ChangedStateEmergencyEventPusblisher;
    helper = ChangeStateEmergencyHelper(
      value,
      gateService,
      changedStateEmergencyEvent,
    );
  });
  it('Should be defined', () => {
    expect(helper).toBeDefined();
  });
  it('prueba', () => {
    value = true;
    gateService = {
      changeStateEmergency: jest.fn(),
    } as unknown as IGateDomainService;
    changedStateEmergencyEvent = {
      response: '123',
      publish: jest.fn(),
    } as unknown as ChangedStateEmergencyEventPusblisher;
    helper = ChangeStateEmergencyHelper(
      value,
      gateService,
      changedStateEmergencyEvent,
    );
    expect(changedStateEmergencyEvent.response).toBe(true || false);
  });
});
*/