import UserGroup from '@/dataModel/UserGroup';

export default interface UserService {
    logout(): void;
    login(username: string, password: string): any; // TODO: Figure out type + behaviour for this
    register(username: string, password: string): any; // TODO: Same here
    delete(username: string, password: string): any; // TODO: Same here
    changePassword(username: string, password: string, newPassword: string): any; // TODO: Same here
    getCurrentUserGroup(): UserGroup;
    switchUserGroup(group: UserGroup): boolean;
    availableUserGroups(): UserGroup[];
}
