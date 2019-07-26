import UserService from '@/services/UserService';

export default class UserController implements UserService {
    public logout(): void {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    public switchUserGroup(group: import("../dataModel/UserGroup").default): boolean {
        throw new Error("Method not implemented.");
    }
    public availableUserGroups(): Array<import("../dataModel/UserGroup").default> {
        throw new Error("Method not implemented.");
    }
}
