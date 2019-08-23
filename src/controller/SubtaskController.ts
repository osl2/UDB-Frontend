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
    public getAll(): Promise<Subtask[]> {
        return this.api.getSubtasks();
    }

    public getAllWithoutSolution(): Promise<Subtask[]> {
        return this.getAll().then((subtasks: Subtask[]) => {
            return subtasks.map((subtask: Subtask) => {
                subtask.solution = undefined;
                return subtask;
            });
        });
    }

    /**
     * Loads all subtasks for the given Task
     *
     * @param object
     */
    public getChildren(object: Task): Promise<Subtask[]> {
        return Promise.all(object.subtaskIds.map((subtaskId) =>
          this.api.getSubtask({subtaskId} as GetSubtaskRequest)));
    }

    public getChildrenWithoutSolution(object: Task): Promise<Subtask[]> {
        return Promise.all(object.subtaskIds.map((subtaskId) => {
            return this.api.getSubtask({subtaskId} as GetSubtaskRequest)
              .then((subtask: Subtask) => {
                  subtask.solution = undefined;
                  return subtask;
              });
        }));
    }

    /**
     * Loads a subtask with given id
     *
     * @param id
     */
    public get(id: string): Promise<Subtask> {
        return this.api.getSubtask({subtaskId: id} as GetSubtaskRequest);
    }

    public getWithoutSolution(id: string): Promise<Subtask> {
        return this.api.getSubtask({subtaskId: id} as GetSubtaskRequest)
          .then((subtask: Subtask) => {
              subtask.solution = undefined;
              return subtask;
          });
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
              return subtask.id;
          });
    }

    /**
     *
     *
     * @param object
     */
    public remove(object: Subtask): Promise<void> {
        return this.api.deleteSubtask({subtaskId: object.id} as DeleteSubtaskRequest);
    }

    public save(object: Subtask): Promise<void> {
        return this.api.updateSubtask({subtask: object, subtaskId: object.id} as UpdateSubtaskRequest);
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
}
