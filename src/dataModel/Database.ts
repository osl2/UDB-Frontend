import DataModel from '@/dataModel/DataModel';

/**
 *
 */

export default class Database extends DataModel{
    private _id: String;
    private _name: String;
    private _content: any;

    /**
     *
     * @param id
     * @param name
     * @param content
     */

    constructor(id: String, name: String, content: any) {
        super();
        this._id = id;
        this._name = name;
        this._content = content;
    }

    /**
     *
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