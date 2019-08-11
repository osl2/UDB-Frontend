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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Subtask from "@/dataModel/Subtask";
import PlainTextTask from "@/dataModel/PlainTextTask";
import MultipleChoiceTask from "@/dataModel/MultipleChoiceTask";
import SqlTask from "@/dataModel/SqlTask";
import PlainTextSolution from "@/dataModel/PlainTextSolution";
import MultipleChoiceSolution from "@/dataModel/MultipleChoiceSolution";
import SqlSolution from "@/dataModel/SqlSolution";
import SubtaskTypes from "@/dataModel/SubtaskTypes";
import TaskController from "@/controller/TaskController";
import SubtaskController from "@/controller/SubtaskController";


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

    /**
     * When executed this method will prepare a PDF file containing the tasks of the given Worksheet
     * as well as the user provided solutions.
     * It iterates over the available tasks of the worksheet and prepends all subtasks and
     * corresponding solutions to the file. The file will then automatically be downloaded.
     * The name of the file is build from the name of the given worksheet extended by the current date and time.
     * This method uses the current application store to get additionally needed controllers.
     * @param Worksheet internal Worksheet object
     */
    public exportPDF(object: Worksheet): void {
        // TODO Texte auslagern sodass diese übersetzt werden können!
        /* TODO Uncomment when store is implemented
        let taskController: TaskController = this.$store.getters.taskController;
        let subtaskController: SubtaskController = this.$store.getters.subtaskController;

        if (pdfMake.vfs === undefined) {
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }

        const date = new Date();
        const datestring = date.getFullYear() + "_" + ("0" + (date.getMonth() + 1)).slice(-2) + "_" +
            ("0" + date.getDate()).slice(-2) + "_" +
            ("0" + date.getHours()).slice(-2) + "_" + ("0" + date.getMinutes()).slice(-2);

        const docDefinition = {
            content: [
                {
                    stack: [
                        'Aufgabenblatt - ' + object.name,
                        {text: 'Exportiert am: ' + datestring, style: 'subheader'},
                    ],
                    style: 'header',
                },
            ] as any,
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center',
                },
                subheader: {
                    fontSize: 6,
                },
                taskheader: {
                    bold: true,
                    margin: [0, 10, 0, 5],
                },
                taskdescription: {
                    fontSize: 10,
                },
                solutionheader: {
                    bold: true,
                    margin: [0, 10, 0, 5],
                },
                solution: {
                    fontSize: 10,
                },
                solutionTable: {
                    fontSize: 10,
                },
            },
        };

        for (const taskId of object.taskIds) {
            const task: Task = taskController.get(taskId);
            for (const subtaskId of task.subtaskIds) {
                const subtask: Subtask = subtaskController.get(subtaskId);
                docDefinition.content.push({text: 'Aufgabe ' + taskId + '-' + subtaskId + ': ', style: 'taskheader'});
                docDefinition.content.push({text: subtask.instruction, style: 'taskdescription'});
                if (subtask.type !== SubtaskTypes.Instruction) {
                    docDefinition.content.push({text: 'Lösungsvorschlag:', style: 'solutionheader'});
                }
                if (subtask.type === SubtaskTypes.PlainText) {
                    const typedSubtask = subtask as PlainTextTask;
                    if (typedSubtask.solution !== undefined) {
                        const solution = typedSubtask.solution as PlainTextSolution;
                        docDefinition.content.push({text: solution.text, style: 'solution'});
                    } else {
                        docDefinition.content.push({text: 'Keine Lösung vorhanden', style: 'solution'});
                    }
                } else if (subtask.type === SubtaskTypes.MultipleChoice) {
                    const typedSubtask = subtask as MultipleChoiceTask;
                    if (typedSubtask.solution !== undefined) {
                        const solution = typedSubtask.solution as MultipleChoiceSolution;
                        let content: string | undefined;
                        for (const [index, answerOption] of typedSubtask.answerOptions.entries()) {
                            if (content !== undefined) {
                                content += "\n";
                            }
                            if (solution.choices.indexOf(index) > 0) {
                                content += "[X] " + answerOption;
                            } else {
                                content += "[ ]" + answerOption;
                            }
                        }
                        docDefinition.content.push({text: content, style: 'solution'});
                    } else {
                        docDefinition.content.push({text: 'Keine Lösung vorhanden', style: 'solution'});
                    }
                } else if (subtask.type === SubtaskTypes.Sql) {
                    const typedSubtask = subtask as SqlTask;
                    if (typedSubtask.solution !== undefined) {
                        const solution = typedSubtask.solution as SqlSolution;
                        const tablequery = {widths: ['*'], body: [
                                [{text: 'Query:', fillColor: '#eeeeee',
                                    border: [true, true, true, false], style: {bold: true}}],
                                [{text: solution.querySolution, fillColor: '#eeeeee',
                                    border: [true, false, true, true]}]]};
                        docDefinition.content.push({table: tablequery, style: 'solutionQuery'});
                        const tabledata = {widths: [] as string[], body: [] as string[][]};
                        // Set all table widths to star
                        for (const column of solution.columns) {
                            tabledata.widths.push('*');
                        }
                        tabledata.body = solution.values;
                        tabledata.body.unshift(solution.columns);
                        docDefinition.content.push({table: tabledata, style: 'solutionTable'});
                    } else {
                        docDefinition.content.push({text: 'Keine Lösung vorhanden', style: 'solution'});
                    }
                }
            }
        }

        pdfMake.createPdf(docDefinition)
            .download('Print' + object.name.replace(' ', '_') + '_' + datestring + '.pdf');
         */
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

    /**
     * When executed this method will prepare a PDF file containing the tasks of the given Worksheet
     * as well as the teacher provided solutions if available.
     * It iterates over the available tasks of the worksheet and prepends all subtasks and
     * corresponding solutions to the file. The file will then automatically be downloaded.
     * The name of the file is build from the name of the given worksheet extended by the current date and time.
     * This method uses the current application store to get additionally needed controllers.
     * @param sheet internal Worksheet object
     */
    public getSolution(sheet: Worksheet): void {
        // TODO Texte auslagern sodass diese übersetzt werden können!
        /* TODO Uncomment when store is implemented
        let taskController: TaskController = this.$store.getters.taskController;
        let subtaskController: SubtaskController = this.$store.getters.subtaskController;

        if (pdfMake.vfs === undefined) {
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }

        const date = new Date();
        const datestring = date.getFullYear() + "_" + ("0" + (date.getMonth() + 1)).slice(-2) + "_" +
            ("0" + date.getDate()).slice(-2) + "_" +
            ("0" + date.getHours()).slice(-2) + "_" + ("0" + date.getMinutes()).slice(-2);

        const docDefinition = {
            content: [
                {
                    text: 'Aufgabenblatt - ' + sheet.name + ' - Musterlösung',
                    style: 'header',
                },
            ] as any,
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center',
                },
                subheader: {
                    fontSize: 6,
                },
                taskheader: {
                    bold: true,
                    margin: [0, 10, 0, 5],
                },
                taskdescription: {
                    fontSize: 10,
                },
                solutionheader: {
                    bold: true,
                    margin: [0, 10, 0, 5],
                },
                solution: {
                    fontSize: 10,
                },
                solutionQuery: {
                    fontSize: 10,
                },
                solutionTable: {
                    fontSize: 10,
                },
            },
        };

        for (const taskId of sheet.taskIds) {
            const task: Task = taskController.get(taskId);
            for (const subtaskId of task.subtaskIds) {
                const subtask: Subtask = subtaskController.get(subtaskId);
                docDefinition.content.push({text: 'Aufgabe ' + taskId + '-' + subtaskId + ': ', style: 'taskheader'});
                docDefinition.content.push({text: subtask.instruction, style: 'taskdescription'});
                if (subtask.type !== SubtaskTypes.Instruction) {
                    docDefinition.content.push({text: 'Lösung:', style: 'solutionheader'});
                }
                if (subtask.type === SubtaskTypes.PlainText) {
                    const typedSubtask = subtask as PlainTextTask;
                    if (typedSubtask.solution !== undefined) {
                        const solution = typedSubtask.solution as PlainTextSolution;
                        docDefinition.content.push({text: solution.text, style: 'solution'});
                    } else {
                        docDefinition.content.push({text: 'Keine Lösung vorhanden', style: 'solution'});
                    }
                } else if (subtask.type === SubtaskTypes.MultipleChoice) {
                    const typedSubtask = subtask as MultipleChoiceTask;
                    if (typedSubtask.solution !== undefined) {
                        const solution = typedSubtask.solution as MultipleChoiceSolution;
                        let content: string | undefined;
                        for (const [index, answerOption] of typedSubtask.answerOptions.entries()) {
                            if (content !== undefined) {
                                content += "\n";
                            }
                            if (solution.choices.indexOf(index) > 0) {
                                content += "[X] " + answerOption;
                            } else {
                                content += "[ ]" + answerOption;
                            }
                        }
                        docDefinition.content.push({text: content, style: 'solution'});
                    } else {
                        docDefinition.content.push({text: 'Keine Lösung vorhanden', style: 'solution'});
                    }
                } else if (subtask.type === SubtaskTypes.Sql) {
                    const typedSubtask = subtask as SqlTask;
                    if (typedSubtask.solution !== undefined) {
                        const solution = typedSubtask.solution as SqlSolution;
                        const tablequery = {widths: ['*'], body: [
                            [{text: 'Query:', fillColor: '#eeeeee',
                                border: [true, true, true, false], style: {bold: true}}],
                                [{text: solution.querySolution, fillColor: '#eeeeee',
                                    border: [true, false, true, true]}]]};
                        docDefinition.content.push({table: tablequery, style: 'solutionQuery'});
                        const tabledata = {widths: [] as string[], body: [] as string[][]};
                        // Set all table widths to star
                        for (const column of solution.columns) {
                            tabledata.widths.push('*');
                        }
                        tabledata.body = solution.values;
                        tabledata.body.unshift(solution.columns);
                        docDefinition.content.push({table: tabledata, style: 'solutionTable'});
                    } else {
                        docDefinition.content.push({text: 'Keine Lösung vorhanden', style: 'solution'});
                    }
                }
            }
        }

        pdfMake.createPdf(docDefinition)
            .download('Solution_' + sheet.name.replace(' ', '_') + '.pdf');
        */
        throw new Error("Method not implemented.");
    }

    get all() {
        return this._worksheets;
    }
    get one(): Worksheet | undefined {
        return this._worksheet;
    }
}
