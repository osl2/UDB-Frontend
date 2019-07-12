import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';
import Subtask from '@/dataModel/Subtask';
import Task from '@/dataModel/Task';

/**
 * The class MultipleChoiceTask represents the type of subtask where there are multiple answers to choose from.
 * Because of that the solution should be an instance of the class MultipleChoiceSolution.
 */
class MultipleChoiceTask extends Subtask {
    private _answerOptions: String[];


    constructor(id: String, parent: Task, solution: MultipleChoiceSolution | undefined, instruction: String,
                isSolutionVeryfiable: boolean, answerOptions: String[]) {
        super(id, parent, solution, instruction, isSolutionVeryfiable);
        this._answerOptions = answerOptions;
    }

    /**
     * The following methods are getter and setter for the additional attribute in this class.
     */


    get answerOptions(): String[] {
        return this._answerOptions;
    }

    set answerOptions(value: String[]) {
        this._answerOptions = value;
    }
}