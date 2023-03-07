import { GateDomainEntity } from '../entities/gate.domain-entity';
import { IOpenGateDomainEntity } from '../entities/interfaces/open-gate.domain-entity.interface';
import { ICloseGateDomainEntity } from '../entities/interfaces/close-gate.domain-entity.interface';
import { ICloseGateDomainService } from '../services/close-gate.domain-service';
import { IGateDomainService } from '../services/gate.domain-service';
import { IOpenGateDomainService } from '../services/open-gate.domain-service';

export class GateAggregateRoot
  implements
    IGateDomainService,
    IOpenGateDomainService,
    ICloseGateDomainService
{
  private readonly gateService?: IGateDomainService;
  private readonly openGateService?: IOpenGateDomainService;
  private readonly closeGateService?: ICloseGateDomainService;

  constructor({
    gateService,
    openGateService,
    closeGateService,
  }: {
    gateService?: IGateDomainService;
    openGateService?: IOpenGateDomainService;
    closeGateService?: ICloseGateDomainService;
  }) {
    this.gateService = gateService;
    this.openGateService = openGateService;
    this.closeGateService = closeGateService;
  }
  openGates(gateId: string): Promise<GateDomainEntity> {
    throw new Error('Method not implemented.');
  }
  closeGates(gateId: string): Promise<GateDomainEntity> {
    throw new Error('Method not implemented.');
  }
  changeStateGate(value: boolean): Promise<GateDomainEntity> {
    throw new Error('Method not implemented.');
  }
  changeStateEmergency(value: boolean): Promise<GateDomainEntity> {
    throw new Error('Method not implemented.');
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
