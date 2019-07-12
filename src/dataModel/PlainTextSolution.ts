import Solution from '@/dataModel/Solution';

/**
 * An instance of the class PlainTextSolution represents some data from a
 * students solution of a task where the answer just requires plain text.
 * The class PlainTextSolution extends the class Solution and is meant to be
 * stored as an attribute in the class PlainTextTask, a subtask of the class Subtask.
 */

class PlainTextSolution extends Solution {
    private _text: String;

    /**
     * The constructor for this class.
     * @param text: The attribute text represents the students written answer to the Subtask.
     */
    constructor(text: String){
        super();
        this._text = text;
    }

    /**
     * The following methods are getter and setter for the attribute text.
     */
    get text(): String {
        return this._text;
    }

    set text(value: String) {
        this._text = value;
    }
}