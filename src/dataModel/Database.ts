import DataModel from '@/dataModel/DataModel';


/**
 * The class Database represents a database which a teacher assigns to a
 * task so the students can work on it. The students each get a copy of the
 * database when they start working on the task.
 */

export default class Database extends DataModel {

    public static fromJSON(json: any): Database {
        if (typeof json.database === 'undefined') {
            return new Database(json.id, json.name, null);
        }
        return new Database(json.id, json.name, Database.base64ToU8(json.database));
    }

    private static u8ToBase64(arr: Uint8Array | null) {
        if (!arr) {
            return "";
        }
        const CHUNK_SZ = 0x8000;
        const c = [];
        // To avoid Character Out Of Range
        // tslint:disable-next-line
        // See https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
        for (let i = 0; i < arr.length; i += CHUNK_SZ) {
            c.push(String.fromCharCode.apply(null, Array.from(arr.subarray(i, i + CHUNK_SZ))));
        }
        return btoa(c.join(""));
    }

    private static base64ToU8(base64: string): Uint8Array {
        return new Uint8Array(atob(base64).split("").map((c) => {
            return c.charCodeAt(0);
        }));
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


    public toJSON(): any {
        return {
            id: this.id,
            database: Database.u8ToBase64(this.content),
            name: this.name,
        };
    }


}
