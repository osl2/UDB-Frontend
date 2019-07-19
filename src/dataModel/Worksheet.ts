import DataModel from '@/dataModel/DataModel';
import Task from '@/dataModel/Task';

/**
 *
 */

export default class Worksheet extends DataModel {
  private _id: string;
  private _name: string;
  private _tasks: Task[];
  private _isOnline: boolean;
  private _isSolutionOnline: boolean;

  /**
   *
   * @param id
   * @param name
   * @param tasks
   * @param isOnline
   * @param isSolutionOnline
   */

  constructor(id: string, name: string, tasks: Task[], isOnline: boolean, isSolutionOnline: boolean) {
    super();
    this._id = id;
    this._name = name;
    this._tasks = tasks;
    this._isOnline = isOnline;
    this._isSolutionOnline = isSolutionOnline;
  }

  /**
   *
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
