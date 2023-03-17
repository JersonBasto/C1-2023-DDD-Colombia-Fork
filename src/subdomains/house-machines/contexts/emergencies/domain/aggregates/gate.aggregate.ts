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

/**
 *
 * Se crea el agregado Root, el cual contiene todas las acciones a tomar
 * dentro del contexto
 *
 * @export GateAggregateRoot
 * @class GateAggregateRoot
 * @implements {IGateDomainService} Servicio Gate
 * @implements {IOpenGateDomainService} Servicio OpenGateDomain
 * @implements {ICloseGateDomainService} Servicio CloseGateDomain
 */
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

  /**
   *
   * Es la accion encargada de registrar una compuerta
   *
   * @param {GateDomainEntity} entity
   * @return {Promise<GateDomainEntity>}
   * @memberof GateAggregateRoot
   */
  registerGate(entity: GateDomainEntity): Promise<GateDomainEntity> {
    return RegisterGateHelper(
      entity,
      this.gateService,
      this.events?.get(Topic.EmergenciesRegisteredGate),
    );
  }

  /**
   *
   * Es la accion encargada de abrir una compuerta a traves del ID
   *
   * @param {string} gateId
   * @return {Promise<GateDomainEntity>}
   * @memberof GateAggregateRoot
   */
  openGates(gateId: string): Promise<GateDomainEntity> {
    return OpenGateHelper(
      gateId,
      this.gateService,
      this.events?.get(Topic.EmergenciesOpenedGate),
    );
  }

  /**
   *
   * Es la accion encargada de cerrar una compuerta a traves del ID
   *
   * @param {string} gateId
   * @return  {Promise<GateDomainEntity>}
   * @memberof GateAggregateRoot
   */
  closeGates(gateId: string): Promise<GateDomainEntity> {
    return CloseGateHelper(
      gateId,
      this.gateService,
      this.events?.get(Topic.EmergenciesClosedGate),
    );
  }

  /**
   *
   * Es la accion encargada de cambiar el estado de la compuerta
   *
   * @param {string} gateId
   * @param {boolean} value
   * @return {Promise<boolean>}
   * @memberof GateAggregateRoot
   */
  changeStateGate(gateId: string, value: boolean): Promise<boolean> {
    return ChangeStateGateHelper(
      value,
      gateId,
      this.gateService,
      this.events?.get(Topic.EmergenciesChangedStategate),
    );
  }

  /**
   *
   * Es la accion encargada de cambiar el estado de Emergencia
   *
   * @param {string} gateId
   * @param {boolean} value
   * @return {Promise<boolean>}
   * @memberof GateAggregateRoot
   */
  changeStateEmergency(gateId: string, value: boolean): Promise<boolean> {
    return ChangeStateEmergencyHelper(
      value,
      gateId,
      this.gateService,
      this.events?.get(Topic.EmergenciesChangedStateEmergency),
    );
  }

  /**
   *
   * Es la accion encargada de obtener un item de Gate a traves del ID
   *
   * @param {string} gateId
   * @return {Promise<GateDomainEntity>}
   * @memberof GateAggregateRoot
   */
  getGateById(gateId: string): Promise<GateDomainEntity> {
    return GetGateByIdHelper(
      gateId,
      this.gateService,
      this.events?.get(Topic.EmergenciesGotGotGateById),
    );
  }

  /**
   *
   * Es la accion encargada de registrar la accion de abrir compuerta
   *
   * @param {OpenGateDomainEntity} data
   * @return {Promise<OpenGateDomainEntity>}
   * @memberof GateAggregateRoot
   */
  registerOpenAction(
    data: OpenGateDomainEntity,
  ): Promise<OpenGateDomainEntity> {
    return RegisterOpenActionHelper(
      data,
      this.openGateService,
      this.events?.get(Topic.EmergenciesRegisteredOpenAction),
    );
  }

  /**
   *
   * Es la accion encargada de obtener todos los registros de
   * la accion de abrir compuerta
   *
   * @return {Promise<OpenGateDomainEntity[]>}
   * @memberof GateAggregateRoot
   */
  getHistoryOpenAction(): Promise<OpenGateDomainEntity[]> {
    return GetHistoryOpenActionHelper(
      this.openGateService,
      this.events?.get(Topic.EmergenciesGotHistoryOpenAction),
    );
  }

  /**
   *
   * Es la accion encargada de obtener un registro de abrir compuerta
   * a traves del ID
   *
   * @param {string} gateId
   * @return {Promise<OpenGateDomainEntity>}
   * @memberof GateAggregateRoot
   */
  getOpenGateById(gateId: string): Promise<OpenGateDomainEntity> {
    return GetOpenGateByIdHelper(
      gateId,
      this.openGateService,
      this.events?.get(Topic.EmergenciesGotOpenGateId),
    );
  }

  /**
   *
   * Es la accion encargada de registrar la accion de cerrar compuerta
   *
   * @param {CloseGateDomainEntity} data
   * @return {Promise<CloseGateDomainEntity>}
   * @memberof GateAggregateRoot
   */
  registerCloseAction(
    data: CloseGateDomainEntity,
  ): Promise<CloseGateDomainEntity> {
    return RegisterCloseActionHelper(
      data,
      this.closeGateService,
      this.events?.get(Topic.EmergenciesRegisteredCloseAction),
    );
  }

  /**
   *
   * Es la accion encargada de obtener todos los registro de cerrar compuerta
   *
   * @return {Promise<CloseGateDomainEntity[]>}
   * @memberof GateAggregateRoot
   */
  getHistoryCloseAction(): Promise<CloseGateDomainEntity[]> {
    return GetHistoryCloseActionHelper(
      this.closeGateService,
      this.events?.get(Topic.EmergenciesGotHistoryCloseAction),
    );
  }

  /**
   *
   * Es la accion encargada de obtener un registro de cerrar compuerta a traves del ID
   *
   * @param {string} gateId
   * @return {Promise<CloseGateDomainEntity>}
   * @memberof GateAggregateRoot
   */
  getCloseGateById(gateId: string): Promise<CloseGateDomainEntity> {
    return GetCloseGateByIdHelper(
      gateId,
      this.closeGateService,
      this.events?.get(Topic.EmergenciesGotCloseGateById),
    );
  }
}
