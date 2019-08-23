import Subtask from '@/dataModel/Subtask';
import SubtaskTypes from '@/dataModel/SubtaskTypes';

/**
 * The class InstructionTask represents the type of subtask where the teacher just gives an instruction
 * or an explanation. An InstructionTask must not be answered. Because of that the attribute solution
 * gets set to undefined and the attribute isSolutionVerifiable gets set to false in the constructor.
 */
export default class InstructionTask extends Subtask {
    /**
     * the following methods transform an instance of the InstructionTask class to json format or do the same thing the
     * other way around. This is needed to store objects in the server or to read them.
     */
    public static fromJSON(json: any): InstructionTask {
        return new InstructionTask(json.id, json.instruction);
    }

    /**
     * The constructor of the InstructionTask
     * @param id unique id for a instance of the instruction task
     * @param instruction the instruction for the task that the teacher provided
     */
    constructor(id: string, instruction: string) {
        super(id, undefined, instruction, false, false, SubtaskTypes.Instruction);
    }

    public toJSON(): any {
        return {
            id: this.id,
            instruction: this.instruction,
            solution_verifiable: this.isSolutionVeryfiable,
            solution_visible: this.isSolutionVisible,
            content: 'instruction',
        };
    }
}
