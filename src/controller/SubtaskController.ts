import SubtaskService from '@/services/SubtaskService';
import Task from "@/dataModel/Task";
import Subtask from '@/dataModel/Subtask';
import {
    CreateSubtaskRequest,
    DefaultApi,
    DeleteSubtaskRequest,
    GetSubtaskRequest, UpdateSubtaskRequest, VerifySubtaskSolutionRequest,
} from "@/api/DefaultApi";
import ApiControllerAbstract from "@/controller/ApiControllerAbstract";
import SolutionDiff from "@/dataModel/SolutionDiff";

export default class SubtaskController extends ApiControllerAbstract implements SubtaskService {


    private _subtasks: Map<string, Subtask>;

    constructor(api: DefaultApi) {
        super(api);
        this._subtasks = new Map<string, Subtask>();
    }


    /**
     * Loads all subtasks available
     */
    public loadAll(): void {
        this.api.getSubtasks()
            .then((response: Subtask[]) => {
                response.forEach((subtask: Subtask) => {
                    this._subtasks = new Map<string, Subtask>(this._subtasks.set(subtask.id, subtask));
                });
            }).catch((response) => {
            throw new Error("Error loading subtasks: " + response.status + " " + response.statusText);
        });
    }

    /**
     * Loads all subtasks for the given Task
     *
     * @param object
     */
    public loadChildren(object: Task): void {
        object.subtaskIds.forEach((subtaskId) => {
            this.api.getSubtask({subtaskId} as GetSubtaskRequest)
                .then((response: Subtask) => {
                  this._subtasks = new Map<string, Subtask>(this._subtasks.set(response.id, response));
                })
                .catch((response) => {
                    throw new Error("Error loading subtasks: " + response + " " + response);
                });
        });
    }

    /**
     * Loads a subtask with given id
     *
     * @param id
     */
    public load(id: string): void {
        if (this._subtasks.get(id) === undefined) {
            this.api.getSubtask({subtaskId: id} as GetSubtaskRequest)
                .then((response: Subtask) => {
                    this._subtasks = new Map<string, Subtask>(this._subtasks.set(response.id, response));
                }).catch((response) => {
                throw new Error("Error loading subtask: " + response.status + " " + response.statusText);
            });
        }
    }

    /**
     * Create a new subtask, add to subtasks if API call is successful
     *
     * @param subtask
     */
    public create(subtask: Subtask): Promise<string> {
        return this.api.createSubtask({subtask} as CreateSubtaskRequest)
          .then((response: string) => {
              subtask.id = response;
              this._subtasks = new Map<string, Subtask>(this._subtasks.set(subtask.id, subtask));
              return subtask.id;
          })
          .catch((error) => {
              throw new Error("Error creating subtask: " + error);
          });
    }

    /**
     *
     *
     * @param object
     */
    public remove(object: Subtask): void {
        this.api.deleteSubtask({subtaskId: object.id} as DeleteSubtaskRequest)
          .then((response) => {
              this._subtasks.delete(object.id);
              this._subtasks = new Map<string, Subtask>(this._subtasks);
          }).catch((response) => {
            throw new Error("Error deleting subtask: " + response.status + " " + response.statusText);
        });
    }
    public save(object: Subtask): void {
        this.api.updateSubtask({subtask: object, subtaskId: object.id} as UpdateSubtaskRequest)
          .then(() => {
              if (this._subtasks.get(object.id) !== undefined) {
                  this._subtasks = new Map<string, Subtask>(this._subtasks.set(object.id, object));
              }
          }).catch((response) => {
            throw new Error("Error saving subtask: " + response.status + " " + response.statusText);
        });
    }

    /**
     * Loads all subtasks available, but without solution
     */
    public loadAllWithoutSolution(): void {
        this.api.getSubtasks()
            .then((response: Subtask[]) => {
                response.forEach((subtask: Subtask) => {
                    subtask.solution = undefined;
                    this._subtasks = new Map<string, Subtask>(this._subtasks.set(subtask.id, subtask));
                });
            }).catch((response) => {
            throw new Error("Error loading subtasks: " + response.status + " " + response.statusText);
        });
    }

    /**
     * Loads all subtasks for the given Task, but without solution
     *
     * @param object
     */
    public loadChildrenWithoutSolution(object: Task): void {
        object.subtaskIds.forEach((subtaskId) => {
            this.api.getSubtask({subtaskId} as GetSubtaskRequest)
                .then((response: Subtask) => {
                    response.solution = undefined;
                    this._subtasks = new Map<string, Subtask>(this._subtasks.set(response.id, response));
                }).catch((response) => {
                  throw new Error("Error loading subtasks: " + response.status + " " + response.statusText);
            });
        });
    }

    /**
     * Loads a subtask with given id, but without solution
     *
     * @param id
     */
    public loadWithoutSolution(id: string): void {
        if (this._subtasks.get(id) === undefined) {
            this.api.getSubtask({subtaskId: id} as GetSubtaskRequest)
                .then((response: Subtask) => {
                    response.solution = undefined;
                    this._subtasks = new Map<string, Subtask>(this._subtasks.set(response.id, response));
                }).catch((response) => {
                throw new Error("Error loading subtask: " + response.status + " " + response.statusText);
            });
        }
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

    /**
     * Returns comparison between given subtask solution and teacher solution
     * saved in backend as SolutionDiff.
     *
     * @param subtask
     */
    public compareSolution(subtask: Subtask): Promise<SolutionDiff> {
        return this.api.verifySubtaskSolution({
            subtaskId: subtask.id,
            solution: subtask.solution,
        } as VerifySubtaskSolutionRequest);
    }

    public get(id: string): Subtask {
        const tempSubtask = this._subtasks.get(id);
        if (tempSubtask === undefined) {
            throw new Error("Subtask not found");
        }
        return tempSubtask;
    }

    public getChildren(task: Task): Subtask[] {
        const subtasks: Subtask[] = [];
        task.subtaskIds.map((subtaskId: string) => {
            return this._subtasks.get(subtaskId);
        }).forEach((subtask: Subtask | undefined) => {
            if (subtask !== undefined) {
                subtasks.push(subtask);
            }
        });
        return subtasks;
    }

    /**
     * Getter for all loaded subtasks.
     */
    get all(): Subtask[] {
        return Array.from(this._subtasks.values());
    }
}
