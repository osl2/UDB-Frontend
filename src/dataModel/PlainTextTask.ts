import Subtask from '@/dataModel/Subtask';
import PlainTextSolution from "@/dataModel/Solution";

/**
 * The class PlainTextTask represents the type of subtask where an answer just needs
 * to be plain text. Because of that the solution should be an instance of the class
 * PlainTextSolution.
 */
export default class PlainTextTask extends Subtask{

    constructor(id: String, parent: any, solution: PlainTextSolution | undefined,
                instruction: String, isSolutionVeryfiable: boolean) {
        super(id, parent, solution, instruction, isSolutionVeryfiable);
    }
}