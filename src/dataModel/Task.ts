import DataModel from '@/dataModel/DataModel';
import Database from '@/dataModel/Database';
import Subtask from '@/dataModel/Subtask';

/**
 *
 */

export default class Task extends DataModel {
    private _id: String;
    private _database: Database;
    private _subtasks: Subtask[];

    /**
     *
     * @param id
     * @param database
     * @param subtask
     */

    constructor(id: String, database: Database, subtask: Subtask[]) {
        super();
        this._id = id;
        this._database = database;
        this._subtasks = subtask;
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

    get database(): Database {
        return this._database;
    }

    set database(value: Database) {
        this._database = value;
    }

    get subtask(): Subtask[] {
        return this._subtasks;
    }

    set subtask(value: Subtask[]) {
        this._subtasks = value;
    }
}