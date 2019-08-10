import SubtaskService from '@/services/SubtaskService';
import Task from "@/dataModel/Task";
import Subtask from '@/dataModel/Subtask';
import {
    CreateSubtaskRequest,
    DefaultApi,
    DeleteSubtaskRequest,
    GetSubtaskRequest, UpdateSubtaskRequest,
} from "@/api/DefaultApi";
import ApiControllerAbstract from "@/controller/ApiControllerAbstract";

export default class SubtaskController extends ApiControllerAbstract implements SubtaskService {


    private _subtasks: Subtask[] = [];
    private _subtask?: Subtask = undefined;

    constructor(api: DefaultApi) {
        super(api);
    }


    /**
     * Loads all subtasks available
     */
    public loadAll(): void {
        this.api.getSubtasks()
            .then((response: Subtask[]) => {
                this._subtasks = response;
            });
    }

    /**
     * Loads all subtasks for the given Task
     *
     * @param object
     */
    public loadChildren(object: Task): void {
        this._subtasks = [];
        object.subtaskIds.forEach((subtaskId) => {
            this.api.getSubtask({subtaskId} as GetSubtaskRequest)
                .then((response: Subtask) => {
                    this._subtasks.push(response);
                });
        });
    }

    /**
     * Loads a subtask with given id
     *
     * @param id
     */
    public load(id: string): void {
        this._subtask = this._subtasks.find((subtask) => subtask.id === id);
        if (this._subtask === undefined) {
            this.api.getSubtask({subtaskId: id} as GetSubtaskRequest)
                .then((response: Subtask) => {
                    this._subtask = response;
                });
        }
        throw new Error("Method not implemented in DefaultApi.");
    }

    /**
     * Create a new subtask, add to subtasks if API call is successful
     *
     * @param subtask
     */
    public create(subtask: Subtask): void {
        this.api.createSubtask({subtask} as CreateSubtaskRequest)
          .then((response: string) => {
              subtask.id = response;
              this._subtasks.push(subtask);
          })
          .catch((error) => {
              throw new Error("Error creating subtask: " + error);
          });
    }
    public remove(object: Subtask): void {
        this.api.deleteSubtask({subtaskId: object.id} as DeleteSubtaskRequest)
          .then((response) => {
              const index = this._subtasks.indexOf(object, 0);
              if (index > -1) {
                  this._subtasks.splice(index, 1);
              }
          });
    }
    public save(object: Subtask): void {
        this.api.updateSubtask({subtask: object, subtaskId: object.id} as UpdateSubtaskRequest)
          .then(() => {
              const index = this._subtasks.findIndex((subtask) => subtask.id === object.id);
              if (index > -1) {
                  this._subtasks[index] = object;
              }
          });
    }

    /**
     * Loads all subtasks available, but without solution
     */
    public loadAllWithoutSolution(): void {
        this.loadAll();
        this._subtasks.forEach( (subtask) => {
            subtask.solution = undefined;
        });
    }

    /**
     * Loads all subtasks for the given Task, but without solution
     *
     * @param object
     */
    public loadChildrenWithoutSolution(object: Task): void {
        this.loadChildren(object);
        this._subtasks.forEach( (subtask) => {
            subtask.solution = undefined;
        });
    }

    /**
     * Loads a subtask with given id, but without solution
     *
     * @param id
     */
    public loadWithoutSolution(id: string): void {
        this.load(id);
        if (this._subtask !== undefined) {
            this._subtask.solution = undefined;
        }
    }

    public get(id: string): Subtask {
        const tempSubtask = this._subtasks.find((subtask) => subtask.id === id);
        if (tempSubtask === undefined) {
            throw new Error("Subtask not found");
        }
        return tempSubtask;
    }
    public getWithoutSolution(id: string): Subtask {
        let subtask: Subtask;
        try {subtask = this.get(id);
        } catch (error) {
            throw error;
        }
        subtask.solution = undefined;
        return subtask;

    }
    public getAllWithoutSolution(): Subtask[] {
        const subtasks: Subtask[] = [];
        this._subtasks.forEach((subtask: Subtask) => {
            subtasks.push(this.getWithoutSolution(subtask.id));
        });
        return subtasks;
    }
    public compareSolution(subtask: Subtask) {
        throw new Error("Method not implemented.");
    }

    /**
     * Getter for loaded subtasks.
     */
    get all(): Subtask[] {
        return this._subtasks;
    }

    /**
     * Getter for single loaded subtask.
     */
    get one(): Subtask | undefined {
        return this._subtask;
    }
}
