import { AggregateRootException } from 'src/shared/sofka';
import { GotOpenGateByIdEventPublisher } from '../../../events';
import { IOpenGateDomainService } from '../../../services';

export const GetOpenGateByIdHelper = async (
  gateId: string,
  openGateService: IOpenGateDomainService | undefined,
  gotOpenGateByIdEvent: GotOpenGateByIdEventPublisher | undefined,
) => {
  if (!openGateService) {
    throw new AggregateRootException('El evento openGateService no es valido');
  }
  if (!gotOpenGateByIdEvent) {
    throw new AggregateRootException(
      'El evento gotOpenGateByIdEvent no es valido',
    );
  }
  const answer = await openGateService.getOpenGateById(gateId);
  gotOpenGateByIdEvent.response = answer;
  const res = gotOpenGateByIdEvent.publish();
  return answer;
};
