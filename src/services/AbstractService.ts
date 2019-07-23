import DataModel from '@/dataModel/DataModel';

abstract class AbstractService<T extends DataModel> {

  /**
   * Creates an instance at the backend t. The same object will be returned with
   * @param t
   */
  public abstract create(t: T): T;



}
