//TODO import UserGroup from '@/dataModel/UserGroup';

/**
 *
 */

export default class User {
    private _id: String;
    private _name: String;
    private _password: String;
    private _salt: String;
    private _token: String;
    private _userGroup: any; //TODO USERGROUP ENUM hinzufügen

    /**
     *
     * @param id
     * @param name
     * @param password
     * @param salt
     * @param token
     * @param userGroup
     */

    constructor(id: String, name: String, password: String, salt: String, token: String, userGroup: any) {
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

    get id(): String {
        return this._id;
    }

    set id(value: String) {
        this._id = value;
    }

    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }

    get password(): String {
        return this._password;
    }

    set password(value: String) {
        this._password = value;
    }

    get salt(): String {
        return this._salt;
    }

    set salt(value: String) {
        this._salt = value;
    }

    get token(): String {
        return this._token;
    }

    set token(value: String) {
        this._token = value;
    }

    get userGroup(): any {
        return this._userGroup;
    }

    set userGroup(value: any) {
        this._userGroup = value;
    }
}