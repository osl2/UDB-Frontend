import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';
import Subtask from '@/dataModel/Subtask';
import SubtaskTypes from "@/dataModel/SubtaskTypes";


/**
 * The class MultipleChoiceTask represents the type of subtask where there are multiple answers to choose from.
 * Because of that the solution should be an instance of the class MultipleChoiceSolution.
 */
export default class MultipleChoiceTask extends Subtask {

    /**
     * The following methods are getter and setter for the additional attribute in this class.
     */

    get answerOptions(): string[] {
        return this._answerOptions;
    }

    set answerOptions(value: string[]) {
        this._answerOptions = value;
    }

    public static fromJSON(json: any): MultipleChoiceTask {
        return new MultipleChoiceTask(json.id,
            json.content.multiple_choice.solution,
            json.instruction,
            json.solution_verifiable,
            json.solution_visible,
            json.content.multiple_choice.answer_options);
    }
    private _answerOptions: string[];

    constructor(id: string, solution: MultipleChoiceSolution | undefined, instruction: string,
                isSolutionVeryfiable: boolean,  isSolutionVisible: boolean, answerOptions: string[]) {
        super(id, solution, instruction, isSolutionVeryfiable,
            isSolutionVisible, SubtaskTypes.MultipleChoice);
        this._answerOptions = answerOptions;
    }

    public toJSON(): any {
        return {
            id: this.id,
            instruction: this.instruction,
            solution_verifiable: this.isSolutionVeryfiable,
            solution_visible: this.isSolutionVisible,
            content: {
                multiple_choice: {
                    answer_options: this.answerOptions,
                    solution: this.solution ? this.solution.toJSON() : {},
                },
            },
        };
    }
}
