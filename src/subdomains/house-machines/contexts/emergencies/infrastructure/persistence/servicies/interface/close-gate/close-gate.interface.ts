export interface ICloseGateService<T> {
  registerCloseAction(item: T): Promise<T>;
  getHistoryCloseAction(): Promise<T[]>;
  GetCloseAction(id: string): Promise<T>;
}
