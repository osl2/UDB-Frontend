import SolutionDiff from "@/dataModel/SolutionDiff";

export default class PlainTextSolutionDiff extends SolutionDiff {

    get correctAnswer(): string {
        return this._correctAnswer;
    }

    set correctAnswer(value: string) {
        this._correctAnswer = value;
    }

    public static fromJSON(json: any): PlainTextSolutionDiff {
        return new PlainTextSolutionDiff(
            json.plaintext.same,
            json.plaintext.correct_answer,
        );
    }
    private _correctAnswer: string;

    constructor(same: boolean, correctAnswer: string) {
        super(same);
        this._correctAnswer = correctAnswer;
    }
}
