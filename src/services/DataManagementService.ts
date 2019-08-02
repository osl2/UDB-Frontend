import DataModel from '@/dataModel/DataModel';

export default interface DataManagementService<T extends DataModel> {
  all: T[];
  one?: T;
  create(object: T): void;
  remove(object: T): void;
  save(object: T): void;
  load(id: string): void;
  loadAll(): void;
}
