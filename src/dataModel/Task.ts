import DataModel from '@/dataModel/DataModel';
import Database from '@/dataModel/Database';
import Subtask from '@/dataModel/Subtask';

/**
 * The class task represents a task of a worksheet. The task consists of subtasks.
 */

export default class Task extends DataModel {
    private _id: String;
    private _database: Database;
    private _subtasks: Subtask[];

    /**
     * The constructor of this class.
     * @param id: The unique id of the task.
     * @param database: The assigned database to the class.
     * @param subtasks: An array of assigned subtasks.
     */

    constructor(id: String, database: Database, subtasks: Subtask[]) {
        super();
        this._id = id;
        this._database = database;
        this._subtasks = subtasks;
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

    get database(): Database {
        return this._database;
    }

    set database(value: Database) {
        this._database = value;
    }

    get subtasks(): Subtask[] {
        return this._subtasks;
    }

    set subtasks(value: Subtask[]) {
        this._subtasks = value;
    }
}