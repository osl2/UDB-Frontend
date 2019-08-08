import UserService from '@/services/UserService';
import {CreateAccountRequest, DefaultApi} from "@/api/DefaultApi";
import {userState} from '@/globalData/UserState';
import UserGroup from "@/dataModel/UserGroup";
import User from "@/dataModel/User";

export default class UserController implements UserService {

    private _api: DefaultApi;

    constructor(api: DefaultApi) {
        this._api = api;
    }

    public logout(): void {
        // reset user
        userState.user = new User('', '', '', '', '', UserGroup.Unauthenticated);
        this._api.setJWT(undefined);
    }
    public login(username: string, password: string) {
        this._api.setBasicAuth(username, password);
        this._api.login().then((response: string) => {
            this._api.setJWT(response);
            userState.user.token = response;
            userState.user.name = username;
            userState.user.userGroup = UserGroup.Teacher;
        });
    }
    public register(username: string, password: string) {
        let user = new User('', username, '', '', '', UserGroup.Teacher);
        this._api.createAccount({account: user} as CreateAccountRequest).then((_) => {
            userState.user = user;
        });
    }
    public delete(username: string, password: string) {
        this._api.setBasicAuth(username, password);
        this._api.deleteAccount().then(() => {
            userState.user = new User('', '', '', '', '', UserGroup.Unauthenticated);
        });
    }
    public changePassword(username: string, password: string, newPassword: string) {
        throw new Error("Method not implemented.");
    }
    public getCurrentUserGroup(): import("../dataModel/UserGroup").default {
        return userState.user.userGroup;
    }
    public switchUserGroup(group: import("../dataModel/UserGroup").default): boolean {
        userState.user.userGroup = group;
        alert('return void (UserController.switchUserGroup())?');
        return true;
    }
    public availableUserGroups(): Array<import("../dataModel/UserGroup").default> {
        throw new Error("Method not implemented.");
    }
}
