import {
  CloseGateDomainEntity,
  ICloseGateDomainService,
  RegisteredCloseActionEventPublisher,
} from '../../..';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';

/**
 *
 * Es el Helper encargado de registrar el cierre de una compuerta
 *
 * @param data
 * @param closeGateService
 * @param registeredCloseActionEvent
 * @returns answer
 */
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
