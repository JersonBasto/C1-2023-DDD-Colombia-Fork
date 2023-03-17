import { AggregateRootException } from 'src/shared/sofka';
import { GateDomainEntity } from '../../../entities/gate.domain-entity';
import { OpenedGateEventPublisher } from '../../../events/publishers/opened-gate.event-publisher';
import { IGateDomainService } from '../../../services/gate.domain-service';

/**
 *
 * Es el Helper que contiene la logica para abrir la compuerta a traves de un ID
 *
 * @param gateId
 * @param gateService
 * @param OpenedGateEventPublisher
 * @returns answer
 */
export const OpenGateHelper = async (
  gateId: string,
  gateService: IGateDomainService | undefined,
  OpenedGateEventPublisher:
    | OpenedGateEventPublisher<GateDomainEntity>
    | undefined,
) => {
  if (!OpenedGateEventPublisher) {
    throw new AggregateRootException(
      'El evento OpenedGateEventPublisher no está definido',
    );
  }
  if (!gateService) {
    throw new AggregateRootException(
      'El servicio openGateService no está definido',
    );
  }

  const answer = await gateService.openGates(gateId);
  OpenedGateEventPublisher.response = answer;
  OpenedGateEventPublisher.publish();
  return answer;
};
