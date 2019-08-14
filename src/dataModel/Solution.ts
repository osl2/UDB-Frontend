/**
 * The abstract class Solution is the parent class to various types of solutions.
 * It represents the students solution to a task (class Task).
 */

export default abstract class Solution {
    protected constructor() {

    }
    public abstract get toJSON(): any;
}
