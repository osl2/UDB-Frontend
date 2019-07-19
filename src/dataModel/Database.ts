import DataModel from '@/dataModel/DataModel';

/**
 *
 */

export default class Database extends DataModel {
  private _id: string;
  private _name: string;
  private _content: any;

  /**
   *
   * @param id
   * @param name
   * @param content
   */

  constructor(id: string, name: string, content: any) {
    super();
    this._id = id;
    this._name = name;
    this._content = content;
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

  get content(): any {
    return this._content;
  }

  set content(value: any) {
    this._content = value;
  }
}
