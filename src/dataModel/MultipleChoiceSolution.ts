import Solution from '@/dataModel/Solution';

/**
 * An instance of the class MultipleChoiceSolution represents some data from a
 * solution of a multiple choice task. This solution is either a solution provided by the teacher or a solution from
 * a student.
 * The class MultipleChoiceSolution extends the class Solution and is meant to be
 * stored as an attribute in the class MultipleChoiceTask, a subtask of the class Subtask.
 */

export default class MultipleChoiceSolution extends Solution {
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

    /**
     * the following methods transform an instance of the MultipleChoiceSolution class to json format or do the same
     * thing the other way around. This is needed to store objects in the server or to read them.
     */
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
}
