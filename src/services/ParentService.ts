import DataModel from '@/dataModel/DataModel';
import DataManagementService from './DataManagementService';

export default interface ParentService<T extends DataModel, U extends DataModel> extends DataManagementService<T> {
  getChildren(object: T): U[];
}
