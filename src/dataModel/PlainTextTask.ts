import Subtask from '@/dataModel/Subtask';
import PlainTextSolution from '@/dataModel/Solution';
import Task from '@/dataModel/Task';

/**
 * The class PlainTextTask represents the type of subtask where an answer just needs
 * to be plain text. Because of that the solution should be an instance of the class
 * PlainTextSolution.
 */
export default class PlainTextTask extends Subtask {

  constructor(id: string, parent: Task, solution: PlainTextSolution | undefined,
              instruction: string, isSolutionVeryfiable: boolean) {
    super(id, parent, solution, instruction, isSolutionVeryfiable);
  }
}
