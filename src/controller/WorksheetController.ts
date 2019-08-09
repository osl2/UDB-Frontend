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
import ApiControllerAbstract from "@/controller/ApiControllerAbstract";
import WorksheetSolution from "@/dataModel/WorksheetSolution";


export default class WorksheetController extends ApiControllerAbstract
    implements ParentService<Course, Worksheet>, ExportPDF<WorksheetSolution>, SolutionService {

    private _worksheets: Worksheet[] = [];
    private _worksheet?: Worksheet = undefined;

    constructor(api: DefaultApi) {
        super(api);
    }


    public loadAll() {
        this._worksheets = [];
        this.api.getWorksheets()
            .then((response: Worksheet[]) => {
                this._worksheets = response;
            });
    }
    public loadChildren(object: Course) {
        this._worksheets = [];
        object.worksheetIds.forEach((worksheetId) => {
            this.api.getWorksheet({worksheetId} as GetWorksheetRequest)
                .then((response: Worksheet) => {
                    this._worksheets.push(response);
                });
        });
    }
    public load(id: string) {
        this._worksheet = this._worksheets.find((worksheet) => worksheet.id === id);
        this.api.getWorksheet({worksheetId: id} as GetWorksheetRequest)
            .then((response: Worksheet) => {
                this._worksheet = response;
            });
    }

    public create(worksheet: Worksheet): void {
        this.api.createWorksheet({worksheet} as CreateWorksheetRequest)
            .then((response: string) => {
                worksheet.id = response;
                this._worksheets.push(worksheet);
            });
    }
    public save(object: Worksheet): void {
        this.api.updateWorksheet({worksheet: object, worksheetId: object.id} as UpdateWorksheetRequest)
          .then(() => {
              const index = this._worksheets.findIndex((worksheet) => worksheet.id === object.id);
              if (index > -1) {
                  this._worksheets[index] = object;
              }
          });
    }
    public remove(object: Worksheet): void {
        this.api.deleteWorksheet({worksheetId: object.id} as DeleteWorksheetRequest)
            .then((response) => {
                const index = this._worksheets.indexOf(object, 0);
                if (index > -1) {
                    this._worksheets.splice(index, 1);
                }
            });
    }

    public exportPDF(object: WorksheetSolution): void {
        throw new Error("Method not implemented.");
    }

    /**
     * When executed this method will prepare a file containing the description of the given
     * Worksheet (inside the WorksheetSolution) as well as the user provided solutions.
     * The file will then be downloaded. To archive that, it appends an <a> link element to the body and then clicks it.
     * After the click the element is removed.
     * The name of the file is build from the name of the given worksheet extended by the current date and time.
     * @param WorksheetSolution internal WorksheetSolution object
     */
    public exportObject(object: WorksheetSolution): void {
        /* TODO DEV
        const textsolution: Solution = new PlainTextSolution("TEST");
        const sol: Map<string, Solution> = new Map();
        sol.set("1", textsolution);
        const worksheet: Worksheet = new Worksheet("1", "TEST", ["1"], true, true);
        const object: WorksheetSolution = new WorksheetSolution(worksheet, sol);
*/
        const jsonString = JSON.stringify(object, null, 4);
        const escapedJsonString = jsonString.replace(/\\n/g, "\\n")
                                            .replace(/\\'/g, "\\'")
                                            .replace(/\\"/g, '\\"')
                                            .replace(/\\&/g, "\\&")
                                            .replace(/\\r/g, "\\r")
                                            .replace(/\\t/g, "\\t")
                                            .replace(/\\b/g, "\\b")
                                            .replace(/\\f/g, "\\f");

        const blob = new Blob([escapedJsonString!], {
            type: 'text/json',
        });

        const date = new Date();
        const datestring = date.getFullYear() + "_" + ("0" + (date.getMonth() + 1)).slice(-2) + "_" +
            ("0" + date.getDate()).slice(-2) + "_" +
            ("0" + date.getHours()).slice(-2) + "_" + ("0" + date.getMinutes()).slice(-2);

        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = window.URL.createObjectURL(blob);
        a.download = 'Worksheet_Export_' + object.worksheet.name.replace(" ", "_") + '_' + datestring + '.json';
        a.onclick = () => {
            setTimeout(() => {
                window.URL.revokeObjectURL(a.href);
            }, 1500);
        };
        a.click();
        // ensure that the link is again removed since it wont be needed any more
        a.parentNode!.removeChild(a);
    }

    /**
     * This method imports a previously exported database together with the exported solutions.
     * It returns an internal WorksheetSolution.
     */
    public importObject(file: File): Promise<WorksheetSolution> {
        const fileReader = new FileReader();

        const promise: Promise<WorksheetSolution> = new Promise((resolve, reject) => {
            fileReader.onerror = () => {
                fileReader.abort();
                reject(new DOMException('Problem parsing input file.'));
            };

            fileReader.onload = () => {
                const worksheetsolution = WorksheetSolution.fromJSON(fileReader.result as string);
                resolve(worksheetsolution);
            };
            fileReader.readAsText(file);
        });
        return promise;
    }
    public getSolution(sheet: Worksheet): void {
        throw new Error("Method not implemented.");
    }

    get all() {
        return this._worksheets;
    }
    get one(): Worksheet | undefined {
        return this._worksheet;
    }
}
