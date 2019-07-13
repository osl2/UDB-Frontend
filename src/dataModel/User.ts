import UserGroup from '@/dataModel/UserGroup';

/**
 * The class user stores information about the user. With information like the
 * user group for example restrictions can be made in the user interface.
 */

export default class User {
    private _id: String;
    private _name: String;
    private _password: String;
    private _salt: String;
    private _token: String;
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

    constructor(id: String, name: String, password: String, salt: String, token: String, userGroup: UserGroup) {
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

    get userGroup(): UserGroup {
        return this._userGroup;
    }

    set userGroup(value: UserGroup) {
        this._userGroup = value;
    }
}