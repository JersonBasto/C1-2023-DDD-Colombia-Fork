import { ChangedStateGateEventPublisher, IGateDomainService } from "../../..";
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';

/**
 *
 * Se crea el helper que maneja la logica para cambiar el estado de Gate
 *
 * @param value boolean
 * @param gateId Id de Gate
 * @param gateService Servicio de Gate
 * @param changedStateGateEvent Evento Publicador de cambio estado de Gate
 * @returns answer
 */
export const ChangeStateGateHelper = async (
  value: boolean,
  gateId: string,
  gateService: IGateDomainService | undefined,
  changedStateGateEvent: ChangedStateGateEventPublisher | undefined,
) => {
  if (!gateService) {
    throw new AggregateRootException('El evento gateService no está definido');
  }
  if (!changedStateGateEvent) {
    throw new AggregateRootException(
      'El evento changedStateGateEvent no está definido',
    );
  }

  const answer = await gateService.changeStateGate(gateId, value);
  changedStateGateEvent.response = answer;
  changedStateGateEvent.publish();
  return answer;
};
