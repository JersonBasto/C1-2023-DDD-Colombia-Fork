import {
  GateDomainEntity,
  IGateDomainService,
  OpenedGateEventPublisher,
} from '../../..';
import { AggregateRootException } from '../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';

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
