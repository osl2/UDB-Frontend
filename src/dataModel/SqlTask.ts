import SqlSolution from '@/dataModel/SqlSolution';
import Subtask from '@/dataModel/Subtask';
import AllowedSqlStatements from "@/dataModel/allowedSqlStatements";

/**
 * The class SqlTask represents the type of subtask where an answer is a sql statement.
 * Because of that the solution should be an instance of the class SqlSolution.
 */
export default class SqlTask extends Subtask {

    private _isPointAndClickAllowed: boolean;
    private _doesRowOrderMatter: boolean;
    private _allowedSqlStatements: AllowedSqlStatements;
    
    constructor(id: string, solution: SqlSolution | undefined, instruction: string,
                isSolutionVeryfiable: boolean, isPointAndClickAllowed: boolean, doesRowOrderMatter: boolean,
                allowedSqlStatements: AllowedSqlStatements) {
        super(id, solution, instruction, isSolutionVeryfiable, 'sql');
        this._isPointAndClickAllowed = isPointAndClickAllowed;
        this._doesRowOrderMatter = doesRowOrderMatter;
        this._allowedSqlStatements = allowedSqlStatements;
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
    get allowedSqlStatements(): AllowedSqlStatements {
        return this._allowedSqlStatements;
    }

    set allowedSqlStatements(value: AllowedSqlStatements) {
        this._allowedSqlStatements = value;
    }
}
