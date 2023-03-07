import { AggregateRootException } from 'src/shared/sofka';
import { ClosedGateEventPublisher } from '../../../events';
import { IGateDomainService } from '../../../services';

export const CloseGateHelper = async (
  gateId: string,
  gateService: IGateDomainService | undefined,
  closedGateEvent: ClosedGateEventPublisher | undefined,
) => {
  if (!gateService) {
    throw new AggregateRootException('El evento closeGate no está definido');
  }
  if (!closedGateEvent) {
    throw new AggregateRootException(
      'El evento closedGateEvent no está definido',
    );
  }

  const answer = await gateService.closeGates(gateId);
  closedGateEvent.response = answer;
  closedGateEvent.publish();
  return answer;
};
