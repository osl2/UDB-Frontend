/**
 * The abstract class SolutionDiff is a base class for showing differences between solutions
 * of a certain type.
 */

export default abstract class SolutionDiff {
    private _same: boolean;

    protected constructor(same: boolean) {
        this._same = same;
    }

    get same(): boolean {
        return this._same;
    }

    set same(value: boolean) {
        this._same = value;
    }
}