import SolutionDiff from "@/dataModel/SolutionDiff";

export default class SqlSolutionDiff extends SolutionDiff {

    get wrongRows(): string[][] {
        return this._wrongRows;
    }

    set wrongRows(value: string[][]) {
        this._wrongRows = value;
    }

    get missedRows(): string[][] {
        return this._missedRows;
    }

    set missedRows(value: string[][]) {
        this._missedRows = value;
    }

    public static fromJSON(json: any): SqlSolutionDiff {
        return new SqlSolutionDiff(
            json.sql.same,
            json.sql.wrong_rows,
            json.sql.missed_rows,
        );
    }
    private _wrongRows: string[][];
    private _missedRows: string[][];

    constructor(same: boolean, wrongRows: string[][], missedRows: string[][]) {
        super(same);
        this._missedRows = missedRows;
        this._wrongRows = wrongRows;
    }
}
