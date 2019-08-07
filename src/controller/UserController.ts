import UserService from '@/services/UserService';
import {DefaultApi} from "@/api/DefaultApi";
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
        alert('TODO: Serverseitige Logout-Methode aufrufen');
    }
    public login(username: string, password: string) {
        throw new Error("Method not implemented.");
    }
    public register(username: string, password: string) {
        throw new Error("Method not implemented.");
    }
    public delete(username: string, password: string) {
        throw new Error("Method not implemented.");
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
