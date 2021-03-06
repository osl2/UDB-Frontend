import UserGroup from '@/dataModel/UserGroup';
import DataModel from '@/dataModel/DataModel';

/**
 * The class user stores information about the user. With information like the
 * user group for example restrictions can be made in the user interface.
 */

export default class User extends DataModel {
    private _name: string;
    private _password: string;
    private _token: string;
    private _userGroup: UserGroup;

    /**
     * The constructor of the class.
     * @param id
     * @param name: The username of the user.
     * @param password: The password of the user.
     * @param token: The JSON Web Token for authentication.
     * @param userGroup: The user group of the current user.
     */

    constructor(id: string, name: string, password: string, token: string, userGroup: UserGroup) {
        super(id);
        this._name = name;
        this._password = password;
        this._token = token;
        this._userGroup = userGroup;
    }

    /**
     * the following method transforms an instance of the user class to json fromat
     */
    public toJSON(): any {
        return {
            username: this.name,
            password: this.password,
        };
    }

    /**
     * The following methods are getter and setter for each attribute in this class.
     */

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
