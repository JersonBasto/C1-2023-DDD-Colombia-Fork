import { AggregateRootException } from 'src/shared/sofka/exceptions/aggregate-root.exception';
import { ChangedStateEmergencyEventPusblisher } from '../../../events';
import { IGateDomainService } from '../../../services';

/**
 *
 * Este es el helper encargado de la logica para cambiar el estado
 * de emergencia.
 *
 * @param value Boolean
 * @param gateService El servicio de Gate
 * @param changedStateEmergencyEvent Evento publicador del cambio de estado de emergencia
 * @returns answer
 */
export const ChangeStateEmergencyHelper = async (
  value: boolean,
  gateService?: IGateDomainService,
  changedStateEmergencyEvent?: ChangedStateEmergencyEventPusblisher,
) => {
  if (!gateService) {
    throw new AggregateRootException('El evento gateService no está definido');
  }
  if (!changedStateEmergencyEvent) {
    throw new AggregateRootException(
      'El evento changedStateEmergencyEvent no está definido',
    );
  }

  const answer = await gateService.changeStateEmergency(value);
  changedStateEmergencyEvent.response = answer;
  changedStateEmergencyEvent.publish();
  return answer;
};
