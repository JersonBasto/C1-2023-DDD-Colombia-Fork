import { EventPublisherBase } from 'src/shared/sofka/event-publisher.base';
import {
  CloseGateDomainEntity,
  GateDomainEntity,
  OpenGateDomainEntity,
} from '../entities';
import { Topic } from '../events';
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
import { RegisterGateHelper } from './helpers/register-gate/register-gate.helper';

export class GateAggregateRoot
  implements
    IGateDomainService,
    IOpenGateDomainService,
    ICloseGateDomainService
{
  private readonly gateService?: IGateDomainService;
  private readonly openGateService?: IOpenGateDomainService;
  private readonly closeGateService?: ICloseGateDomainService;
  private readonly events?: Map<Topic, EventPublisherBase<any>>;

  constructor({
    gateService,
    openGateService,
    closeGateService,
    events,
  }: {
    gateService?: IGateDomainService;
    openGateService?: IOpenGateDomainService;
    closeGateService?: ICloseGateDomainService;
    events?: Map<Topic, EventPublisherBase<any>>;
  }) {
    this.gateService = gateService;
    this.openGateService = openGateService;
    this.closeGateService = closeGateService;
    this.events = events ?? new Map<Topic, EventPublisherBase<any>>();
  }
  registerGate(entity: GateDomainEntity): Promise<GateDomainEntity> {
    return RegisterGateHelper(
      entity,
      this.gateService,
      this.events?.get(Topic.EmergenciesRegisteredGate),
    );
  }
  openGates(gateId: string): Promise<GateDomainEntity> {
    return OpenGateHelper(
      gateId,
      this.gateService,
      this.events?.get(Topic.EmergenciesOpenedGate),
    );
  }
  closeGates(gateId: string): Promise<GateDomainEntity> {
    return CloseGateHelper(
      gateId,
      this.gateService,
      this.events?.get(Topic.EmergenciesClosedGate),
    );
  }
  changeStateGate(gateId: string, value: boolean): Promise<boolean> {
    return ChangeStateGateHelper(
      value,
      gateId,
      this.gateService,
      this.events?.get(Topic.EmergenciesChangedStategate),
    );
  }
  changeStateEmergency(value: boolean): Promise<boolean> {
    return ChangeStateEmergencyHelper(
      value,
      this.gateService,
      this.events?.get(Topic.EmergenciesChangedStateEmergency),
    );
  }
  getGateById(gateId: string): Promise<GateDomainEntity> {
    return GetGateByIdHelper(
      gateId,
      this.gateService,
      this.events?.get(Topic.EmergenciesGotGotGateById),
    );
  }
  registerOpenAction(
    data: OpenGateDomainEntity,
  ): Promise<OpenGateDomainEntity> {
    return RegisterOpenActionHelper(
      data,
      this.openGateService,
      this.events?.get(Topic.EmergenciesRegisteredOpenAction),
    );
  }
  getHistoryOpenAction(): Promise<OpenGateDomainEntity[]> {
    return GetHistoryOpenActionHelper(
      this.openGateService,
      this.events?.get(Topic.EmergenciesGotHistoryOpenAction),
    );
  }
  getOpenGateById(gateId: string): Promise<OpenGateDomainEntity> {
    return GetOpenGateByIdHelper(
      gateId,
      this.openGateService,
      this.events?.get(Topic.EmergenciesGotOpenGateId),
    );
  }
  registerCloseAction(
    data: CloseGateDomainEntity,
  ): Promise<CloseGateDomainEntity> {
    return RegisterCloseActionHelper(
      data,
      this.closeGateService,
      this.events?.get(Topic.EmergenciesRegisteredCloseAction),
    );
  }
  getHistoryCloseAction(): Promise<CloseGateDomainEntity[]> {
    return GetHistoryCloseActionHelper(
      this.closeGateService,
      this.events?.get(Topic.EmergenciesGotHistoryCloseAction),
    );
  }
  getCloseGateById(gateId: string): Promise<CloseGateDomainEntity> {
    return GetCloseGateByIdHelper(
      gateId,
      this.closeGateService,
      this.events?.get(Topic.EmergenciesGotCloseGateById),
    );
  }
}
