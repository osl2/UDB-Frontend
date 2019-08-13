import Solution from '@/dataModel/Solution';

/**
 * An instance of the class PlainTextSolution represents some data from a
 * students solution of a task where the answer just requires plain text.
 * The class PlainTextSolution extends the class Solution and is meant to be
 * stored as an attribute in the class PlainTextTask, a subtask of the class Subtask.
 */

export default class PlainTextSolution extends Solution {
    public static fromJSON(json: any): PlainTextSolution {
        return new PlainTextSolution(json.text);
    }

    private _text: string;

    /**
     * The constructor for this class.
     * @param text: The attribute text represents the students written answer to the Subtask.
     */
    constructor(text: string) {
        super();
        this._text = text;
    }

    get toJSON(): any {
        return {
            text: this.text,
        };
    }

    /**
     * The following methods are getter and setter for the attribute text.
     */
    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }
}
