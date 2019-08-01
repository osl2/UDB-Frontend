import Subtask from '@/dataModel/Subtask';


/**
 * The class InstructionTask represents the type of subtask where the teacher just gives an instruction
 * or an explanation. An InstructionTask must not be answered. Because of that the attribute solution
 * gets set to undefined and the attribute isSolutionVerifiable gets set to false in the constructor.
 */
export default class InstructionTask extends Subtask {

    constructor(id: string, instruction: string) {
        super(id, undefined, instruction, false, 'instruction');
    }
}
