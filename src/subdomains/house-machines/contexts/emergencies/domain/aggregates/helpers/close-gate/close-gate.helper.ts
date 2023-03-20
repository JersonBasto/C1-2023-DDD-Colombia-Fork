import { ClosedGateEventPublisher, IGateDomainService } from "../../..";
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';


/**
 *
 * Es el Helper que contiene la logica de cerrar puertas
 *
 * @param gateId Id de Gate
 * @param gateService Servicio de Gate
 * @param closedGateEvent Evento publicar cuando se cierra la Gate
 * @returns answer
 */
export const CloseGateHelper = async (
  gateId: string,
  gateService: IGateDomainService | undefined,
  closedGateEvent: ClosedGateEventPublisher | undefined,
) => {
  if (!gateService) {
    throw new AggregateRootException('El evento closeGate no está definido');
  }
  if (!closedGateEvent) {
    throw new AggregateRootException(
      'El evento closedGateEvent no está definido',
    );
  }

  const answer = await gateService.closeGates(gateId);
  closedGateEvent.response = answer;
  closedGateEvent.publish();
  return answer;
};
