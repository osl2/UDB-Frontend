import DataModel from '@/dataModel/DataModel';
import {exists} from "@/api/BaseApi";

/**
 * The class Worksheet represents a worksheet provided by a teacher.
 * Students can solve the worksheet in the matching course.
 */

export default class Worksheet extends DataModel {
    private _name: string;
    private _taskIds: string[];
    private _isOnline: boolean;
    private _isSolutionOnline: boolean;

    /**
     * The constructor of this class.
     * @param name: The name of the worksheet set by a teacher.
     * @param taskIds: An array of tasks which are assigned to the worksheet.
     * @param isOnline: The information if a worksheet is online meaning it can be solved in the course.
     * @param isSolutionOnline: The information if the teacher published the solution sheet
     *        so it can get downloaded by students of the course.
     */

    constructor(id: string, name: string, taskIds: string[], isOnline: boolean, isSolutionOnline: boolean) {
        super(id);
        this._name = name;
        this._taskIds = taskIds;
        this._isOnline = isOnline;
        this._isSolutionOnline = isSolutionOnline;
    }

    public static fromJSON(json: any): Worksheet {
        return new Worksheet(json.id,
            !exists(json, 'name') ? undefined : json.name,
            !exists(json, 'tasks') ? undefined : json.tasks,
            json.is_online,
            json.is_solution_online);
    }

    public toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            is_online: this.isOnline,
            is_solution_online: this.isSolutionOnline,
            tasks: this.taskIds,
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

    get taskIds(): string[] {
        return this._taskIds;
    }

    set taskIds(value: string[]) {
        this._taskIds = value;
    }

    get isOnline(): boolean {
        return this._isOnline;
    }

    set isOnline(value: boolean) {
        this._isOnline = value;
    }

    get isSolutionOnline(): boolean {
        return this._isSolutionOnline;
    }

    set isSolutionOnline(value: boolean) {
        this._isSolutionOnline = value;
    }
}


