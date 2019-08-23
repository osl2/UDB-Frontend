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
import Solution from "@/dataModel/Solution";


export default class WorksheetController extends ApiControllerAbstract
    implements ParentService<Course, Worksheet>, SolutionService {


    constructor(api: DefaultApi) {
        super(api);
    }


    public getAll(): Promise<Worksheet[]> {
        return this.api.getWorksheets();
    }

    public getChildren(object: Course): Promise<Worksheet[]> {
        return Promise.all(object.worksheetIds.map((worksheetId) =>
          this.api.getWorksheet({worksheetId} as GetWorksheetRequest)
            .catch((e) => {
                if (e.status === 404) {
                    return undefined;
                }
                Promise.reject(e);
            })))
          .then((worksheets: Array<Worksheet | undefined>) => {
              // type cast is ok, because we filter undefined
              return worksheets.filter((worksheet: Worksheet | undefined) => worksheet !== undefined) as Worksheet[];
          });
    }

    public get(id: string) {
        return this.api.getWorksheet({worksheetId: id} as GetWorksheetRequest);
    }

    public create(worksheet: Worksheet): Promise<string> {
        return this.api.createWorksheet({worksheet} as CreateWorksheetRequest)
            .then((response: string) => {
                worksheet.id = response;
                return worksheet.id;
            });
    }
    public save(object: Worksheet): Promise<void> {
        return this.api.updateWorksheet({worksheet: object, worksheetId: object.id} as UpdateWorksheetRequest);
    }
    public remove(object: Worksheet): Promise<void> {
        return this.api.deleteWorksheet({worksheetId: object.id} as DeleteWorksheetRequest);
    }

    /**
     * When executed this method will prepare a PDF file containing the tasks of the given Worksheet
     * as well as the user provided solutions.
     * It iterates over the available tasks of the worksheet and prepends all subtasks and
     * corresponding solutions to the file. The file will then automatically be downloaded.
     * The name of the file is build from the name of the given worksheet extended by the current date and time.
     * This method uses the current application store to get additionally needed controllers.
     * @param object of type Worksheet represents internal Worksheet object
     * @param solutions map SubtaskId to corresponding Solution
     */
    public exportPDF(object: Worksheet, solutions: Map<string, Solution>): void {
        // TODO Texte auslagern sodass diese übersetzt werden können!
        const store = require('@/store').default;
        const taskController: TaskController = store.getters.taskController;
        const subtaskController: SubtaskController = store.getters.subtaskController;

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
            for (const [subtaskIndex, subtaskId] of task.subtaskIds.entries()) {
                const subtask: Subtask = subtaskController.get(subtaskId);
                docDefinition.content.push({text: 'Aufgabe ' + task.name + '-'
                        + (subtaskIndex + 1) + ': ', style: 'taskheader'});
                docDefinition.content.push({text: subtask.instruction, style: 'taskdescription'});
                if (subtask.type !== SubtaskTypes.Instruction) {
                    docDefinition.content.push({text: 'Lösungsvorschlag:', style: 'solutionheader'});
                }
                if (subtask.type === SubtaskTypes.PlainText) {
                    const typedSubtask = subtask as PlainTextTask;
                    if (solutions.has(subtaskId)) {
                        const solution = solutions.get(subtaskId) as PlainTextSolution;
                        docDefinition.content.push({text: solution.text, style: 'solution'});
                    } else {
                        docDefinition.content.push({text: 'Keine Lösung vorhanden', style: 'solution'});
                    }
                } else if (subtask.type === SubtaskTypes.MultipleChoice) {
                    const typedSubtask = subtask as MultipleChoiceTask;
                    if (solutions.has(subtaskId)) {
                        const solution = solutions.get(subtaskId) as MultipleChoiceSolution;
                        let content: string = "";
                        for (const [index, answerOption] of typedSubtask.answerOptions.entries()) {
                            if (content.length > 0) {
                                content += "\n";
                            }
                            if (solution.choices.includes(index)) {
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
                    if (solutions.has(subtaskId)) {
                        const solution = solutions.get(subtaskId) as SqlSolution;
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
            .download('Print' + object.name.replace(' ', '_') + '_'
              + datestring + '.pdf');
    }

    /**
     * When executed this method will prepare a file containing the description of the given
     * Worksheet as well as the user provided solutions.
     * The file will then be downloaded. To archive that, it appends an <a> link element to the body and then clicks it.
     * After the click the element is removed.
     * The name of the file is build from the name of the given worksheet extended by the current date and time.
     * @param object of type Worksheet represents internal Worksheet object
     * @param solutions map SubtaskId to corresponding Solution
     */
    public exportObject(object: Worksheet, solutions: Map<string, Solution>): void {
        const exportobject = {worksheet: {id: object.id}, solutions: [] as object[]};

        for (const [key, solution] of solutions.entries()) {
            const tempobject = {id: "", type: 0 as SubtaskTypes, data: {}};
            tempobject.id = key;
            if (solution instanceof PlainTextSolution) {
                tempobject.type = SubtaskTypes.PlainText;
            } else if (solution instanceof  MultipleChoiceSolution) {
                tempobject.type = SubtaskTypes.MultipleChoice;
            } else if (solution instanceof SqlSolution) {
                tempobject.type = SubtaskTypes.Sql;
            }
            tempobject.data = solution;
            exportobject.solutions.push(tempobject);
        }

        const jsonString = JSON.stringify(exportobject, null, 4);
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
        a.download = 'Worksheet_Export_' + object.name.replace(" ", "_") + '_'
          + datestring + '.json';
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
    public importObject(file: File): Promise<[string, Map<string, Solution>]> {
        const fileReader = new FileReader();

        const promise: Promise<[string, Map<string, Solution>]> = new Promise((resolve, reject) => {
            fileReader.onerror = () => {
                fileReader.abort();
                reject(new DOMException('Problem parsing input file.'));
            };

            fileReader.onload = () => {
                const obj = JSON.parse(fileReader.result as string);
                const solutions: Map<string, Solution> = new Map();
                for (const solution of obj.solutions) {
                    if (solution.type === SubtaskTypes.PlainText) {
                        solutions.set(solution.id, PlainTextSolution.fromJSON(solution.data));
                    } else if (solution.type === SubtaskTypes.MultipleChoice) {
                        solutions.set(solution.id, MultipleChoiceSolution.fromJSON(solution.data));
                    } else if (solution.type === SubtaskTypes.Sql) {
                        solutions.set(solution.id, SqlSolution.fromJSON(solution.data));
                    }
                }
                resolve([obj.worksheet.id, solutions]);
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
        const store = require('@/store').default;
        const taskController: TaskController = store.getters.taskController;
        const subtaskController: SubtaskController = store.getters.subtaskController;

        if (pdfMake.vfs === undefined) {
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }

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
            for (const [subtaskIndex, subtaskId] of task.subtaskIds.entries()) {
                const subtask: Subtask = subtaskController.get(subtaskId);
                docDefinition.content.push({text: 'Aufgabe ' + task.name
                        + '-' + (subtaskIndex + 1) + ': ', style: 'taskheader'});
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
    }
}
