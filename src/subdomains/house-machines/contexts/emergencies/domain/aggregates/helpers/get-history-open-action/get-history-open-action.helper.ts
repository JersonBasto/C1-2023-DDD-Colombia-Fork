import { AggregateRootException } from 'src/shared/sofka';
import { GotHistoryOpenActionEventPublisher } from '../../../events';
import { IOpenGateDomainService } from '../../../services';

export const GetHistoryOpenActionHelper = async (
  openGateService: IOpenGateDomainService | undefined,
  gotHistoryOpenActionEvent: GotHistoryOpenActionEventPublisher | undefined,
) => {
  if (!openGateService) {
    throw new AggregateRootException('El evento openGateService no es valido');
  }
  if (!gotHistoryOpenActionEvent) {
    throw new AggregateRootException('El evento openGateService no es valido');
  }
  const answer = await openGateService.getHistoryOpenAction();
  gotHistoryOpenActionEvent.response = answer;
  const res = gotHistoryOpenActionEvent.publish();
  return answer;
};
