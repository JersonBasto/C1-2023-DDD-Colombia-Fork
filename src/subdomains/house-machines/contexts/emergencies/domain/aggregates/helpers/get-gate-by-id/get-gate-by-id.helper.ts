import { AggregateRootException } from 'src/shared/sofka';
import { GotGateByIdEventPublisher } from '../../../events';
import { IGateDomainService } from '../../../services';

export const GetGateByIdHelper = async (
  gateId: string,
  gateService: IGateDomainService | undefined,
  gotGateByIdEvent: GotGateByIdEventPublisher |undefined,
) => {
  if (!gateService) {
    throw new AggregateRootException('El evento gateService no está definido');
  }
  if (!gotGateByIdEvent) {
    throw new AggregateRootException(
      'El evento gotCloseGateByIdEvent no está definido',
    );
  }
  const answer = await gateService.getGateById(gateId);
  gotGateByIdEvent.response = answer;
  const response = gotGateByIdEvent.publish();
  return answer;
};
