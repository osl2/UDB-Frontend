import LocalStorageController from "@/controller/LocalStorageController";
import UUIDGenerator from "@/api/mockData/UUIDGenerator";
import DataModel from "@/dataModel/DataModel";

export default class MockData<T extends DataModel> {
  private _localStorageController: LocalStorageController = new LocalStorageController();
  private readonly _dataMap!: Map<string, T>;
  private readonly _keyName!: string;

  constructor(name: string) {
    this._keyName = "MockData-" + name;
    const dataMapAsString: ReadonlyArray<readonly [string, T]> | undefined
      = this._localStorageController.get(this._keyName);
    if (dataMapAsString) {
      this._dataMap = new Map(dataMapAsString);
    }
    if (!this._dataMap) {
      this._dataMap = new Map<string, T>();
    }

  }

  get localStorageController(): LocalStorageController {
    return this._localStorageController;
  }

  get dataMap(): Map<string, T> {
    return this._dataMap;
  }

  public create(object: T) {
    object.id = UUIDGenerator.uuid();

    this.update(object);
  }

  public update(object: T) {
    this.dataMap.set(object.id, object);
    this.refresh();
  }

  public get(id: string): T {
    if (this.dataMap.has(id)) {
      return this.dataMap.get(id)!;
    } else {
      throw new Error("Id does not exist " + id);
    }
    this.refresh();
  }

  public getAll(): T[] {
    const result: T[] = [];
    this.dataMap.forEach((value, key) => {
      result.push(value);
    });
    return result;

  }

  public remove(id: string) {
    this.dataMap.delete(id);
    this.refresh();
  }

  protected refresh() {

    this.localStorageController.set(this._keyName, JSON.stringify(Array.from(this._dataMap)), false, true, true);
  }


}
