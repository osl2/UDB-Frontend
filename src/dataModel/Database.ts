import DataModel from '@/dataModel/DataModel';
import {SqlJs} from 'sql.js/module';

/**
 * The class Database represents a database which a teacher assigns to a
 * task so the students can work on it. The students each get a copy of the
 * database when they start working on the task.
 */

export default class Database extends DataModel {
    private _name: string;
    private _content: SqlJs.Database | null;

    /**
     * The constructor of this class.
     * @param name: The name the teacher can set for the database.
     * @param content: The content of the database.
     */

    constructor(id: string, name: string, content: SqlJs.Database| null) {
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

    get content(): SqlJs.Database | null {
        return this._content;
    }

    set content(value: SqlJs.Database | null) {
        this._content = value;
    }
}
