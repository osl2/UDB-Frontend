import ParentService from '@/services/ParentService';
import Task from '@/dataModel/Task';
import Subtask from '@/dataModel/Subtask';
import {
    CreateTaskRequest,
    DefaultApi,
    DeleteTaskRequest,
    UpdateTaskRequest,
} from "@/api/DefaultApi";
import SubtaskService from "@/services/SubtaskService";
import SubtaskController from "@/controller/SubtaskController";

export default class TaskController implements ParentService<Task, Subtask> {
    private _api: DefaultApi;
    private _tasks: Task[];
    private _subtaskController: SubtaskService;

    constructor(api: DefaultApi) {
        this._api = api;
        this._tasks = [];
        this._api.gettasks()
          .then((response: Task[]) => {
              this._tasks = response;
          });
        this._subtaskController = new SubtaskController(api);
    }

    public getChildren(object: Task): Subtask[] {
        const subtasks: Subtask[] = [];
        object.subtaskIds.forEach((subtaskId: string) => {
            subtasks.push(this._subtaskController.get(subtaskId));
        });
        return subtasks;
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
    public getAll(): Task[] {
        return this._tasks;
    }
}
