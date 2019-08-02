import DataManagementService from '@/services/DataManagementService';
import Database from '@/dataModel/Database';
import ExportImport from '@/services/ExportImport';
import {
    CreateDatabaseRequest,
    DefaultApi,
    DeleteDatabaseRequest,
    UpdateDatabaseRequest,
} from "@/api/DefaultApi";

export default class DatabaseController implements DataManagementService<Database>, ExportImport<Database> {

    private _api: DefaultApi;
    private _databases: Database[];

    constructor(api: DefaultApi) {
        this._api = api;
        this._databases = [];
    }

    public loadAll(): void {
        this._api.getDatabases()
            .then((response: Database[]) => {
                this._databases = response;
            });
    }

    public load(id: string): void {
        throw new Error("Method not implemented.");
    }

    public create(database: Database): void {
        this._api.createDatabase({database} as CreateDatabaseRequest)
            .then((response: string) => {
                database.id = response;
                this._databases.push(database);
            })
            .catch((error) => {
                throw new Error("Error creating database: " + error);
            });
    }
    public save(object: Database): void {
        this._api.updateDatabase({database: object, databaseId: object.id} as UpdateDatabaseRequest)
            .then(() => {
                const index = this._databases.findIndex((database) => database.id === object.id);
                if (index > -1) {
                    this._databases[index] = object;
                }
            });
    }
    public remove(object: Database): void {
        this._api.deleteDatabase({databaseId: object.id} as DeleteDatabaseRequest)
          .then((response) => {
              const index = this._databases.indexOf(object, 0);
              if (index > -1) {
                  this._databases.splice(index, 1);
              }
          });
    }

    public exportObject(object: Database): Uint8Array {
        throw new Error("Method not implemented.");
    }
    public importObject(object: Uint8Array): Database {
        throw new Error("Method not implemented.");
    }

    get all(): Database[] {
        return this._databases;
    }

    get one(): Database | undefined {
        throw new Error("Method not implemented.");
    }
}
