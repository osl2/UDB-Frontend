import DataModel from '@/dataModel/DataModel';
import Worksheet from '@/dataModel/Worksheet';

/**
 *
 */
export default class Course extends DataModel {
  private _id: string;
  private _name: string;
  private _description: string;
  private _worksheets: Worksheet[];

  /**
   *
   * @param id
   * @param name
   * @param description
   * @param worksheets
   */

  constructor(id: string, name: string, description: string, worksheets: Worksheet[]) {
    super();
    this._id = id;
    this._name = name;
    this._description = description;
    this._worksheets = worksheets;
  }

  /**
   *
   */

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get worksheets(): Worksheet[] {
    return this._worksheets;
  }

  set worksheets(value: Worksheet[]) {
    this._worksheets = value;
  }
}
