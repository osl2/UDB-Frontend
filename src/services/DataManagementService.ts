import DataModel from '@/dataModel/DataModel';

/**
 * A DataManagementService implements the handling of DataModel objects.
 * This includes creating new objects, uploading them to the server,
 * loading existing objects from the server and accessing them.
 *
 * @typeparam T The DataManagementService interface can be used with all DataModel types.
 */
export default interface DataManagementService<T extends DataModel> {
  create(object: T): Promise<string>;
  /**
   * This method removes the object passed to it from the local store of the service,
   * from [[one]] if it's the currently used object, and from the API if it exists on
   * the API.
   *
   * @param object The object to remove.
   */
  remove(object: T): Promise<void>;
  save(object: T): Promise<void>;
  /**
   * If logged in as a teacher, load all objects of this type that the user has access to,
   * and merge them with the locally available objects.
   */
  getAll(): Promise<T[]>;

  /**
   * Return an already loaded object with given id.
   * @param id
   */
  get(id: string): Promise<T>;
}
