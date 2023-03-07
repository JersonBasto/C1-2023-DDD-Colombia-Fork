import { AggregateRootException } from 'src/shared/sofka';
import { CloseGateDomainEntity } from '../../../entities';
import { RegisteredCloseActionEventPublisher } from '../../../events';
import { ICloseGateDomainService } from '../../../services';

export const RegisterCloseActionHelper = async (
  data: CloseGateDomainEntity,
  closeGateService: ICloseGateDomainService | undefined,
  registeredCloseActionEvent: RegisteredCloseActionEventPublisher | undefined,
) => {
  if (!closeGateService) {
    throw new AggregateRootException('El evento closeGateService no es valido');
  }
  if (!registeredCloseActionEvent) {
    throw new AggregateRootException(
      'El evento registeredCloseActionEvent no es valido',
    );
  }
  const answer = await closeGateService.registerCloseAction(data);
  registeredCloseActionEvent.response = answer;
  registeredCloseActionEvent.publish();
  return answer;
};
