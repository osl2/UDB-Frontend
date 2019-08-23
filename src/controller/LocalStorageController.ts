import LocalStorageService from '@/services/LocalStorageService';

export default class LocalStorageController implements LocalStorageService {
    /**
     * Get an object from browser's local storage. The key is searched first in sessionStorage, then localStorage.
     * @param key the key value of the item in the storage
     * @return a value if key exists otherwise undefined
     */
    public get<T>(key: string): T | undefined {
        let item = window.localStorage.getItem(key);
        if (!item) {
            item = window.sessionStorage.getItem(key);
        }
        if (!item) {
            return undefined;
        } else {
            return JSON.parse(item) as T;
        }
    }

    /**
     * Stores an object to the browser local storage with the given key. The object can be either string
     * or any object which will be converted to JSON format.
     * @param key the key of the object, which can be used later to access this object
     * @param object the object to be saved
     * @param sessionOnly if true the object in the local storage will be available only during session
     * (until browser is closed)
     * @param ignoreToJson if true the implemented method toJSON() will not be used to convert to string
     * @param isObjectString set true if object is already a string and JSON.stringify will be skipped
     */
    public set(
        key: string,
        object: string | any,
        sessionOnly: boolean = false,
        ignoreToJson?: boolean,
        isObjectString?: boolean
    ): void {
        let value: string;
        if (isObjectString) {
            value = object;
        } else {
            const clone = Object.assign({}, object);
            if (ignoreToJson) {
                clone.toJSON = undefined;
            }
            value = JSON.stringify(clone);
        }
        if (sessionOnly) {
            window.sessionStorage.setItem(key, value);
        } else {
            window.localStorage.setItem(key, value);
        }
    }
}
