import { AggregateRootException } from 'src/shared/sofka/exceptions/aggregate-root.exception';
import { ChangedStateEmergencyEventPusblisher } from '../../../events';
import { IGateDomainService } from '../../../services';

export const ChangeStateEmergencyHelper = async (
  value: boolean,
  gateService: IGateDomainService | undefined,
  changedStateEmergencyEvent: ChangedStateEmergencyEventPusblisher | undefined,
) => {
  if (!gateService) {
    throw new AggregateRootException('El evento gateService no está definido');
  }
  if (!changedStateEmergencyEvent) {
    throw new AggregateRootException(
      'El evento changedStateEmergencyEvent no está definido',
    );
  }

  const answer = await gateService.changeStateEmergency(value);
  changedStateEmergencyEvent.response = answer;
  changedStateEmergencyEvent.publish();
  return answer;
};
