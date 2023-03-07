import { AggregateRootException } from 'src/shared/sofka';
import { GotCloseGateByIdEventPublisher } from '../../../events';
import { ICloseGateDomainService } from '../../../services';

export const GetCloseGateByIdHelper = async (
  gateId: string,
  closeGateService: ICloseGateDomainService | undefined,
  gotCloseGateByIdEvent: GotCloseGateByIdEventPublisher | undefined,
) => {
  if (!closeGateService) {
    throw new AggregateRootException('El evento closeGateService no es valido');
  }
  if (!gotCloseGateByIdEvent) {
    throw new AggregateRootException(
      'El evento gotCloseGateByIdEvent no es valido',
    );
  }

  const answer = await closeGateService.getCloseGateById(gateId);
  gotCloseGateByIdEvent.response = answer;
  const res = gotCloseGateByIdEvent.publish();
  return answer;
};
