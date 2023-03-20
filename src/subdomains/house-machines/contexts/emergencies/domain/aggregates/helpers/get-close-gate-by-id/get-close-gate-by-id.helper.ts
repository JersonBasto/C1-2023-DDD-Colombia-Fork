import { GotCloseGateByIdEventPublisher, ICloseGateDomainService } from "../../..";
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';


/**
 *
 * Es el Helper que contiene la logica para obtener un registro de cerrar compuerta a traves del ID
 *
 * @param gateId Id de la Gate
 * @param closeGateService Servicio de CloseGate
 * @param gotCloseGateByIdEvent Evento publicador de obtener el item CloseGate a traves del Id
 * @returns answer
 */
export const GetCloseGateByIdHelper = async (
  gateId: string,
  closeGateService: ICloseGateDomainService | undefined,
  gotCloseGateByIdEvent: GotCloseGateByIdEventPublisher | undefined,
) => {
  if (!closeGateService) {
    throw new AggregateRootException('El evento closeGateService no es valido');
  }
  if (!gotCloseGateByIdEvent) {
    throw new AggregateRootException(
      'El evento gotCloseGateByIdEvent no es valido',
    );
  }

  const answer = await closeGateService.getCloseGateById(gateId);
  gotCloseGateByIdEvent.response = answer;
  const res = gotCloseGateByIdEvent.publish();
  return answer;
};
