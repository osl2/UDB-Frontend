import Subtask from '@/dataModel/Subtask';
import ParentService from "@/services/ParentService";
import Task from "@/dataModel/Task";

export default interface SubtaskService extends ParentService<Task, Subtask> {
    compareSolution(subtask: Subtask): any; // TODO: Set proper return value here
}
