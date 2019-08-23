import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';
import Subtask from '@/dataModel/Subtask';
import SubtaskTypes from '@/dataModel/SubtaskTypes';

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

    /**
     * the following methods transform an instance of the MultipleChoiceTask class to json format or do the same
     * thing the other way around. This is needed to store objects in the server or to read them.
     */
    public static fromJSON(json: any): MultipleChoiceTask {
        return new MultipleChoiceTask(
            json.id,
            json.content.multiple_choice.solution,
            json.instruction,
            json.solution_verifiable,
            json.solution_visible,
            json.content.multiple_choice.answer_options
        );
    }

    private _answerOptions: string[];

    /**
     * the constructor for the MiltipleChoiceTask
     * @param id unique id for an instance of the multipleChoiceTask
     * @param solution a solution of the type MultipleChoiceSolution
     * @param instruction the instruction of the task provided by the teacher
     * @param isSolutionVeryfiable a boolean to decide if a MultipleChoiceTask has a solution
     * @param isSolutionVisible a boolean to the decide if a student can compare its solution to the task solution
     * @param answerOptions a string array that contains all possible answers
     */
    constructor(
        id: string,
        solution: MultipleChoiceSolution | undefined,
        instruction: string,
        isSolutionVeryfiable: boolean,
        isSolutionVisible: boolean,
        answerOptions: string[]
    ) {
        super(id, solution, instruction, isSolutionVeryfiable, isSolutionVisible, SubtaskTypes.MultipleChoice);
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
                    solution: this.solution ? this.solution.toJSON : {},
                },
            },
        };
    }
}
