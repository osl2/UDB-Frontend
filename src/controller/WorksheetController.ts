import ParentService from '@/services/ParentService';
import Worksheet from '@/dataModel/Worksheet';
import Task from '@/dataModel/Task';
import ExportPDF from '@/services/ExportPDF';
import SolutionService from '@/services/SolutionService';
import Course from "@/dataModel/Course";
import {
    DefaultApi,
    CreateWorksheetRequest,
    DeleteWorksheetRequest,
    UpdateWorksheetRequest,
    GetWorksheetRequest,
} from "@/api/DefaultApi";


export default class WorksheetController
    implements ParentService<Course, Worksheet>, ExportPDF<Worksheet>, SolutionService {

    private _api: DefaultApi;
    private _worksheets: Worksheet[] = [];
    private _worksheet?: Worksheet = undefined;

    constructor(api: DefaultApi) {
        this._api = api;
    }

    public loadAll() {
        this._worksheets = [];
        this._api.getWorksheets()
            .then((response: Worksheet[]) => {
                this._worksheets = response;
            });
    }
    public loadChildren(object: Course) {
        this._worksheets = [];
        object.worksheetIds.forEach((worksheetId) => {
            this._api.getWorksheet({worksheetId} as GetWorksheetRequest)
                .then((response: Worksheet) => {
                    this._worksheets.push(response);
                });
        });
    }
    public load(id: string) {
        this._worksheet = this._worksheets.find((worksheet) => worksheet.id === id);
        this._api.getWorksheet({worksheetId: id} as GetWorksheetRequest)
            .then((response: Worksheet) => {
                this._worksheet = response;
            });
    }

    public create(worksheet: Worksheet): void {
        this._api.createWorksheet({worksheet} as CreateWorksheetRequest)
            .then((response: string) => {
                worksheet.id = response;
                this._worksheets.push(worksheet);
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
    public remove(object: Worksheet): void {
        this._api.deleteWorksheet({worksheetId: object.id} as DeleteWorksheetRequest)
            .then((response) => {
                const index = this._worksheets.indexOf(object, 0);
                if (index > -1) {
                    this._worksheets.splice(index, 1);
                }
            });
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

    get all() {
        return this._worksheets;
    }
    get one(): Worksheet | undefined {
        return this._worksheet;
    }
}
