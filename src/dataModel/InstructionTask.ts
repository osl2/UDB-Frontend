import Subtask from '@/dataModel/Subtask';
import SubtaskTypes from "@/dataModel/SubtaskTypes";
import AllowedSqlStatements, {AllowedSqlToJSON} from "@/dataModel/allowedSqlStatements";


/**
 * The class InstructionTask represents the type of subtask where the teacher just gives an instruction
 * or an explanation. An InstructionTask must not be answered. Because of that the attribute solution
 * gets set to undefined and the attribute isSolutionVerifiable gets set to false in the constructor.
 */
export default class InstructionTask extends Subtask {

    constructor(id: string, instruction: string, allowedSqlStatements: AllowedSqlStatements) {
        super(id, undefined, instruction, false, false, allowedSqlStatements, SubtaskTypes.Instruction);
    }

    static fromJSON(json: any): InstructionTask {
        return new InstructionTask(json.id, json.instruction, json.allowed_sql);
    }

    toJSON(): any {
        return {
            id: this.id,
            instruction: this.instruction,
            solution_verifiable: this.isSolutionVeryfiable,
            solution_visible: this.isSolutionVisible,
            allowed_sql: AllowedSqlToJSON(this.allowedSqlStatements)
        }
    }
}
