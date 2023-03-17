import { AggregateRootException } from 'src/shared/sofka';
import { GateDomainEntity } from '../../../entities';
import { RegisteredGateEventPublisher } from '../../../events/publishers/registered-gate.event-publisher';
import { IGateDomainService } from '../../../services/gate.domain-service';

/**
 *
 * Es el Helper que contiene la logica para registrar un compuerta
 *
 * @param data
 * @param GateService
 * @param registeredGateEvent
 * @returns answer
 */
export const RegisterGateHelper = async (
  data: GateDomainEntity,
  GateService: IGateDomainService | undefined,
  registeredGateEvent: RegisteredGateEventPublisher | undefined,
) => {
  if (!GateService) {
    throw new AggregateRootException('El evento closeGateService no es valido');
  }
  if (!registeredGateEvent) {
    throw new AggregateRootException(
      'El evento registeredCloseActionEvent no es valido',
    );
  }
  const answer = await GateService.registerGate(data);
  registeredGateEvent.response = answer;
  registeredGateEvent.publish();
  return answer;
};
