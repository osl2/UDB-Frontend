import SqlSolution from '@/dataModel/SqlSolution';
import Subtask from '@/dataModel/Subtask';
import AllowedSqlStatements, { AllowedSqlFromJSON, AllowedSqlToJSON } from '@/dataModel/AllowedSqlStatements';
import SubtaskTypes from '@/dataModel/SubtaskTypes';

/**
 * The class SqlTask represents the type of subtask where an answer is a sql statement.
 * Because of that the solution should be an instance of the class SqlSolution.
 */
export default class SqlTask extends Subtask {
    /**
     * The following methods are getter and setter for each additional attribute in this class.
     */

    get isPointAndClickAllowed(): boolean {
        return this._isPointAndClickAllowed;
    }

    set isPointAndClickAllowed(value: boolean) {
        this._isPointAndClickAllowed = value;
    }

    get doesRowOrderMatter(): boolean {
        return this._doesRowOrderMatter;
    }

    set doesRowOrderMatter(value: boolean) {
        this._doesRowOrderMatter = value;
    }

    get allowedSqlStatements(): AllowedSqlStatements {
        return this._allowedSqlStatements;
    }

    set allowedSqlStatements(value: AllowedSqlStatements) {
        this._allowedSqlStatements = value;
    }

    /**
     * the following methods transform an instance of the SqlTask class to json format or do the same
     * thing the other way around. This is needed to store objects in the server or to read them.
     */

    public static fromJSON(json: any): SqlTask {
        if (!Object.prototype.hasOwnProperty.call(json.content, 'sql')) {
            throw new Error('Wrong subtask type. Expected SQL, got');
        }
        const solution = new SqlSolution(
            json.content.sql.solution.query,
            json.content.sql.solution.columns,
            json.content.sql.solution.rows
        );
        return new SqlTask(
            json.id,
            solution,
            json.instruction,
            json.solution_verifiable,
            json.content.sql.is_point_and_click_allowed,
            json.content.sql.row_order_matters,
            json.solution_visible,
            AllowedSqlFromJSON(json.content.sql.allowed_sql)
        );
    }

    private _isPointAndClickAllowed: boolean;
    private _doesRowOrderMatter: boolean;
    private _allowedSqlStatements: AllowedSqlStatements;

    /**
     * the constructor for the SqlTask
     * @param id the unique id for an instance of the SqlTask class
     * @param solution a solution of the Type SqlSolution
     * @param instruction the task instruction provided by the teacher
     * @param isSolutionVeryfiable a boolean that indicates whether a solution exists or not
     * @param isPointAndClickAllowed a boolean that indicates whether the Point and Click feature can be used or not
     * @param doesRowOrderMatter a boolean that indicates whether the order of rows should matter for a solution or not
     * @param isSolutionVisible a boolean that indicates whether a student can compare its solution or not
     * @param allowedSqlStatements indicates what kind of sql statements can be used to solve the task
     */
    constructor(
        id: string,
        solution: SqlSolution | undefined,
        instruction: string,
        isSolutionVeryfiable: boolean,
        isPointAndClickAllowed: boolean,
        doesRowOrderMatter: boolean,
        isSolutionVisible: boolean,
        allowedSqlStatements: AllowedSqlStatements
    ) {
        super(id, solution, instruction, isSolutionVeryfiable, isSolutionVisible, SubtaskTypes.Sql);
        this._isPointAndClickAllowed = isPointAndClickAllowed;
        this._doesRowOrderMatter = doesRowOrderMatter;
        this._allowedSqlStatements = allowedSqlStatements;
    }

    public toJSON() {
        return {
            id: this.id,
            instruction: this.instruction,
            solution_verifiable: this.isSolutionVeryfiable,
            solution_visible: this.isSolutionVisible,
            content: {
                sql: {
                    allowed_sql: AllowedSqlToJSON(this.allowedSqlStatements),
                    is_point_and_click_allowed: this.isPointAndClickAllowed,
                    row_order_matters: this.doesRowOrderMatter,
                    solution: this.solution ? this.solution.toJSON.sql : {},
                },
            },
        };
    }
}
