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


    constructor(api: DefaultApi) {
        super(api);
    }

    /**
     * Load all available databases for the authenticated user
     */
    public getAll(): Promise<Database[]> {
        return this.api.getDatabases();
    }

    /**
     * Load a database with a given id
     *
     * @param id
     */
    public get(id: string): Promise<Database> {
        return this.api.getDatabase({databaseId: id} as GetDatabaseRequest);
    }

    /**
     * Create a new database, add to databases if API call is successful
     *
     * @param database
     */
    public create(database: Database): Promise<string> {
        return this.api.createDatabase({database} as CreateDatabaseRequest)
            .then((response: string) => {
                database.id = response;
                return database.id;
            })
    }

    public save(object: Database): Promise<void> {
        return this.api.updateDatabase({database: object, databaseId: object.id} as UpdateDatabaseRequest);
    }

    public remove(object: Database): Promise<void> {
        return this.api.deleteDatabase({databaseId: object.id} as DeleteDatabaseRequest);
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
