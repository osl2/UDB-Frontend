import ParentService from '@/services/ParentService';
import Task from '@/dataModel/Task';
import {
    CreateTaskRequest,
    DefaultApi,
    DeleteTaskRequest,
    UpdateTaskRequest,
} from "@/api/DefaultApi";
import Worksheet from "@/dataModel/Worksheet";

export default class TaskController implements ParentService<Worksheet, Task> {
    private _api: DefaultApi;
    private _tasks: Task[] = [];

    constructor(api: DefaultApi) {
        this._api = api;
    }

    loadAll(): void {
        this._api.gettasks()
            .then((response: Task[]) => {
                this._tasks = response;
            });
    }
    public loadChildren(object: Worksheet): Task[] {
        throw new Error("Method not implemented.");
    }
    load(id: string): void {
        throw new Error("Method not implemented.");
    }

    public create(task: Task): void {
        this._api.createTask({task} as CreateTaskRequest)
          .then((response: string) => {
              task.id = response;
              this._tasks.push(task);
          })
          .catch((error) => {
              throw new Error("Error creating task: " + error);
          });
    }
    public remove(object: Task): void {
        this._api.deleteTask({taskId: object.id} as DeleteTaskRequest)
          .then((response) => {
              const index = this._tasks.indexOf(object, 0);
              if (index > -1) {
                  this._tasks.splice(index, 1);
              }
          });
    }
    public save(object: Task): void {
        this._api.updateTask({task: object, taskId: object.id} as UpdateTaskRequest)
          .then(() => {
              const index = this._tasks.findIndex((task) => task.id === object.id);
              if (index > -1) {
                  this._tasks[index] = object;
              }
          });
    }
    public get(id: string): Task {
        const tempTask = this._tasks.find((task) => task.id === id);
        if (tempTask === undefined) {
            throw new Error("Task not found");
        }
        return tempTask;
    }

    get all(): Task[] {
        throw new Error("Method not implemented.");
    }
    get one(): Task {
        throw new Error("Method not implemented.");
    }
}
