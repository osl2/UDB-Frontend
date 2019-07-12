import Solution from '@/dataModel/Solution';

/**
 * An instance of the class SqlSolution represents some data from a
 * students solution of a sql task.
 * The class SqlSolution extends the class Solution and is meant to be
 * stored as an attribute in the class SqlTask, a subtask of the class Subtask.
 */

export default class SqlSolution extends Solution {
    private _querySolution: String;
    private _columns: String[];
    private _values: String[][];


    /**
     * The constructor for this class.
     * @param querySolution: The attribute querySolution represents
     *                       the sql statement which gets executed.
     * @param columns: The attribute columns represents columns of
     *                 the result after executing the querySolution.
     * @param values: The attribute values represents values of
     *                the result after executing the querySolution.
     */
    constructor(querySolution: String, columns: String[], values: String[][]) {
        super();
        this._querySolution = querySolution;
        this._columns = columns;
        this._values = values;
    }

    /**
     * The following methods are getter and setter for each attribute in this class.
     */

    public get querySolution(): String {
        return this._querySolution;
    }

    public set querySolution(querySolution: String) {
        this._querySolution = querySolution;
    }

    public get columns(): String[] {
        return this._columns;
    }

    public set columns(columns: String[]) {
        this._columns = columns;
    }

    public get values(): String[][] {
        return this._values;
    }

    public set values(value: String[][]) {
        this._values = value;
    }
}

