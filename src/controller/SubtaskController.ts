import SubtaskService from '@/services/SubtaskService';
import Subtask from '@/dataModel/Subtask';
import {DefaultApi, DeleteSubtaskRequest} from "@/api/DefaultApi";


export default class SubtaskController implements SubtaskService {
    private _api: DefaultApi;
    private _subtasks: Subtask[];

    constructor(api: DefaultApi) {
        this._api = api;
        this._subtasks = [];
        /* TODO Kommentare wegnehmen, sobald entsprechende Methoden in DefaultApi definiert sind
        this._api.getsubtasks()
          .then((response: Subtask[]) => {
              this._subtasks = response;
          }); */
    }
    public create(subtask: Subtask): void {
        /*
        this._api.createSubtask({subtask} as CreateSubtaskRequest)
          .then((response: string) => {
              task.id = response;
              this._subtasks.push(subtask);
          })
          .catch((error) => {
              throw new Error("Error creating subtask: " + error);
          })
        */
        throw new Error("Method not implemented.");
    }
    public remove(object: Subtask): void {
        this._api.deleteSubtask({subtaskId: object.id} as DeleteSubtaskRequest)
          .then((response) => {
              const index = this._subtasks.indexOf(object, 0);
              if (index > -1) {
                  this._subtasks.splice(index, 1);
              }
          });
    }
    public save(object: Subtask): void {
        /*
        this._api.updateSubtask({subtask: object, subtaskId: object.id} as UpdateSubtaskRequest)
          .then(() => {
              const index = this._subtasks.findIndex((subtask) => { return subtask.id === object.id; });
              if (index > -1) {
                  this._subtasks[index] = object;
              }
          })
         */
        throw new Error("Method not implemented.");
    }
    public get(id: string): Subtask {
        const tempSubtask = this._subtasks.find((subtask) => subtask.id === id);
        if (tempSubtask === undefined) {
            throw new Error("Subtask not found");
        }
        return tempSubtask;
    }
    public getAll(): Subtask[] {
        return this._subtasks;
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
}
