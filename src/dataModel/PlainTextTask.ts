import Subtask from '@/dataModel/Subtask';
import PlainTextSolution from '@/dataModel/PlainTextSolution';
import SubtaskTypes from '@/dataModel/SubtaskTypes';

/**
 * The class PlainTextTask represents the type of subtask where an answer just needs
 * to be plain text. Because of that the solution should be an instance of the class
 * PlainTextSolution.
 */
export default class PlainTextTask extends Subtask {
    /**
     * the following methods transform an instance of the PlainTextTask class to json format or do the same
     * thing the other way around. This is needed to store objects in the server or to read them.
     */
    public static fromJSON(json: any): PlainTextTask {
        return new PlainTextTask(
            json.id,
            new PlainTextSolution(json.content.plaintext.solution.text),
            json.instruction,
            json.solution_verifiable,
            json.solution_visible
        );
    }

    /**
     * the constructor of the PlainTextTask
     * @param id the unique id for an instance of the PlainTextTask class
     * @param solution a solution of the class PlainTextSolution
     * @param instruction the instruction of the task provided by the teacher
     * @param isSolutionVeryfiable a boolean that indicates if a solution for the task exists
     * @param isSolutionVisible a boolean that indicates if a student can compare it's solution
     */
    constructor(
        id: string,
        solution: PlainTextSolution | undefined,
        instruction: string,
        isSolutionVeryfiable: boolean,
        isSolutionVisible: boolean
    ) {
        super(id, solution, instruction, isSolutionVeryfiable, isSolutionVisible, SubtaskTypes.PlainText);
    }

    public toJSON(): any {
        return {
            id: this.id,
            instruction: this.instruction,
            solution_verifiable: this.isSolutionVeryfiable,
            solution_visible: this.isSolutionVisible,
            content: {
                plaintext: {
                    solution: this.solution ? this.solution.toJSON : {},
                },
            },
        };
    }
}
