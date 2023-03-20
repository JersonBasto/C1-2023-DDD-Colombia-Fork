import {
  IOpenGateDomainService,
  OpenGateDomainEntity,
  RegisteredOpenedActionEventPublisher,
} from '../../..';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';

/**
 *
 * Es el Helper que contiene la logica para registrar la accion de abrir
 * compuerta
 *
 * @param data
 * @param openGateService
 * @param registeredOpenActionEvent
 * @returns answer
 */
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
