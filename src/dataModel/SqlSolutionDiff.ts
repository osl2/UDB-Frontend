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

    public getFeedbackString(): string {
        const messages: string[] = [];
        messages.push("Diese Ergebnisreihen waren fälschlicherweise bei Deiner Lösung mit dabei:");
        for (let i = 0; i < this._wrongRows.length; i++) {
            messages.push("\n" + (i + 1) + ". Reihe:", this._wrongRows[i].join(", "));
        }
        messages.push("\nDiese Ergebnisreihen fehlen bei Deiner Lösung:");
        for (let i = 0; i < this._missedRows.length; i++) {
            messages.push("\n" + (i + 1) + ". Reihe:", this._missedRows[i].join(", "));
        }
        return messages.join(" ");
    }
}
