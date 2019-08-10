import DataManagementService from '@/services/DataManagementService';
import Database from '@/dataModel/Database';
import ExportImport from '@/services/ExportImport';
import {
    CreateDatabaseRequest,
    DefaultApi,
    DeleteDatabaseRequest,
    GetDatabaseRequest,
    UpdateDatabaseRequest,
} from "@/api/DefaultApi";
import ApiControllerAbstract from "@/controller/ApiControllerAbstract";

export default class DatabaseController extends ApiControllerAbstract
  implements DataManagementService<Database>, ExportImport<Database> {

    private _databases: Database[] = [];
    private _database?: Database = undefined;

    constructor(api: DefaultApi) {
        super(api);
    }

    /**
     * Load all available databases for the authenticated user
     */
    public loadAll(): void {
        this.api.getDatabases()
            .then((response: Database[]) => {
                this._databases = response;
            });
    }

    /**
     * Load a database with a given id
     *
     * @param id
     */
    public load(id: string): void {
        this._database = this._databases.find((database) => database.id === id);
        if (this._database === undefined) {
            this.api.getDatabase({databaseId: id} as GetDatabaseRequest)
                .then((response: Database) => {
                    this._database = response;
                });
        }
    }

    /**
     * Create a new database, add to databases if API call is successful
     *
     * @param database
     */
    public create(database: Database): void {
        this.api.createDatabase({database} as CreateDatabaseRequest)
            .then((response: string) => {
                database.id = response;
                this._databases.push(database);
            })
            .catch((error) => {
                throw new Error("Error creating database: " + error);
            });
    }

    public save(object: Database): void {
        this.api.updateDatabase({database: object, databaseId: object.id} as UpdateDatabaseRequest)
            .then(() => {
                const index = this._databases.findIndex((database) => database.id === object.id);
                if (index > -1) {
                    this._databases[index] = object;
                }
            });
    }

    public remove(object: Database): void {
        this.api.deleteDatabase({databaseId: object.id} as DeleteDatabaseRequest)
            .then((response) => {
                const index = this._databases.indexOf(object, 0);
                if (index > -1) {
                    this._databases.splice(index, 1);
                }
            });
    }

    /**
     * If this method is executed from the browser, then a file is downloaded.
     * This appends an <a> link element on body and then clicks it.
     * The href of this link holds the blob of the database.
     * After the click happened the element is removed again.
     * The name of the file is the same as [[database.name]] with the extension .db
     * @param database internal database object
     */
    public exportObject(object: Database): void {
        const blob = new Blob([object.content!]);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = window.URL.createObjectURL(blob);
        a.download = object.name + '.db';
        a.onclick = () => {
            setTimeout(() => {
                window.URL.revokeObjectURL(a.href);
            }, 1500);
        };
        a.click();
        // ensure that the link is again removed since it wont be needed any more
        a.parentNode!.removeChild(a);
    }

    /**
     * Imports an database object and returns an internal database object
     */
    public importObject(file: File): Promise<Database> {
        const fileReader = new FileReader();

        const promise: Promise<Database> = new Promise((resolve, reject) => {
            fileReader.onerror = () => {
                fileReader.abort();
                reject(new DOMException('Problem parsing input file.'));
            };

            fileReader.onload = () => {
                const byteArrayContent = new Uint8Array(fileReader.result as ArrayBuffer);
                const db = new Database('', file.name, byteArrayContent);
                resolve(db);
            };
            fileReader.readAsArrayBuffer(file);
        });
        return promise;
    }

    /**
     * Getter for all loaded databases.
     */
    get all(): Database[] {
        return this._databases;
    }

    /**
     * Getter for single loaded database.
     */
    get one(): Database | undefined {
        return this._database;
    }

    /**
     * This creates an database object with content is empty (no tables).
     * This method is just used on the client side, there is no communication with the API.
     * @param name the name of the database
     */
    public createEmptyDatabase(name: string): Promise<Database> {
        const db = new Uint8Array();
        const dbIntern = new Database('', name, db);
        return Promise.resolve(dbIntern);
    }
}
