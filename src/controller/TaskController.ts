import ParentService from '@/services/ParentService';
import Task from '@/dataModel/Task';
import Worksheet from "@/dataModel/Worksheet";
import {
  DefaultApi,
  CreateTaskRequest,
  DeleteTaskRequest,
  UpdateTaskRequest,
  GetTaskRequest, GetWorksheetRequest,
} from "@/api/DefaultApi";
import ApiControllerAbstract from "@/controller/ApiControllerAbstract";
import Subtask from "@/dataModel/Subtask";

export default class TaskController extends ApiControllerAbstract implements ParentService<Worksheet, Task> {


  constructor(api: DefaultApi) {
    super(api);
  }


    /**
     * Loads all tasks available
     */
    public getAll(): Promise<Task[]> {
        return this.api.getTasks();
    }

    /**
     * Loads all tasks for the given Worksheet
     *
     * @param object
     */
    public getChildren(object: Worksheet): Promise<Task[]> {
      return Promise.all(object.taskIds.map((taskId) =>
        this.api.getTask({taskId} as GetTaskRequest)));
    }

    /**
     * Loads single task with given id
     *
     * @param id
     */
    public get(id: string): Promise<Task> {
      return this.api.getTask({taskId: id} as GetTaskRequest);
    }

    /**
     * Create a new task and upload to backend
     *
     * @param task
     */
    public create(task: Task): Promise<string> {
        return this.api.createTask({task} as CreateTaskRequest)
          .then((response: string) => {
              task.id = response;
              return task.id;
          });
    }

    /**
     * Update a task
     *
     * @param object
     */
    public save(object: Task): Promise<void> {
      return this.api.updateTask({task: object, taskId: object.id} as UpdateTaskRequest);
    }

    /**
     * Delete a task
     *
     * @param object
     */
    public remove(object: Task): Promise<void> {
        return this.api.deleteTask({taskId: object.id} as DeleteTaskRequest);
    }
}
