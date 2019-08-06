import DataModel from '@/dataModel/DataModel';
import {exists} from "@/api/BaseApi";

/**
 * The class Course represents a workspace for a student in this application.
 * It holds the worksheets and solution sheets provided by a teacher.
 */
export default class Course extends DataModel {
    private _name: string;
    private _description: string;
    private _alias: string;
    private _worksheetIds: string[];

    /**
     * The constructor of this class.
     * @param id: UUID of this object.
     * @param name: The name ist the name the teacher sets for the Course.
     * @param description: The description is a description the teacher can set.
     * @param alias
     * @param worksheetIds: The worksheets which are assigned to the course.
     */

    constructor(id: string, name: string, description: string, alias: string, worksheetIds: string[]) {
        super(id);
        this._name = name;
        this._description = description;
        this._alias = alias;
        this._worksheetIds = worksheetIds;
    }

    public static fromJSON(json: any): Course {
        return new Course(json.id,
            json.name,
            !exists(json, 'description') ? undefined : json.description,
            "",
            json.worksheets);
    }

    public toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            worksheets: this.worksheetIds,
        };
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

    get description(): string {
      return this._description;
    }

    set description(value: string) {
      this._description = value;
    }

    get alias(): string {
        return this._alias;
    }

    set alias(value: string) {
        this._alias = value;
    }

    get worksheetIds(): string[] {
      return this._worksheetIds;
    }

    set worksheetIds(value: string[]) {
      this._worksheetIds = value;
    }
}

