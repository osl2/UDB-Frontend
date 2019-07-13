import DataModel from '@/dataModel/DataModel';
import Task from '@/dataModel/Task';

/**
 * The class Worksheet represents a worksheet provided by a teacher.
 * Students can solve the worksheet in the matching course.
 */

export default class Worksheet extends DataModel {
    private _id: String;
    private _name: String;
    private _tasks: Task[];
    private _isOnline: boolean;
    private _isSolutionOnline: boolean;

    /**
     * The constructor of this class.
     * @param id: The unique id of a worksheet.
     * @param name: The name of the worksheet set by a teacher.
     * @param tasks: An array of tasks which are assigned to the worksheet.
     * @param isOnline: The information if a worksheet is online meaning it can be solved in the course.
     * @param isSolutionOnline: The information if the teacher published the solution sheet
     *        so it can get downloaded by students of the course.
     */

    constructor(id: String, name: String, tasks: Task[], isOnline: boolean, isSolutionOnline: boolean) {
        super();
        this._id = id;
        this._name = name;
        this._tasks = tasks;
        this._isOnline = isOnline;
        this._isSolutionOnline = isSolutionOnline;
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

    get tasks(): Task[] {
        return this._tasks;
    }

    set tasks(value: Task[]) {
        this._tasks = value;
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