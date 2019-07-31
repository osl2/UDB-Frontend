import DataModel from '@/dataModel/DataModel';

export default interface DataManagementService<T extends DataModel> {
  create(object: T): void;
  remove(object: T): void;
  save(object: T): void;
  get(id: string): T;
  getAll(): T[];
}
