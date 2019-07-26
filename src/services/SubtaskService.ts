import DataManagementService from './DataManagementService';
import Subtask from '@/dataModel/Subtask';

export default interface SubtaskService extends DataManagementService<Subtask> {
    compareSolution(subtask: Subtask): any; // TODO: Set proper return value here
}
