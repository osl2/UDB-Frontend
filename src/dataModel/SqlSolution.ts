import Solution from '@/dataModel/Solution';

/**
 * An instance of the class SqlSolution represents some data from a
 * solution of a sql task. This is either a solution from a student or a solution provided by a teacher.
 * The class SqlSolution extends the class Solution and is meant to be
 * stored as an attribute in the class SqlTask, a subtask of the class Subtask.
 */

export default class SqlSolution extends Solution {

    /**
     * the following methods transform an instance of the SqlSolution class to json format or do the same
     * thing the other way around. This is needed to store objects in the server or to read them.
     */
    get toJSON(): any {
        return {
            sql: {
                query: this.querySolution,
                columns: this.columns,
                rows: this.values,
            },
        };
    }


    /**
     * The following methods are getter and setter for each attribute in this class.
     */

    public get querySolution(): string {
        return this._querySolution;
    }

    public set querySolution(querySolution: string) {
        this._querySolution = querySolution;
    }

    public get columns(): string[] {
        return this._columns;
    }

    public set columns(columns: string[]) {
        this._columns = columns;
    }

    public get values(): string[][] {
        return this._values;
    }

    public set values(value: string[][]) {
        this._values = value;
    }
    public static fromJSON(json: any): SqlSolution {
        return new SqlSolution(json.query, json.columns, json.rows);
    }

    private _querySolution: string;
    private _columns: string[];
    private _values: string[][];


    /**
     * The constructor for this class.
     * @param querySolution: The attribute querySolution represents
     *                       the sql statement which gets executed.
     * @param columns: The attribute columns represents columns of
     *                 the result after executing the querySolution.
     * @param values: The attribute values represents values of
     *                the result after executing the querySolution.
     */
    constructor(querySolution: string, columns: string[], values: string[][]) {
        super();
        this._querySolution = querySolution;
        this._columns = columns;
        this._values = values;
    }
}

