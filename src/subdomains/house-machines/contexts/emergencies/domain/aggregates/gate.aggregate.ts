import { GateDomainEntity } from '../entities/gate.domain-entity';
import { IOpenGateDomainEntity } from '../entities/interfaces/open-gate.domain-entity.interface';
import { ICloseGateDomainEntity } from '../entities/interfaces/close-gate.domain-entity.interface';
import { ICloseGateDomainService } from '../services/close-gate.domain-service';
import { IGateDomainService } from '../services/gate.domain-service';
import { IOpenGateDomainService } from '../services/open-gate.domain-service';
import { OpenGateHelper } from './helpers/open-gate/open-gate.helper';
import { ChangedStateEmergencyEventPusblisher } from '../events/publishers/changed-state-emergency.event-publisher';
import { ChangedStateGateEventPublisher } from '../events/publishers/changed-state-gate.event-publisher';
import { ClosedGateEventPublisher } from '../events/publishers/closed-gate.event-publisher';
import { GotCloseGateByIdEventPublisher } from '../events/publishers/got-close-gate-by-id.event-publisher';
import { GotGateByIdEventPublisher } from '../events/publishers/got-gate-by-id.event-publisher';
import { GotHistoryCloseActionEventPublisher } from '../events/publishers/got-history-close-action.event-publisher';
import { GotHistoryOpenActionEventPublisher } from '../events/publishers/got-history-open-action.event-publisher';
import { GotOpenGateByIdEventPublisher } from '../events/publishers/got-open-gate-by-id.event-publisher';
import { OpenedGateEventPublisher } from '../events/publishers/opened-gate.event-publisher';
import { RegisteredCloseActionEventPublisher } from '../events/publishers/registered-close-action.event-publisher';
import { RegisteredOpenedActionEventPublisher } from '../events/publishers/registered-open-action.event-publisher';
import { CloseGateHelper } from './helpers';
import { ChangeStateGateHelper } from './helpers/change-state-gate/change-state-gate.helper';
import { ChangeStateEmergencyHelper } from './helpers/change-state-emergency/change-state-emergency.helper';

export class GateAggregateRoot
  implements
    IGateDomainService,
    IOpenGateDomainService,
    ICloseGateDomainService
{
  private readonly gateService?: IGateDomainService;
  private readonly openGateService?: IOpenGateDomainService;
  private readonly closeGateService?: ICloseGateDomainService;
  private readonly changedStateEmergencyEvent?: ChangedStateEmergencyEventPusblisher;
  private readonly changedStateGateEvent?: ChangedStateGateEventPublisher;
  private readonly closedGateEvent?: ClosedGateEventPublisher;
  private readonly gotCloseGateByIdEvent?: GotCloseGateByIdEventPublisher;
  private readonly gotGateByIdEvent?: GotGateByIdEventPublisher;
  private readonly gotHistoryCloseActionEvent?: GotHistoryCloseActionEventPublisher;
  private readonly gotHistoryOpenActionEvent?: GotHistoryOpenActionEventPublisher;
  private readonly gotOpenGateByIdEvent?: GotOpenGateByIdEventPublisher;
  private readonly openedGateEvent?: OpenedGateEventPublisher;
  private readonly registeredCloseActionEvent?: RegisteredCloseActionEventPublisher;
  private readonly registeredOpenActionEvent?: RegisteredOpenedActionEventPublisher;

  constructor({
    gateService,
    openGateService,
    closeGateService,
    changedStateEmergencyEvent,
    changedStateGateEvent,
    closedGateEvent,
    gotCloseGateByIdEvent,
    gotGateByIdEvent,
    gotHistoryCloseActionEvent,
    gotHistoryOpenActionEvent,
    gotOpenGateByIdEvent,
    openedGateEvent,
    registeredCloseActionEvent,
    registeredOpenActionEvent,
  }: {
    gateService?: IGateDomainService;
    openGateService?: IOpenGateDomainService;
    closeGateService?: ICloseGateDomainService;
    changedStateEmergencyEvent?: ChangedStateEmergencyEventPusblisher;
    changedStateGateEvent?: ChangedStateGateEventPublisher;
    closedGateEvent?: ClosedGateEventPublisher;
    gotCloseGateByIdEvent?: GotCloseGateByIdEventPublisher;
    gotGateByIdEvent?: GotGateByIdEventPublisher;
    gotHistoryCloseActionEvent?: GotHistoryCloseActionEventPublisher;
    gotHistoryOpenActionEvent?: GotHistoryOpenActionEventPublisher;
    gotOpenGateByIdEvent?: GotOpenGateByIdEventPublisher;
    openedGateEvent?: OpenedGateEventPublisher;
    registeredCloseActionEvent?: RegisteredCloseActionEventPublisher;
    registeredOpenActionEvent?: RegisteredOpenedActionEventPublisher;
  }) {
    this.gateService = gateService;
    this.openGateService = openGateService;
    this.closeGateService = closeGateService;
    this.changedStateEmergencyEvent = changedStateEmergencyEvent;
    this.changedStateGateEvent = changedStateGateEvent;
    this.closedGateEvent = closedGateEvent;
    this.gotCloseGateByIdEvent = gotCloseGateByIdEvent;
    this.gotGateByIdEvent = gotGateByIdEvent;
    this.gotHistoryCloseActionEvent = gotHistoryCloseActionEvent;
    this.gotHistoryOpenActionEvent = gotHistoryOpenActionEvent;
    this.gotOpenGateByIdEvent = gotOpenGateByIdEvent;
    this.openedGateEvent = openedGateEvent;
    this.registeredCloseActionEvent = registeredCloseActionEvent;
    this.registeredOpenActionEvent = registeredOpenActionEvent;
  }

  openGates(gateId: string): Promise<GateDomainEntity> {
    return OpenGateHelper(gateId, this.gateService, this.openedGateEvent);
  }
  closeGates(gateId: string): Promise<GateDomainEntity> {
    return CloseGateHelper(gateId, this.gateService, this.closedGateEvent);
  }
  changeStateGate(gateId: string, value: boolean): Promise<GateDomainEntity> {
    return ChangeStateGateHelper(
      value,
      gateId,
      this.gateService,
      this.changedStateGateEvent,
    );
  }
  changeStateEmergency(value: boolean): Promise<GateDomainEntity> {
    return ChangeStateEmergencyHelper(
      value,
      this.gateService,
      this.changedStateEmergencyEvent,
    );
  }
  getGateById(value: string): Promise<GateDomainEntity> {
    throw new Error('Method not implemented.');
  }
  registerOpenAction(
    data: IOpenGateDomainEntity,
  ): Promise<IOpenGateDomainEntity> {
    throw new Error('Method not implemented.');
  }
  getHistoryOpenAction(): Promise<IOpenGateDomainEntity[]> {
    throw new Error('Method not implemented.');
  }
  getOpenGateById(value: string): Promise<IOpenGateDomainEntity> {
    throw new Error('Method not implemented.');
  }
  registerCloseAction(
    data: ICloseGateDomainEntity,
  ): Promise<ICloseGateDomainEntity> {
    throw new Error('Method not implemented.');
  }
  getHistoryCloseAction(): Promise<ICloseGateDomainEntity[]> {
    throw new Error('Method not implemented.');
  }
  getCloseGateById(value: string): Promise<ICloseGateDomainEntity> {
    throw new Error('Method not implemented.');
  }
}
