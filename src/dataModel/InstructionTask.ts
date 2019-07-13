import Subtask from '@/dataModel/Subtask';
import Task from '@/dataModel/Task';

/**
 * The class InstructionTask represents the type of subtask where the teacher just gives an instruction
 * or an explanation. An InstructionTask must not be answered. Because of that the attribute solution
 * gets set to undefined and the attribute isSolutionVerifiable gets set to false in the constructor.
 */
export default class InstructionTask extends Subtask{

    constructor(id: String, parent: Task, instruction: String) {
        super(id, parent, undefined, instruction, false);
    }
}