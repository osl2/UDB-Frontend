import ParentService from '@/services/ParentService';
import Task from '@/dataModel/Task';
import Worksheet from "@/dataModel/Worksheet";
import {
    DefaultApi,
    CreateTaskRequest,
    DeleteTaskRequest,
    UpdateTaskRequest,
    GetTaskRequest,
} from "@/api/DefaultApi";

export default class TaskController implements ParentService<Worksheet, Task> {

    private _api: DefaultApi;
    private _tasks: Task[] = [];
    private _task?: Task = undefined;

    constructor(api: DefaultApi) {
        this._api = api;
    }

    /**
     * Loads all tasks available
     */
    public loadAll(): void {
        this._api.gettasks()
            .then((response: Task[]) => {
                this._tasks = response;
            });
    }

    /**
     * Loads all tasks for the given Worksheet
     *
     * @param object
     */
    public loadChildren(object: Worksheet) {
        this._tasks = [];
        object.taskIds.forEach((taskId) => {
            this._api.getTask({taskId} as GetTaskRequest)
                .then((response: Task) => {
                    this._tasks.push(response);
                });
        });
    }

    /**
     * Loads single task with given id
     *
     * @param id
     */
    public load(id: string): void {
        this._task = this._tasks.find((task) => task.id === id);
        if (this._task === undefined) {
            this._api.getTask({taskId: id} as GetTaskRequest)
                .then((response: Task) => {
                    this._task = response;
                });
        }
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

    /**
     * Getter for loaded courses.
     */
    get all(): Task[] {
        return this._tasks;
    }

    /**
     * Getter for single loaded course.
     */
    get one(): Task | undefined {
        return this._task;
    }
}
