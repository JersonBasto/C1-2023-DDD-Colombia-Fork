import { AggregateRootException } from 'src/shared/sofka/exceptions/aggregate-root.exception';
import { ChangedStateGateEventPublisher } from '../../../events';
import { IGateDomainService } from '../../../services';

export const ChangeStateGateHelper = async (
  value: boolean,
  gateId: string,
  gateService: IGateDomainService | undefined,
  changedStateGateEvent: ChangedStateGateEventPublisher | undefined,
) => {
  if (!gateService) {
    throw new AggregateRootException('El evento gateService no está definido');
  }
  if (!changedStateGateEvent) {
    throw new AggregateRootException(
      'El evento changedStateGateEvent no está definido',
    );
  }

  const answer = await gateService.changeStateGate(gateId, value);
  changedStateGateEvent.response = answer;
  changedStateGateEvent.publish();
  return answer;
};
