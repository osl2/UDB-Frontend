import DataModel from '@/dataModel/DataModel';

export default interface DataManagementService<T extends DataModel> {
  create(object: T): Promise<string>;
  remove(object: T): void;
  save(object: T): void;
  get(id: string): T;
  getAll(): Promise<T[]>;
}
