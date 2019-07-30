import DataModel from '@/dataModel/DataModel';
import Worksheet from '@/dataModel/Worksheet';
import {exists} from "@/api/BaseApi";

/**
 * The class Course represents a workspace for a student in this application.
 * It holds the worksheets and solution sheets provided by a teacher.
 */
export default class Course extends DataModel {
  private _name: string;
  private _description: string;
  private _worksheet_ids: string[];

  /**
   * The constructor of this class.
   * @param name: The name ist the name the teacher sets for the Course.
   * @param description: The description is a description the teacher can set.
   * @param worksheet_ids: The worksheets which are assigned to the course.
   */

  constructor(id: string, name: string, description: string, worksheet_ids: string[]) {
    super(id);
    this._name = name;
    this._description = description;
    this._worksheet_ids = worksheet_ids;
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

  get worksheet_ids(): string[] {
    return this._worksheet_ids;
  }

  set worksheet_ids(value: string[]) {
    this._worksheet_ids = value;
  }
}
export function CourseFromJSON(json: any): Course {
    return new Course(json['id'],
        json['name'],
        !exists(json, 'description') ? undefined : json['description'],
        json['worksheets']);
}

export function CourseToJSON(value?: Course): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'id': value.id,
        'name': value.name,
        'description': value.description,
        'worksheets': value.worksheet_ids,
    };
}