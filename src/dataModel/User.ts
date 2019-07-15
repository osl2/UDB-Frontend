import UserGroup from '@/dataModel/UserGroup';

/**
 * The class user stores information about the user. With information like the
 * user group for example restrictions can be made in the user interface.
 */

export default class User {
    private _id: string;
    private _name: string;
    private _password: string;
    private _salt: string;
    private _token: string;
    private _userGroup: UserGroup;

    /**
     * The constructor of the class.
     * @param id: The unique id of the user.
     * @param name: The username of the user.
     * @param password: The password of the user. //TODO in Client speichern??
     * @param salt: The salt for the password hash. //TODO getter entfernen?
     * @param token: The JSON Web Token for authentication.
     * @param userGroup: The user group of the current user.
     */

    constructor(id: string, name: string, password: string, salt: string, token: string, userGroup: UserGroup) {
        this._id = id;
        this._name = name;
        this._password = password;
        this._salt = salt;
        this._token = token;
        this._userGroup = userGroup;
    }

    /**
     * The following methods are getter and setter for each attribute in this class.
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

    get userGroup(): UserGroup {
        return this._userGroup;
    }

    set userGroup(value: UserGroup) {
        this._userGroup = value;
    }
}
