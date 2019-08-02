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
        this._api.getDatabases()
          .then((response: Database[]) => {
              this._databases = response;
          });

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
    public remove(object: Database): void {
        this._api.deleteDatabase({databaseId: object.id} as DeleteDatabaseRequest)
          .then((response) => {
              const index = this._databases.indexOf(object, 0);
              if (index > -1) {
                  this._databases.splice(index, 1);
              }
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
    public get(id: string): Database {
        const tempDatabase = this._databases.find((database) => database.id === id);
        if (tempDatabase === undefined) {
            throw new Error("Database not found");
        }
        return tempDatabase;
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
