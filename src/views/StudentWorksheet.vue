<template>

    <div>
        <div v-show="showSheetInstructions">
            <h2>{{worksheet.name}}</h2>
            <WorksheetInstructions v-for="task in tasks"
                                   :task="task"
                                   @openTask="openTask"
                >
            </WorksheetInstructions>
            <b-button @click="exportSheet">Bearbeitungsstand exportieren</b-button>
            <b-button @click="importSheet">Bearbeitungsstand importieren</b-button>
        </div>
        <div>
           <TaskSolve v-show="!showSheetInstructions"
                      :currentSubtask="currentSubtask"
                      :solutions="solutions"
                      @prevSubtask="prevSubtask"
                      @nextSubtask="nextSubtask"
                      @switchback="switchback"
                      @save="save"
                      @reset="reset"
                      @compare="compare"
           >
           </TaskSolve>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

import Worksheet from '@/dataModel/Worksheet.ts';
import Task from '@/dataModel/Task';
import WorksheetController from "@/controller/WorksheetController";
import ParentService from '@/services/ParentService';
import WorksheetInstructions from '@/components/WorksheetInstructions.vue';
import Subtask from '@/dataModel/Subtask';
import TaskController from "@/controller/TaskController";
import TaskSolve from '@/components/TaskSolve.vue';
import InstructionTask from '@/dataModel/InstructionTask';
import Course from "@/dataModel/Course";
import Solution from "@/dataModel/Solution";
import SubtaskService from "@/services/SubtaskService";
import SubtaskController from "@/controller/SubtaskController";

@Component({
    components: {
        WorksheetInstructions,
        TaskSolve,
    },
})
export default class StudentWorksheet extends Vue {


    // computed methods
    get worksheet() {
      if (this.worksheetController.one !== undefined) {
        this.taskController.loadChildren(this.worksheetController.one);
      }
      return this.worksheetController.one;
    }

    get tasks() {
      return this.taskController.all;
    }
    // Data

    // the solution maps an id of a subtask to the students solution.
    private solutions: Map<string, Solution> = new Map<string, Solution>();
    private showSheetInstructions: boolean = true;

    // Attributes for the current chosen Task and Subtasks
    private currentTask: Task = new Task('', '', '', []);
    private currentMatchingSubtasks: Subtask[] = [];
    private currentSubtask: Subtask = new InstructionTask('', '');
    private subtaskIndex: number = 0;

    // Controller
    private worksheetController: ParentService<Course, Worksheet> = new WorksheetController(this.$store.getters.api);
    private taskController: ParentService<Worksheet, Task> = new TaskController(this.$store.getters.api);
    private subtaskController: SubtaskService = new SubtaskController(this.$store.getters.api);


    // methods
    public exportSheet() {
        alert("wird noch implementiert");

    }
    public importSheet() {
        alert("wird noch implementiert");

    }

    public openTask(task: Task, subtasks: Subtask[]) {
        this.showSheetInstructions = false;
        this.setCurrentTask(task, subtasks, 0);
    }

    public prevSubtask() {
        if (this.subtaskIndex === 0) {
            return;
        } else {
            this.subtaskIndex = this.subtaskIndex - 1;
            this.currentSubtask = this.currentMatchingSubtasks[this.subtaskIndex];
        }

    }
    public nextSubtask() {

        if (this.subtaskIndex === this.currentMatchingSubtasks.length - 1) {
            return;
        } else {
            this.subtaskIndex = this.subtaskIndex + 1;
            this.currentSubtask = this.currentMatchingSubtasks[this.subtaskIndex];
        }

    }

    public save(subtaskId: string, subtaskSolution: Solution) {
      // There should always just be one solution per subtask.
      if (this.solutions.has(subtaskId)) {
        this.solutions.delete(subtaskId);
      }
      this.solutions.set(subtaskId, subtaskSolution);
    }

    /*
    * This Method deletes the saved solutions in the solution map for the current Task.
     */
    public reset() {
        for (const subtask of this.currentMatchingSubtasks) {
          if (this.solutions.has(subtask.id)) {
            this.solutions.delete(subtask.id);
          }
        }
    }


    public compare(subtaskSolution: Solution) {
        this.currentSubtask.solution = subtaskSolution;
        this.save(this.currentSubtask.id, subtaskSolution);
        alert('return Wert von compareSolution setzen und abfragen');
        this.subtaskController.compareSolution(this.currentSubtask);
    }


    // method so the worksheet instructions component gets shown.
    public switchback() {
        this.showSheetInstructions = true;
    }

    // lifecycle methods

    public created() {
      this.worksheetController.load(this.$route.params.worksheetId);
    }

    private setCurrentTask(task: Task, subtasks: Subtask[], index: number) {
      this.currentTask = task;
      this.currentMatchingSubtasks = subtasks;
      this.currentSubtask = subtasks[index];
      this.subtaskIndex = index;
    }
}
</script>

<style scoped>

</style>
