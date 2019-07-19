import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';
import Subtask from '@/dataModel/Subtask';
import Task from '@/dataModel/Task';

/**
 * The class MultipleChoiceTask represents the type of subtask where there are multiple answers to choose from.
 * Because of that the solution should be an instance of the class MultipleChoiceSolution.
 */
class MultipleChoiceTask extends Subtask {
    private _answerOptions: string[];


    constructor(id: string, parent: Task, solution: MultipleChoiceSolution | undefined, instruction: string,
                isSolutionVeryfiable: boolean, answerOptions: string[]) {
        super(id, parent, solution, instruction, isSolutionVeryfiable);
        this._answerOptions = answerOptions;
    }

    /**
     * The following methods are getter and setter for the additional attribute in this class.
     */


    get answerOptions(): string[] {
        return this._answerOptions;
    }

    set answerOptions(value: string[]) {
        this._answerOptions = value;
    }
}
