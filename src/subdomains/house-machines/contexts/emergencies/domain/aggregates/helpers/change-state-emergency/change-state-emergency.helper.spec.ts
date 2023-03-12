import { ChangeStateEmergencyHelper } from './change-state-emergency.helper';
import { IGateDomainService } from '../../../services';
import { ChangedStateEmergencyEventPusblisher } from '../../../events';

describe('changeStateEmergencyHelper', () => {
  let value: boolean;
  let gateService: IGateDomainService;
  let changedStateEmergencyEvent: ChangedStateEmergencyEventPusblisher;
  let helper: ChangeStateEmergencyHelper;
  beforeEach(() => {
    (value = true), (gateService = {} as IGateDomainService);
    changedStateEmergencyEvent = {} as ChangedStateEmergencyEventPusblisher;
    helper = new ChangeStateEmergencyHelper(
      value,
      gateService,
      changedStateEmergencyEvent,
    );
  });
  it('Should be defined', () => {
    expect(helper);
  });
});
