export default interface LocalStorageService {
    set(key: string, object: any, sessionOnly: boolean): void;

    get<T>(key: string): T | undefined;
}
