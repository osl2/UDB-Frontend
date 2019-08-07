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

    get content(): Uint8Array {
        return this._content;
    }

    set content(value: Uint8Array) {
        this._content = value;
    }

    public static fromJSON(json: any): Database {
        return new Database(json.id, json.name, json.database);
    }
    private _name: string;
    private _content: Uint8Array;

    /**
     * The constructor of this class.
     * @param id: The unique id of the database.
     * @param name: The name the teacher can set for the database.
     * @param content: The content of the database.
     */
    constructor(id: string, name: string, content: Uint8Array) {
        super(id);
        this._name = name;
        this._content = content;
    }

    public toJSON(): any {
        return {
            id: this.id,
            database: this.content,
            name: this.name,
        };
    }
}
