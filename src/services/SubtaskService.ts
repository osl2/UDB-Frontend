import Subtask from '@/dataModel/Subtask';
import ParentService from "@/services/ParentService";
import Task from "@/dataModel/Task";
import SolutionDiff from "@/dataModel/SolutionDiff";

export default interface SubtaskService extends ParentService<Task, Subtask> {
    compareSolution(subtask: Subtask): Promise<SolutionDiff>;
    getAllWithoutSolution(): Promise<Subtask[]>;
    getWithoutSolution(id: string): Promise<Subtask>;
}
