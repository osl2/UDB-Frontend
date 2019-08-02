import DataManagementService from '@/services/DataManagementService';
import Database from '@/dataModel/Database';
import ExportImport from '@/services/ExportImport';
import {DefaultApi} from "@/api/DefaultApi";

export default class DatabaseController implements DataManagementService<Database>, ExportImport<Database> {

    private _api: DefaultApi;

    constructor(api: DefaultApi) {
        this._api = api;
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
        throw new Error("Method not implemented.");
    }
    public getAll(): Promise<Database[]> {
        throw new Error("Method not implemented.");
    }
    public exportObject(object: Database): Uint8Array {
        throw new Error("Method not implemented.");
    }
    public importObject(object: Uint8Array): Database {
        throw new Error("Method not implemented.");
    }
}
