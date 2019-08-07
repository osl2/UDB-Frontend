import DataModel from '@/dataModel/DataModel';

/**
 * The class task represents a task of a worksheet. The task consists of subtasks.
 */

export default class Task extends DataModel {

    /**
     * The following methods are getter and setter for each attribute in this class.
     */

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get databaseId(): string {
        return this._databaseId;
    }

    set databaseId(value: string) {
        this._databaseId = value;
    }

    get subtaskIds(): string[] {
        return this._subtaskIds;
    }

    set subtaskIds(value: string[]) {
        this._subtaskIds = value;
    }

    public static fromJSON(json: any): Task {
        return new Task(json.id, json.name, json.database, json.subtasks);
    }
    private _name: string;
    private _databaseId: string;
    private _subtaskIds: string[];

    /**
     * The constructor of this class.
     * @param id: The unique id of the task.
     * @param databaseId: The assigned database to the class.
     * @param subtaskIds: An array of assigned subtasks.
     */

    constructor(id: string, name: string, databaseId: string, subtaskIds: string[]) {
        super(id);
        this._name = name;
        this._databaseId = databaseId;
        this._subtaskIds = subtaskIds;
    }

    public toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            database: this.databaseId,
            subtasks: this.subtaskIds,
        };
    }
}
