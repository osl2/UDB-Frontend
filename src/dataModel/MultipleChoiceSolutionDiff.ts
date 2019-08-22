import SolutionDiff from "@/dataModel/SolutionDiff";

/**
 * An instance of a MultipleChoiceSolutionDiff represents the data returned from the server after comparing the student
 * solution to the solution saved for the subtask / the teacher solution. It gives feedback on wrong and missed choices.
 *
 * The class MultipleChoiceSolutionDiff extends the class SolutionDiff.
 */

export default class MultipleChoiceSolutionDiff extends SolutionDiff {

    /**
     * The following methods are getter and setter for the attribute choices.
     */
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

    /**
     * the following method transforms a multipleChoiceSolutionDiff to an instance of the multipleChoiceSolutionDiff
     * class.
     * @param json the multipleChoiceSolutionDiff in json format
     */
    public static fromJSON(json: any): MultipleChoiceSolutionDiff {
        return new MultipleChoiceSolutionDiff(
            json.multiple_choice.correct,
            json.multiple_choice.wrong_choices,
            json.multiple_choice.missed_choices,
        );
    }

    private _wrongChoices: number[];
    private _missedChoices: number[];

    /**
     * this is the constructor for the MultipleChoiceSolutionDiff
     * @param same a boolean that indicates if the compared solutions were true
     * @param wrongChoices the index of the answers that were chosen from the student but aren't right
     * @param missedChoices index of answers that are right but weren't chosen from the student
     */
    constructor(same: boolean, wrongChoices: number[], missedChoices: number[]) {
        super(same);
        this._missedChoices = missedChoices;
        this._wrongChoices = wrongChoices;
    }

    /**
     * Creates a string that summarizes the missed and wrong choices for the student.
     */
    public getFeedbackString(): string {
        const messages: string[] = [];
        if (this._wrongChoices.length) {
            messages.push("Die folgenden ausgewählten Antworten waren falsch: ");
            for (let i = 0; i < this._wrongChoices.length - 1; i++) {
                messages.push((this._wrongChoices[i] + 1).toString(), ", ");
            }
            messages.push((this._wrongChoices[this._wrongChoices.length - 1] + 1).toString(), ". ");
        }
        if (this._missedChoices.length) {
            messages.push(("Die folgenden Antworten wären noch richtig gewesen: "));
            for (let i = 0; i < this._missedChoices.length - 1; i++) {
                messages.push((this._missedChoices[i] + 1).toString(), ", ");
            }
            messages.push((this._missedChoices[this._missedChoices.length - 1] + 1).toString(), ".");
        }
        return messages.join("");
    }

}
