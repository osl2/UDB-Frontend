import DataManagementService from '@/services/DataManagementService';
import Database from '@/dataModel/Database';
import ExportImport from '@/services/ExportImport';
import {DefaultApi} from "@/api/DefaultApi";

export default class DatabaseController implements DataManagementService<Database>, ExportImport<Database> {

    private _api: DefaultApi;
    private _databases: Database[];

    constructor(api: DefaultApi) {
        this._api = api;
        this._databases = [];
        this._api.getDatabases()
            .then((response: Database[]) => {
                this._databases = response;
            })
    }

    public create(): Database {
        throw new Error("Method not implemented.");
    }
    public remove(object: Database): void {
        throw new Error("Method not implemented.");
    }
    public save(object: Database): void {
        throw new Error("Method not implemented.");
    }
    public get(id: string): Database {
        const foundDatabase = this._databases.find((database) => database.id === id);
        if (foundDatabase === undefined) {
            throw new Error("Course not found");
        }
        return foundDatabase;
    }
    public getAll(): Database[] {
        return this._databases;
    }
    public exportObject(object: Database): Uint8Array {
        throw new Error("Method not implemented.");
    }
    public importObject(object: Uint8Array): Database {
        throw new Error("Method not implemented.");
    }
}
