export interface IGateService<T> {
  registerGate(entity: T): Promise<T>;
  openGate(gateId: string): Promise<T>;
  closeGates(gateId: string): Promise<T>;
  changeStateGate(gateId: string, value: boolean): Promise<boolean>;
  changeStateEmergency(gateId: string, value: boolean): Promise<boolean>;
  getGateById(gateId: string): Promise<T>;
}
