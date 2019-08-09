import SolutionDiff from "@/dataModel/SolutionDiff";

export default class MultipleChoiceSolutionDiff extends SolutionDiff {

    get wrongChoices(): string[][] {
        return this._wrongChoices;
    }

    set wrongChoices(value: string[][]) {
        this._wrongChoices = value;
    }

    get missedChoices(): string[][] {
        return this._missedChoices;
    }

    set missedChoices(value: string[][]) {
        this._missedChoices = value;
    }

    public static fromJSON(json: any): MultipleChoiceSolutionDiff {
        return new MultipleChoiceSolutionDiff(
            json.multiple_choice.same,
            json.multiple_choice.wrong_choices,
            json.multiple_choice.missed_choices,
        );
    }
    private _wrongChoices: string[][];
    private _missedChoices: string[][];

    constructor(same: boolean, wrongChoices: string[][], missedChoices: string[][]) {
        super(same);
        this._missedChoices = missedChoices;
        this._wrongChoices = wrongChoices;
    }
}
