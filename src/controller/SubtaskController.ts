import SubtaskService from '@/services/SubtaskService';
import Subtask from '@/dataModel/Subtask';

export default class SubtaskController implements SubtaskService {
    public compareSolution(subtask: Subtask) {
        throw new Error("Method not implemented.");
    }
    public create(): Subtask {
        throw new Error("Method not implemented.");
    }
    public remove(object: Subtask): void {
        throw new Error("Method not implemented.");
    }
    public save(object: Subtask): void {
        throw new Error("Method not implemented.");
    }
    public get(id: string): Subtask {
        throw new Error("Method not implemented.");
    }
    public getAll(): Subtask[] {
        throw new Error("Method not implemented.");
    }
}
