import SolutionDiff from "@/dataModel/SolutionDiff";

/**
 * An instance of a SqlSolutionDiff represents the data returned from the server after comparing the student
 * solution to the solution saved for the subtask / the teacher solution. It gives feedback on wrong and missed rows.
 *
 * The class SqlSolutionDiff extends the class SolutionDiff.
 */

export default class SqlSolutionDiff extends SolutionDiff {

    /**
     * The following methods are getter and setter for each additional attribute in this class.
     */

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



    /**
     * the following method transforms a SqlSolutionDiff to an instance of the SqlSolutionDiff
     * class.
     * @param json the PlainTextSolutionDiff in json format
     */
    public static fromJSON(json: any): SqlSolutionDiff {
        return new SqlSolutionDiff(
            json.sql.correct,
            json.sql.wrong_rows,
            json.sql.missed_rows,
        );
    }
    private _wrongRows: string[][];
    private _missedRows: string[][];

    /**
     * the constructor for the SqlSolutionDiff
     * @param same a boolean that indicates wheter the compared solutions are the same or not
     * @param wrongRows the rows the student falesly included in its result
     * @param missedRows the rows the student didn't include in its result
     */
    constructor(same: boolean, wrongRows: string[][], missedRows: string[][]) {
        super(same);
        this._missedRows = missedRows;
        this._wrongRows = wrongRows;
    }

    /**
     * Creates a string that summarizes the result of the comparison. It includes false and missed rows.
     */
    public getFeedbackString(): string {
        const messages: string[] = [];
        if (this._wrongRows.length) {
            messages.push("Diese Ergebnisreihen waren fälschlicherweise bei Deiner Lösung mit dabei:");
            for (let i = 0; i < this._wrongRows.length; i++) {
                messages.push("\n" + (i + 1) + ". Reihe:", this._wrongRows[i].join(", "));
            }
        }
        if (this._missedRows.length) {
                messages.push("\nDiese Ergebnisreihen fehlen bei Deiner Lösung:");
                for (let i = 0; i < this._missedRows.length; i++) {
                messages.push("\n" + (i + 1) + ". Reihe:", this._missedRows[i].join(", "));
            }
        }
        return messages.join(" ");
    }
}
