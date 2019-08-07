/**
 * The abstract class SolutionDiff is a base class for showing differences between solutions
 * of a certain type.
 */
import SqlSolutionDiff from "@/dataModel/SqlSolutionDiff";
import MultipleChoiceSolutionDiff from "@/dataModel/MultipleChoiceSolutionDiff";
import PlainTextSolutionDiff from "@/dataModel/PlainTextSolutionDiff";

export default abstract class SolutionDiff {
    private _same: boolean;

    protected constructor(same: boolean) {
        this._same = same;
    }

    static fromJSON(json: any): SolutionDiff {
        if (json.hasOwnProperty("sql")) {
            return SqlSolutionDiff.fromJSON(json);
        }
        if (json.hasOwnProperty("multiple_choice")) {
            return MultipleChoiceSolutionDiff.fromJSON(json);
        }
        if (json.hasOwnProperty("plaintext")) {
            return PlainTextSolutionDiff.fromJSON(json);
        }
        throw new Error(json.error);
    }


    get same(): boolean {
        return this._same;
    }

    set same(value: boolean) {
        this._same = value;
    }
}