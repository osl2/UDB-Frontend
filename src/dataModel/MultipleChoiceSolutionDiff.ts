import SolutionDiff from "@/dataModel/SolutionDiff";

export default class MultipleChoiceSolutionDiff extends SolutionDiff {

    get wrongChoices(): number[] {
        return this._wrongChoices;
    }

    set wrongChoices(value: number[]) {
        this._wrongChoices = value;
    }

    get missedChoices(): number[] {
        return this._missedChoices;
    }

    set missedChoices(value: number[]) {
        this._missedChoices = value;
    }

    public static fromJSON(json: any): MultipleChoiceSolutionDiff {
        return new MultipleChoiceSolutionDiff(
            json.multiple_choice.same,
            json.multiple_choice.wrong_choices,
            json.multiple_choice.missed_choices,
        );
    }
    private _wrongChoices: number[];
    private _missedChoices: number[];

    constructor(same: boolean, wrongChoices: number[], missedChoices: number[]) {
        super(same);
        this._missedChoices = missedChoices;
        this._wrongChoices = wrongChoices;
    }

    public getFeedbackString(): string {
        const messages: string[] = [];
        messages.push("Die folgenden ausgewählten Antworten waren falsch: ");
        for (let i = 0; i < this._wrongChoices.length - 1; i++) {
            messages.push((this._wrongChoices[i] + 1).toString(), ", ");
        }
        messages.push((this._wrongChoices[this._wrongChoices.length - 1] + 1).toString(), ". ",
          "Die folgenden Antworten wären noch richtig gewesen: ");
        for (let i = 0; i < this._missedChoices.length - 1; i++) {
            messages.push((this._missedChoices[i] + 1).toString(), ", ");
        }
        messages.push((this._missedChoices[this._missedChoices.length - 1] + 1).toString(), ".");
        return messages.join();
    }
}
