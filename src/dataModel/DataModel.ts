/**
 * The class DataModel represents the abstract parent class data classes in the data model.
 * The class is going to be referenced in generic classes so the implementation is more independent.
 */

export default abstract class DataModel {
  private _id!: string;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

}
