import DataModel from '@/dataModel/DataModel';
import Worksheet from '@/dataModel/Worksheet';

/**
 *
 */
export default class Course extends DataModel{
    private _id: String;
    private _name: String;
    private _description: String;
    private _worksheets: Worksheet[];

    /**
     *
     * @param id
     * @param name
     * @param description
     * @param worksheets
     */

    constructor(id: String, name: String, description: String, worksheets: Worksheet[]) {
        super();
        this._id = id;
        this._name = name;
        this._description = description;
        this._worksheets = worksheets;
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

    get description(): String {
        return this._description;
    }

    set description(value: String) {
        this._description = value;
    }

    get worksheets(): Worksheet[] {
        return this._worksheets;
    }

    set worksheets(value: Worksheet[]) {
        this._worksheets = value;
    }
}