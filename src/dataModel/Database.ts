import DataModel from '@/dataModel/DataModel';
import {SqlJs} from 'sql.js/module';


/**
 * The class Database represents a database which a teacher assigns to a
 * task so the students can work on it. The students each get a copy of the
 * database when they start working on the task.
 */

export default class Database extends DataModel {

    /**
     * The following methods are getter and setter for each attribute in this class.
     */

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get content(): Uint8Array | null {
        return this._content;
    }

    set content(value: Uint8Array | null) {
        this._content = value;
    }

    public static fromJSON(json: any): Database {
        return new Database(json.id, json.name, Database.base64ToU8(json.database));
    }

    private static u8ToBase64(arr: Uint8Array | null): string {
        if (arr === null) {
            return "";
        }
        return btoa(String.fromCharCode.apply(null, Array.from(arr)));
    }

    private static base64ToU8(base64: string): Uint8Array {
        return new Uint8Array(atob(base64).split("").map((c) => {
            return c.charCodeAt(0); }));
    }
    private _name: string;
    private _content: Uint8Array | null;

    /**
     * The constructor of this class.
     * @param id: The unique id of the database.
     * @param name: The name the teacher can set for the database.
     * @param content: The content of the database.
     */
    constructor(id: string, name: string, content: Uint8Array | null) {
        super(id);
        this._name = name;
        this._content = content;
    }

    public toJSON(): any {
        return {
            id: this.id,
            database: Database.u8ToBase64(this.content),
            name: this.name,
        };
    }
}
