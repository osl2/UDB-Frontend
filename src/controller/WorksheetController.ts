import ParentService from '@/services/ParentService';
import Worksheet from '@/dataModel/Worksheet';
import Task from '@/dataModel/Task';
import ExportPDF from '@/services/ExportPDF';
import SolutionService from '@/services/SolutionService';
import {
    CreateWorksheetRequest,
    DefaultApi,
    DeleteWorksheetRequest,
    UpdateWorksheetRequest,
} from "@/api/DefaultApi";
import Subtask from "@/dataModel/Subtask";
import TaskController from "@/controller/TaskController";


export default class WorksheetController
    implements ParentService<Worksheet, Task>, ExportPDF<Worksheet>, SolutionService {
    private _api: DefaultApi;
    private _worksheets: Worksheet[];
    private _taskController: ParentService<Task, Subtask>;

    constructor(api: DefaultApi) {
        this._api = api;
        this._worksheets = [];
        this._api.getworksheets()
          .then((response: Worksheet[]) => {
              this._worksheets = response;
          });
        this._taskController = new TaskController(api);
    }

    public getChildren(object: Worksheet): Task[] {
        const tasks: Task[] = [];
        object.taskIds.forEach((taskId: string) => {
            tasks.push(this._taskController.get(taskId));
        });
        return tasks;
    }
    public create(worksheet: Worksheet): void {
        this._api.createWorksheet({worksheet} as CreateWorksheetRequest)
          .then((response: string) => {
              worksheet.id = response;
              this._worksheets.push(worksheet);
          })
          .catch((error) => {
              throw new Error("Error creating worksheet: " + error);
          });
    }
    public remove(object: Worksheet): void {
        this._api.deleteWorksheet({worksheetId: object.id} as DeleteWorksheetRequest)
          .then((response) => {
              const index = this._worksheets.indexOf(object, 0);
              if (index > -1) {
                  this._worksheets.splice(index, 1);
              }
          });
    }
    public save(object: Worksheet): void {
        this._api.updateWorksheet({worksheet: object, worksheetId: object.id} as UpdateWorksheetRequest)
          .then(() => {
              const index = this._worksheets.findIndex((worksheet) => worksheet.id === object.id);
              if (index > -1) {
                  this._worksheets[index] = object;
              }
          });
    }
    public get(id: string): Worksheet {
        const tempWorksheet = this._worksheets.find((worksheet) => worksheet.id === id);
        if (tempWorksheet === undefined) {
            throw new Error("Worksheet not found");
        }
        return tempWorksheet;
    }
    public getAll(): Worksheet[] {
        return this._worksheets;
    }

    public exportPDF(object: Worksheet): Uint8Array {
        throw new Error("Method not implemented.");
    }
    public exportObject(object: Worksheet): Uint8Array {
        throw new Error("Method not implemented.");
    }
    public importObject(object: Uint8Array): Worksheet {
        throw new Error("Method not implemented.");
    }
    public getSolution(sheet: Worksheet): Uint8Array {
        throw new Error("Method not implemented.");
    }
}
