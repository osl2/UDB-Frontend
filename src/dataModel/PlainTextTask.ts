import Subtask from '@/dataModel/Subtask';
import PlainTextSolution from '@/dataModel/PlainTextSolution';
import SubtaskTypes from "@/dataModel/SubtaskTypes";
import AllowedSqlStatements, {AllowedSqlFromJSON, AllowedSqlToJSON} from "@/dataModel/allowedSqlStatements";


/**
 * The class PlainTextTask represents the type of subtask where an answer just needs
 * to be plain text. Because of that the solution should be an instance of the class
 * PlainTextSolution.
 */
export default class PlainTextTask extends Subtask {

    public static fromJSON(json: any): PlainTextTask {
        return new PlainTextTask(json.id,
            new PlainTextSolution(json.content.plaintext.solution.text),
            json.instruction,
            json.solution_verifiable,
            json.solution_visible,
            AllowedSqlFromJSON(json.allowed_sql));
    }

    constructor(id: string, solution: PlainTextSolution | undefined,
                instruction: string, isSolutionVeryfiable: boolean,
                isSolutionVisible: boolean, allowedSqlStatements: AllowedSqlStatements) {
        super(id, solution, instruction, isSolutionVeryfiable,
            isSolutionVisible, allowedSqlStatements, SubtaskTypes.PlainText);
    }

    public toJSON(): any {
        return {
            id: this.id,
            instruction: this.instruction,
            solution_verifiable: this.isSolutionVeryfiable,
            solution_visible: this.isSolutionVisible,
            allowed_sql: AllowedSqlToJSON(this.allowedSqlStatements),
            content: {
                plaintext: {
                    solution: this.solution ? this.solution.toJSON() : {},
                },
            },
        };
    }
}
