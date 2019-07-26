import ParentService from '@/services/ParentService';
import Worksheet from '@/dataModel/Worksheet';
import Task from '@/dataModel/Task';
import ExportPDF from '@/services/ExportPDF';
import SolutionService from '@/services/SolutionService';

export default class WorksheetController
    implements ParentService<Worksheet, Task>, ExportPDF<Worksheet>, SolutionService {
    public getChildren(object: Worksheet): Task[] {
        throw new Error("Method not implemented.");
    }
    public create(): Worksheet {
        throw new Error("Method not implemented.");
    }
    public remove(object: Worksheet): void {
        throw new Error("Method not implemented.");
    }
    public save(object: Worksheet): void {
        throw new Error("Method not implemented.");
    }
    public get(id: string): Worksheet {
        throw new Error("Method not implemented.");
    }
    public getAll(): Worksheet[] {
        throw new Error("Method not implemented.");
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
