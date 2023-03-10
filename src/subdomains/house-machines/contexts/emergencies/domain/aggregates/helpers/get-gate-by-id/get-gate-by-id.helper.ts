import { AggregateRootException } from 'src/shared/sofka';
import { GotGateByIdEventPublisher } from '../../../events';
import { IGateDomainService } from '../../../services';

/**
 *
 * Es el Helper que contiene la logica para obtener el Gate por Id
 *
 * @param gateId Id del Gate
 * @param gateService Servicio del Gate
 * @param gotGateByIdEvent Evento publicador al momento de obtener el item de Gate
 * @returns answer
 */
export const GetGateByIdHelper = async (
  gateId: string,
  gateService: IGateDomainService | undefined,
  gotGateByIdEvent: GotGateByIdEventPublisher | undefined,
) => {
  if (!gateService) {
    throw new AggregateRootException('El evento gateService no está definido');
  }
  if (!gotGateByIdEvent) {
    throw new AggregateRootException(
      'El evento gotCloseGateByIdEvent no está definido',
    );
  }
  const answer = await gateService.getGateById(gateId);
  gotGateByIdEvent.response = answer;
  const response = gotGateByIdEvent.publish();
  return answer;
};
