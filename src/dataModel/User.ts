// TODO import UserGroup from '@/dataModel/UserGroup';

/**
 *
 */

export default class User {
  private _id: string;
  private _name: string;
  private _password: string;
  private _salt: string;
  private _token: string;
  private _userGroup: any; // TODO USERGROUP ENUM hinzufügen

  /**
   *
   * @param id
   * @param name
   * @param password
   * @param salt
   * @param token
   * @param userGroup
   */

  constructor(id: string, name: string, password: string, salt: string, token: string, userGroup: any) {
    this._id = id;
    this._name = name;
    this._password = password;
    this._salt = salt;
    this._token = token;
    this._userGroup = userGroup;
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

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get salt(): string {
    return this._salt;
  }

  set salt(value: string) {
    this._salt = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get userGroup(): any {
    return this._userGroup;
  }

  set userGroup(value: any) {
    this._userGroup = value;
  }
}
