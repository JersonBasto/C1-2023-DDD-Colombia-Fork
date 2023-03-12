import { ChangeStateEmergencyHelper } from './change-state-emergency.helper';
import { IGateDomainService } from '../../../services';
import { ChangedStateEmergencyEventPusblisher } from '../../../events';

describe('changeStateEmergencyHelper', () => {
  let value: boolean;
  let gateService: IGateDomainService;
  let changedStateEmergencyEvent: ChangedStateEmergencyEventPusblisher;
  beforeEach(() => {
    (value = true), (gateService = {} as IGateDomainService);
    changedStateEmergencyEvent = {} as ChangedStateEmergencyEventPusblisher;
    let helper = ChangeStateEmergencyHelper(
      value,
      gateService,
      changedStateEmergencyEvent,
    );
  });
});
