import SqlSolution from '@/dataModel/SqlSolution';
import Subtask from '@/dataModel/Subtask';
import AllowedSqlStatements, {AllowedSqlFromJSON, AllowedSqlToJSON} from "@/dataModel/allowedSqlStatements";
import SubtaskTypes from "@/dataModel/SubtaskTypes";

/**
 * The class SqlTask represents the type of subtask where an answer is a sql statement.
 * Because of that the solution should be an instance of the class SqlSolution.
 */
export default class SqlTask extends Subtask {

    private _isPointAndClickAllowed: boolean;
    private _doesRowOrderMatter: boolean;

    constructor(id: string, solution: SqlSolution | undefined, instruction: string,
                isSolutionVeryfiable: boolean, isPointAndClickAllowed: boolean, doesRowOrderMatter: boolean,
                isSolutionVisible: boolean, allowedSqlStatements: AllowedSqlStatements) {
        super(id, solution, instruction, isSolutionVeryfiable, isSolutionVisible, allowedSqlStatements, SubtaskTypes.Sql);
        this._isPointAndClickAllowed = isPointAndClickAllowed;
        this._doesRowOrderMatter = doesRowOrderMatter;
    }

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

    static fromJSON(json: any): SqlTask {
        if (!json.hasOwnProperty("content")) {
            return new SqlTask(json.id,
                undefined,
                json.instruction,
                json.solution_verifiable,
                json.point_click_allowed,
                false,
                json.solution_visible,
                AllowedSqlFromJSON(json.allowed_sql));
        }
        if (!json.content.hasOwnProperty("sql")) {
            throw new Error("Wrong subtask type");
        }
        let solution = new SqlSolution(json.content.sql.solution.query,
                json.content.sql.solution.columns,
                json.content.sql.solution.rows);
        return new SqlTask(json.id, solution,
            json.instruction,
            json.solution_verifiable,
            json.point_click_allowed,
            json.content.sql.row_order_matters,
            json.solution_visible,
            AllowedSqlFromJSON(json.allowed_sql));
    }

    toJSON() {
        return {
            id: this.id,
            instruction: this.instruction,
            solution_verifiable: this.isSolutionVeryfiable,
            solution_visible: this.isSolutionVisible,
            allowed_sql: AllowedSqlToJSON(this.allowedSqlStatements),
            content: {
                sql: {
                    row_order_matters: this.doesRowOrderMatter,
                    solution: this.solution ? this.solution.toJSON() : {},
                }
            }
        }
    }
}
