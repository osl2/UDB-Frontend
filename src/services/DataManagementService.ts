import DataModel from '@/dataModel/DataModel';

/**
 * A DataManagementService implements the handling of DataModel objects.
 * This includes creating new objects, uploading them to the server,
 * loading existing objects from the server and accessing them.
 * 
 * @typeparam T The DataManagementService interface can be used with all DataModel types.
 */
export default interface DataManagementService<T extends DataModel> {
  /**
   * This property is an array of all DataModel objects currently stored within the service.
   */
  all: T[];
  /**
   * This property stores the currently used DataModel object, if one is in use at the moment.
   */
  one?: T;
  create(object: T): void;
  /**
   * This method removes the object passed to it from the local store of the service,
   * from [[one]] if it's the currently used object, and from the API if it exists on
   * the API.
   * 
   * @param object The object to remove.
   */
  remove(object: T): void;
  save(object: T): void;
  /**
   * Load a single object from the API and put it into [[one]] once the promise resolves.
   * @param id The UUID of the object to load.
   */
  load(id: string): void;
  /**
   * If logged in as a teacher, load all objects of this type that the user has access to,
   * and merge them with the locally available objects.
   */
  loadAll(): void;
}
