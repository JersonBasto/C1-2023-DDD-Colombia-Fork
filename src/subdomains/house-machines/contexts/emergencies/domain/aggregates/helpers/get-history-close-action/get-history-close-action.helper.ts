import { AggregateRootException } from 'src/shared/sofka';
import { GotHistoryCloseActionEventPublisher } from '../../../events';
import { ICloseGateDomainService } from '../../../services';

export const GetHistoryCloseActionHelper = async (
  closeGateService: ICloseGateDomainService |undefined,
  gotHistoryCloseActionEvent: GotHistoryCloseActionEventPublisher | undefined,
) => {
  if (!closeGateService) {
    throw new AggregateRootException('El evento closeGateService no es valido');
  }
  if (!gotHistoryCloseActionEvent) {
    throw new AggregateRootException(
      'El evento gotHistoryCloseActionEvent no es valido',
    );
  }
  const answer = await closeGateService.getHistoryCloseAction();
  gotHistoryCloseActionEvent.response = answer;
  const res = gotHistoryCloseActionEvent.publish();
  return answer;
};
