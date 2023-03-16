import { AggregateRootException } from 'src/shared/sofka';
import { OpenGateDomainEntity } from '../../../entities';
import { RegisteredOpenedActionEventPublisher } from '../../../events';
import { IOpenGateDomainService } from '../../../services';

export const RegisterOpenActionHelper = async (
  data: OpenGateDomainEntity,
  openGateService?: IOpenGateDomainService,
  registeredOpenActionEvent?: RegisteredOpenedActionEventPublisher,
) => {
  if (!openGateService) {
    throw new AggregateRootException('El evento openGateService no es valido');
  }
  if (!registeredOpenActionEvent) {
    throw new AggregateRootException(
      'El evento registeredOpenActionEvent no es valido',
    );
  }
  const answer = await openGateService.registerOpenAction(data);
  registeredOpenActionEvent.response = answer;
  const res = await registeredOpenActionEvent.publish();
  return answer;
};
