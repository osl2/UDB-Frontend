import Solution from '@/dataModel/Solution';
import DataModel from '@/dataModel/DataModel';
import Task from '@/dataModel/Task';

/**
 * The abstract class Subtask represents a subtask of a task.
 * There will be various subtasks extending this class specifying the solution type.
 */

export default abstract class Subtask extends DataModel {

    private _parent: Task | undefined; // This attribute gets set when assigning it to a Task
    private _solution: Solution | undefined; // A subtask does not always have a solution
    private _instruction: string;
    private _isSolutionVeryfiable: boolean;
    private _type: string;


    /**
     * The constructor for this class.
     * @param id: This attribute represents the ID of an Subtask.
     * @param solution: This attribute represents the students solution to a task.
     * @param instruction: This attribute represents the textual instruction for a subtask.
     * @param isSolutionVeryfiable: This attribute tells if the teacher inserted a solution and
     *                              set the option for the student to verify their solution with it.
     */
    constructor(id: string, solution: Solution | undefined,
                instruction: string, isSolutionVeryfiable: boolean, type: string) {
        super(id);
        this._solution = solution;
        this._instruction = instruction;
        this._isSolutionVeryfiable = isSolutionVeryfiable;
        this._type = type;
    }

    /**
     * The following methods are getter and setter for each attribute in this class.
     */

    get parent(): any {
        return this._parent;
    }

    set parent(value: any) {
        this._parent = value;
    }

    get solution(): Solution | undefined {
        return this._solution;
    }

    set solution(value: Solution | undefined) {
        this._solution = value;
    }

    get instruction(): string {
        return this._instruction;
    }

    set instruction(value: string) {
        this._instruction = value;
    }

    get isSolutionVeryfiable(): boolean {
        return this._isSolutionVeryfiable;
    }

    set isSolutionVeryfiable(value: boolean) {
        this._isSolutionVeryfiable = value;
    }
    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }
}
