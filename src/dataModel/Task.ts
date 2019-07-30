import DataModel from '@/dataModel/DataModel';
import Database from '@/dataModel/Database';
import Subtask from '@/dataModel/Subtask';

/**
 * The class task represents a task of a worksheet. The task consists of subtasks.
 */

export default class Task extends DataModel {
    private _name: string;
    private _database_id: string;
    private _subtask_ids: string[];

    /**
     * The constructor of this class.
     * @param id: The unique id of the task.
     * @param database_id: The assigned database to the class.
     * @param subtask_ids: An array of assigned subtasks.
     */

    constructor(id: string, name: string, database_id: string, subtask_ids: string[]) {
        super(id);
        this._name = name;
        this._database_id = database_id;
        this._subtask_ids = subtask_ids;
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

    get database_id(): string {
        return this._database_id;
    }

    set database_id(value: string) {
        this._database_id = value;
    }

    get subtask_ids(): string[] {
        return this._subtask_ids;
    }

    set subtask_ids(value: string[]) {
        this._subtask_ids = value;
    }
}

export function TaskFromJSON(json: any): Task {
    return new Task(json['id'], json['name'], json['database'], json['subtasks'])
}

export function TaskToJSON(value?: Task): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'id': value.id,
        'name': value.name,
        'database': value.database_id,
        'subtasks': value.subtask_ids,
    };
}
