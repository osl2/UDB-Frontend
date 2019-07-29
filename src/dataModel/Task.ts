import DataModel from '@/dataModel/DataModel';
import Database from '@/dataModel/Database';
import Subtask from '@/dataModel/Subtask';

/**
 * The class task represents a task of a worksheet. The task consists of subtasks.
 */

export default class Task extends DataModel {
    private _database: Database;
    private _subtasks: Subtask[];

    /**
     * The constructor of this class.
     * @param id: The unique id of the task.
     * @param database: The assigned database to the class.
     * @param subtasks: An array of assigned subtasks.
     */

    constructor(id: string, database: Database, subtasks: Subtask[]) {
        super(id);
        this._database = database;
        this._subtasks = subtasks;
        // parent for every subtask has to be set as soon as they get assigned to the task
        for (const subtask of this._subtasks) {
            subtask.parent = this;
        }
    }

    public appendSubtask(subtask: Subtask) {
        subtask.parent = this;
        this._subtasks.push(subtask);
    }

    /**
     * The following methods are getter and setter for each attribute in this class.
     */

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
