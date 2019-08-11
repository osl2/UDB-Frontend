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
import ApiControllerAbstract from "@/controller/ApiControllerAbstract";
import Subtask from "@/dataModel/Subtask";

export default class TaskController extends ApiControllerAbstract implements ParentService<Worksheet, Task> {

    private _tasks: Map<string, Task>;

  constructor(api: DefaultApi) {
    super(api);
    this._tasks = new Map<string, Task>();
  }


    /**
     * Loads all tasks available
     */
    public loadAll(): void {
        this.api.getTasks()
            .then((response: Task[]) => {
                response.forEach((task: Task) => {
                    this._tasks = new Map<string, Task>(this._tasks.set(task.id, task));
                });
            });
    }

    /**
     * Loads all tasks for the given Worksheet
     *
     * @param object
     */
    public loadChildren(object: Worksheet) {
        object.taskIds.forEach((taskId) => {
            this.api.getTask({taskId} as GetTaskRequest)
                .then((response: Task) => {
                    this._tasks = new Map<string, Task>(this._tasks.set(response.id, response));
                });
        });
    }

    /**
     * Loads single task with given id
     *
     * @param id
     */
    public load(id: string): void {
        if (this._tasks.get(id) === undefined) {
            this.api.getTask({taskId: id} as GetTaskRequest)
                .then((response: Task) => {
                    this._tasks = new Map<string, Task>(this._tasks.set(response.id, response));
                });
        }
    }

    /**
     * Create a new task and upload to backend
     *
     * @param task
     */
    public create(task: Task): void {
        this.api.createTask({task} as CreateTaskRequest)
          .then((response: string) => {
              task.id = response;
              this._tasks = new Map<string, Task>(this._tasks.set(task.id, task));
          })
          .catch((error) => {
              throw new Error("Error creating task: " + error);
          });
    }

    /**
     * Delete a task
     *
     * @param object
     */
    public remove(object: Task): void {
        this.api.deleteTask({taskId: object.id} as DeleteTaskRequest)
          .then((response) => {
              this._tasks.delete(object.id);
              this._tasks = new Map<string, Task>(this._tasks);
          });
    }

    /**
     * Update a task
     *
     * @param object
     */
    public save(object: Task): void {
        this.api.updateTask({task: object, taskId: object.id} as UpdateTaskRequest)
          .then(() => {
              if (this._tasks.get(object.id) !== undefined) {
                  this._tasks = new Map<string, Task>(this._tasks.set(object.id, object));
              }
          });
    }

    /**
     * Returns Task with given id, if Task was loaded
     *
     * @param id
     */
    public get(id: string): Task {
        const task = this._tasks.get(id);
        if (task === undefined) {
            throw new Error("Task not found");
        }
        return task;
    }

    /**
     * Returns all children of Worksheet that have benn loaded.
     *
     * @param worksheet
     */
    public getChildren(worksheet: Worksheet): Task[] {
        const tasks: Task[] = [];
        worksheet.taskIds.map((taskId: string) => {
            return this._tasks.get(taskId);
        }).forEach((task: Task | undefined) => {
            if (task !== undefined) {
                tasks.push(task);
            }
        });
        return tasks;
    }

    /**
     * Getter for all loaded courses.
     */
    get all(): Task[] {
        return Array.from(this._tasks.values());
    }
}
