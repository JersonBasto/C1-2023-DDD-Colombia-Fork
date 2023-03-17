import { AggregateRootException } from 'src/shared/sofka';
import { GotHistoryCloseActionEventPublisher } from '../../../events';
import { ICloseGateDomainService } from '../../../services';

/**
 * Es el Helper encargado de la logica para obtener todos los registros
 * de cerrar compuertas
 *
 * @param closeGateService
 * @param gotHistoryCloseActionEvent
 * @returns answer
 */
export const GetHistoryCloseActionHelper = async (
  closeGateService: ICloseGateDomainService | undefined,
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
