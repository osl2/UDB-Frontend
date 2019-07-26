import ParentService from '@/services/ParentService';
import Task from '@/dataModel/Task';
import Subtask from '@/dataModel/Subtask';

export default class TaskController implements ParentService<Task, Subtask> {
    public getChildren(object: Task): Subtask[] {
        throw new Error("Method not implemented.");
    }
    public create(): Task {
        throw new Error("Method not implemented.");
    }
    public remove(object: Task): void {
        throw new Error("Method not implemented.");
    }
    public save(object: Task): void {
        throw new Error("Method not implemented.");
    }
    public get(id: string): Task {
        throw new Error("Method not implemented.");
    }
    public getAll(): Task[] {
        throw new Error("Method not implemented.");
    }
}
