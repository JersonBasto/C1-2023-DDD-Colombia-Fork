import {
  CloseGateDomainEntity,
  GateDomainEntity,
  OpenGateDomainEntity,
} from '../entities';
import {
  ChangedStateEmergencyEventPusblisher,
  ChangedStateGateEventPublisher,
  ClosedGateEventPublisher,
  GotCloseGateByIdEventPublisher,
  GotGateByIdEventPublisher,
  GotHistoryCloseActionEventPublisher,
  GotHistoryOpenActionEventPublisher,
  GotOpenGateByIdEventPublisher,
  OpenedGateEventPublisher,
  RegisteredCloseActionEventPublisher,
  RegisteredOpenedActionEventPublisher,
} from '../events/publishers';
import {
  ICloseGateDomainService,
  IGateDomainService,
  IOpenGateDomainService,
} from '../services';
import {
  ChangeStateEmergencyHelper,
  ChangeStateGateHelper,
  CloseGateHelper,
  GetCloseGateByIdHelper,
  GetGateByIdHelper,
  GetHistoryCloseActionHelper,
  GetHistoryOpenActionHelper,
  GetOpenGateByIdHelper,
  OpenGateHelper,
  RegisterCloseActionHelper,
  RegisterOpenActionHelper,
} from './helpers';

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
  getGateById(gateId: string): Promise<GateDomainEntity> {
    return GetGateByIdHelper(gateId, this.gateService, this.gotGateByIdEvent);
  }
  registerOpenAction(
    data: OpenGateDomainEntity,
  ): Promise<OpenGateDomainEntity> {
    return RegisterOpenActionHelper(
      data,
      this.openGateService,
      this.registeredOpenActionEvent,
    );
  }
  getHistoryOpenAction(): Promise<OpenGateDomainEntity[]> {
    return GetHistoryOpenActionHelper(
      this.openGateService,
      this.gotHistoryOpenActionEvent,
    );
  }
  getOpenGateById(gateId: string): Promise<OpenGateDomainEntity> {
    return GetOpenGateByIdHelper(
      gateId,
      this.openGateService,
      this.gotOpenGateByIdEvent,
    );
  }
  registerCloseAction(
    data: CloseGateDomainEntity,
  ): Promise<CloseGateDomainEntity> {
    return RegisterCloseActionHelper(
      data,
      this.closeGateService,
      this.registeredCloseActionEvent,
    );
  }
  getHistoryCloseAction(): Promise<CloseGateDomainEntity[]> {
    return GetHistoryCloseActionHelper(
      this.closeGateService,
      this.gotHistoryCloseActionEvent,
    );
  }
  getCloseGateById(gateId: string): Promise<CloseGateDomainEntity> {
    return GetCloseGateByIdHelper(
      gateId,
      this.closeGateService,
      this.gotCloseGateByIdEvent,
    );
  }
}
