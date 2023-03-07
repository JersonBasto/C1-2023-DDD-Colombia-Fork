import { AggregateRootException } from 'src/shared/sofka';
import { GateDomainEntity } from '../../../entities/gate.domain-entity';
import { OpenGateDomainEntity } from '../../../entities/open-gate.domain-entity';
import { OpenedGateEventPublisher } from '../../../events/publishers/opened-gate.event-publisher';
import { IGateDomainService } from '../../../services/gate.domain-service';
import { IOpenGateDomainService } from '../../../services/open-gate.domain-service';

export const OpenGateHelper = async (
  gateId: string,
  gateService: IGateDomainService | undefined,
  OpenedGateEventPublisher: OpenedGateEventPublisher<GateDomainEntity> | undefined,
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
