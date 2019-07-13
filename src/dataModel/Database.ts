import DataModel from '@/dataModel/DataModel';

/**
 * The class Database represents a database which a teacher assigns to a
 * task so the students can work on it. The students each get a copy of the
 * database when they start working on the task.
 */

export default class Database extends DataModel{
    private _id: String;
    private _name: String;
    private _content: any;

    /**
     * The constructor of this class.
     * @param id: The unique id of the database.
     * @param name: The name the teacher can set for the database.
     * @param content: The content of the database.
     */

    constructor(id: String, name: String, content: any) {
        super();
        this._id = id;
        this._name = name;
        this._content = content;
    }

    /**
     * The following methods are getter and setter for each attribute in this class.
     */

    get id(): String {
        return this._id;
    }

    set id(value: String) {
        this._id = value;
    }

    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }

    get content(): any {
        return this._content;
    }

    set content(value: any) {
        this._content = value;
    }
}