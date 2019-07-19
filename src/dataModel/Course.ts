import DataModel from '@/dataModel/DataModel';
import Worksheet from '@/dataModel/Worksheet';

/**
 * The class Course represents a workspace for a student in this application.
 * It holds the worksheets and solution sheets provided by a teacher.
 */
export default class Course extends DataModel {
    private _id: string;
    private _name: string;
    private _description: string;
    private _worksheets: Worksheet[];

    /**
     * The constructor of this class.
     * @param id: The id is the unique id of the class.
     * @param name: The name ist the name the teacher sets for the Course.
     * @param description: The description is a description the teacher can set.
     * @param worksheets: The worksheets which are assigned to the course.
     */

    constructor(id: string, name: string, description: string, worksheets: Worksheet[]) {
        super();
        this._id = id;
        this._name = name;
        this._description = description;
        this._worksheets = worksheets;
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

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get worksheets(): Worksheet[] {
        return this._worksheets;
    }

    set worksheets(value: Worksheet[]) {
        this._worksheets = value;
    }
}
