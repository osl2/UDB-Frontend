import Subtask from '@/dataModel/Subtask';
import SubtaskTypes from "@/dataModel/SubtaskTypes";


/**
 * The class InstructionTask represents the type of subtask where the teacher just gives an instruction
 * or an explanation. An InstructionTask must not be answered. Because of that the attribute solution
 * gets set to undefined and the attribute isSolutionVerifiable gets set to false in the constructor.
 */
export default class InstructionTask extends Subtask {

    public static fromJSON(json: any): InstructionTask {
        return new InstructionTask(json.id, json.instruction);
    }

    constructor(id: string, instruction: string) {
        super(id, undefined, instruction, false, false, SubtaskTypes.Instruction);
    }

    public toJSON(): any {
        return {
            id: this.id,
            instruction: this.instruction,
            solution_verifiable: this.isSolutionVeryfiable,
            solution_visible: this.isSolutionVisible,
        };
    }
}
