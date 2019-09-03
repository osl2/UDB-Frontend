import UserGroup from '@/dataModel/UserGroup';

export default interface UserService {
    logout(): void;
    login(username: string, password: string): Promise<boolean>;
    register(username: string, password: string): Promise<void>;
    delete(username: string, password: string): void;
    changePassword(username: string, password: string, newPassword: string): void;
    getCurrentUserGroup(): UserGroup;
    switchUserGroup(group: UserGroup): void;
    availableUserGroups(): UserGroup[];
}
