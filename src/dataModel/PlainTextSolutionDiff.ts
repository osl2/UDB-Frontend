import SolutionDiff from '@/dataModel/SolutionDiff';

/**
 * An instance of a PlaintextChoiceSolutionDiff represents the data returned from the server after comparing the student
 * solution to the solution saved for the subtask / the teacher solution. It gives feedback on the answer
 * expected by a teacher.
 *
 * The class PlainTextSolutionDiff extends the class SolutionDiff.
 */

export default class PlainTextSolutionDiff extends SolutionDiff {
    /**
     * The following methods are getter and setter for the additional attribute in this class.
     */
    get correctAnswer(): string {
        return this._correctAnswer;
    }

    set correctAnswer(value: string) {
        this._correctAnswer = value;
    }
    /**
     * the following method transforms a PlainTextSolutionDiff to an instance of the PlainTextSolutionDiff
     * class.
     * @param json the PlainTextSolutionDiff in json format
     */
    public static fromJSON(json: any): PlainTextSolutionDiff {
        return new PlainTextSolutionDiff(json.plaintext.correct, json.plaintext.correct_answer);
    }
    private _correctAnswer: string;

    /**
     * constructor of the PlainTextSolutionDiff
     * @param same a boolean that indicates if the compared solutions are equal
     * @param correctAnswer the correct answer provided by the teacher
     */
    constructor(same: boolean, correctAnswer: string) {
        super(same);
        this._correctAnswer = correctAnswer;
    }

    /**
     * Creates a string that summarizes the result of the comparison.
     */
    public getFeedbackString(): string {
        return 'Die folgende Antwort wurde von Deinem Lehrer erwartet: ' + this._correctAnswer;
    }
}
