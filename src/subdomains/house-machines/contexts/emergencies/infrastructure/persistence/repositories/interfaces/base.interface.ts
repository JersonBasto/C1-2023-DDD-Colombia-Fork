export interface IBase<T> {
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
}