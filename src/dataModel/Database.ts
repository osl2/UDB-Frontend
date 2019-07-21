import DataModel from '@/dataModel/DataModel';

/**
 * The class Database represents a database which a teacher assigns to a
 * task so the students can work on it. The students each get a copy of the
 * database when they start working on the task.
 */

export class Database extends DataModel {
    private _id: string;
    private _name: string;
    private _content: any;

    /**
     * The constructor of this class.
     * @param id: The unique id of the database.
     * @param name: The name the teacher can set for the database.
     * @param content: The content of the database.
     */

    constructor(id: string, name: string, content: any) {
        super();
        this._id = id;
        this._name = name;
        this._content = content;
    }

    /**
     * The following methods are getter and setter for each attribute in this class.
     */

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get content(): any {
        return this._content;
    }

    set content(value: any) {
        this._content = value;
    }
}

export function DatabaseFromJSON(json: any): Database {
    return new Database(json['id'], json['name'], json['database']);
}

export function DatabaseToJSON(value?: Database): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'database': value.content,
        'id': value.id,
        'name': value.name,
    };
}

