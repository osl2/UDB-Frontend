import UserService from '@/services/UserService';
import {CreateAccountRequest, DefaultApi} from "@/api/DefaultApi";
import {userState} from '@/globalData/UserState';
import UserGroup from "@/dataModel/UserGroup";
import User from "@/dataModel/User";
import ApiControllerAbstract from "@/controller/ApiControllerAbstract";

export default class UserController extends ApiControllerAbstract implements UserService {


    constructor(api: DefaultApi) {
        super(api);
    }

    public logout(): void {
        // reset user
        userState.user = new User('', '', '', '', UserGroup.Unauthenticated);
        this.api.setJWT(undefined);
    }
    public login(username: string, password: string) {
        this.api.setBasicAuth(username, password);
        this.api.login().then((response: string) => {
            this.api.setJWT(response);
            userState.user.token = response;
            userState.user.name = username;
            userState.user.userGroup = UserGroup.Teacher;
            userState.user.login(true);
        })
        .catch(() => {
            userState.user.login(false);
        });
    }
    public register(username: string, password: string) {
        const user = new User('', username, '', '', UserGroup.Teacher);
        this.api.createAccount({account: user} as CreateAccountRequest).then((_) => {
            userState.user = user;
        });
    }
    public delete(username: string, password: string) {
        this.api.setBasicAuth(username, password);
        this.api.deleteAccount().then(() => {
            userState.user = new User('', '', '', '', UserGroup.Unauthenticated);
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
