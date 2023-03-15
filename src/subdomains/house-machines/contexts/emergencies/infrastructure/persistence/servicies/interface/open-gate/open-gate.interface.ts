export interface IOpenGateService<T> {
  registerOpenAction(item: T): Promise<T>;
  getHistoryOpenAction(): Promise<T[]>;
  GetOpenAction(id: string): Promise<T>;
}
