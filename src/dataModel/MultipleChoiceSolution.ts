import Solution from '@/dataModel/Solution';

/**
 * An instance of the class MultipleChoiceSolution represents some data from a
 * students solution of a multiple choice task.
 * The class MultipleChoiceSolution extends the class Solution and is meant to be
 * stored as an attribute in the class MultipleChoiceTask, a subtask of the class Subtask.
 */

export default class MultipleChoiceSolution extends Solution {
    public static fromJSON(json: any): MultipleChoiceSolution {
        return new MultipleChoiceSolution(json.choices);
    }

    private _choices: number[];

    /**
     * The constructor for this class.
     * @param choices: This attribute represents the choice (or choice) the student
     *                 chose to be the answer to the multiple choice task.
     */
    constructor(choices: number[]) {
        super();
        this._choices = choices;
    }

    get toJSON(): any {
        return {
            correct_positions: this.choices,
        };
    }

    /**
     * The following methods are getter and setter for the attribute choices.
     */
    get choices(): number[] {
        return this._choices;
    }

    set choices(value: number[]) {
        this._choices = value;
    }
}
