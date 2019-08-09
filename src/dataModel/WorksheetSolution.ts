import Worksheet from "@/dataModel/Worksheet";
import Solution from "@/dataModel/Solution";
import DataModel from "@/dataModel/DataModel";

/**
 * The class WorksheetSolution represents a worksheet provided by a teacher together with the appropriate solutions.
 */

export default class WorksheetSolution extends DataModel {

    /**
     * The following methods are getter and setter for each attribute in this class.
     */

    get worksheet(): Worksheet {
        return this._worksheet;
    }

    set worksheet(value: Worksheet) {
        this._worksheet = value;
    }

    get solutions(): Map<string, Solution> {
        return this._solutions;
    }

    set solutions(value: Map<string, Solution>) {
        this._solutions = value;
    }

    public static fromJSON(json: string): WorksheetSolution {
        const obj = JSON.parse(json);
        return new WorksheetSolution(obj.worksheet, obj.solutions);
    }

    private _worksheet: Worksheet;
    private _solutions: Map<string, Solution>;

    /**
     * The constructor of this class.
     * @param worksheet: The internal worksheet obeject.
     * @param solutions: Map linking taskIds to their userprovided solutions.
     */
    constructor(worksheet: Worksheet, solutions: Map<string, Solution>) {
        super(worksheet.id);
        this._worksheet = worksheet;
        this._solutions = solutions;
    }



    public toJSON(): any {
        const solutionObject: {[k: string]: any} = {};
        this.solutions.forEach((value: Solution, key: string) => {
            solutionObject[key] = value;
        });

        return {
            worksheet: this.worksheet,
            solutions: solutionObject,
        };
    }
}


