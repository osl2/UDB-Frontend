import UserService from '@/services/UserService';
import {CreateAccountRequest, DefaultApi} from "@/api/DefaultApi";
import UserGroup from "@/dataModel/UserGroup";
import User from "@/dataModel/User";
import ApiControllerAbstract from "@/controller/ApiControllerAbstract";
import LocalStorageController from "@/controller/LocalStorageController";


export default class UserController extends ApiControllerAbstract implements UserService {
    private localStorageController = new LocalStorageController();

    constructor(api: DefaultApi) {
        super(api);
    }

    get userState(): User | undefined {
        const userFromStorage = this.localStorageController.get("userState");
        if (userFromStorage) {
            return Object.setPrototypeOf(userFromStorage, User.prototype);
        } else {
            return undefined;
        }

    }

    set userState(user: User | undefined) {
        this.localStorageController.set("userState", user, true);
    }


    public logout(): void {
        // reset user
        const user = new User('', '', '', '', UserGroup.Unauthenticated);
        this.userState = user;
        this.api.setJWT(undefined);
    }

    public login(username: string, password: string): Promise<boolean> {
        this.api.setBasicAuth(username, password);
        return this.api.login().then((response: { token: string }) => {
            this.api.setJWT(response.token);
            const user = new User('', username, '', response.token, UserGroup.Teacher);
            this.userState = user;
            return true;
        }).catch(() => {
            const user = new User('', '', '', '', UserGroup.Unauthenticated);
            this.userState = user;
            return false;
        });
    }

    public register(username: string, password: string): Promise<void> {
        const user = new User('', username, password, '', UserGroup.Teacher);
        return this.api.createAccount({account: user} as CreateAccountRequest).then((_) => {
            this.login(username, password);
        });
    }

    public delete(username: string, password: string) {
        this.api.setBasicAuth(username, password);
        this.api.deleteAccount().then(() => {
            this.userState = new User('', '', '', '', UserGroup.Unauthenticated);
        });
    }

    public changePassword(username: string, password: string, newPassword: string) {
        throw new Error("Method not implemented.");
    }

    public getCurrentUserGroup(): import("../dataModel/UserGroup").default {
        return this.userState!.userGroup;
    }

    public switchUserGroup(group: import("../dataModel/UserGroup").default): void {
        const user = this.userState;
        user!.userGroup = group;
        this.userState = user;
    }

    public availableUserGroups(): Array<import("../dataModel/UserGroup").default> {
        throw new Error("Method not implemented.");
    }
}
