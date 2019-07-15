import SqlSolution from '@/dataModel/SqlSolution';
import Subtask from '@/dataModel/Subtask';
import Task from '@/dataModel/Task';

/**
 * The class SqlTask represents the type of subtask where an answer is a sql statement.
 * Because of that the solution should be an instance of the class SqlSolution.
 */
class SqlTask extends Subtask {
    private _isPointAndClickAllowed: boolean;
    private _doesRowOrderMatter: boolean;


    constructor(id: string, parent: Task, solution: SqlSolution | undefined, instruction: string,
                isSolutionVeryfiable: boolean, isPointAndClickAllowed: boolean, doesRowOrderMatter: boolean) {
        super(id, parent, solution, instruction, isSolutionVeryfiable);
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
}
