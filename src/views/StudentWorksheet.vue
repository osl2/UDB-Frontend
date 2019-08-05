<template>

    <div>
       <WorksheetInstructions v-show="showSheetInstructions"
                               :tasks="tasks"
                               :subtasks="subtasks"
                               @openTask="openTask"
                               @exportSheet="exportSheet"
                               @importSheet="importSheet"
                                >
       </WorksheetInstructions>
       <TaskSolve v-show="!showSheetInstructions"
                  :currentSubtask="currentSubtask"
                  @prevSubtask="prevSubtask"
                  @nextSubtask="nextSubtask"
                  @switchback="switchback"
                  @save="save"
                  @reset="reset"
                  @compare="compare"
       >
       </TaskSolve>
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

@Component({
    components: {
        WorksheetInstructions,
        TaskSolve,
    },
})
export default class StudentWorksheet extends Vue {
    // Data
    private subtasks: Subtask[][] = [];
    private currentTask: Task = new Task('', '', '', []);
    private currentMatchingSubtasks!: Subtask[];
    private currentSubtask: Subtask = new InstructionTask('', '');
    private subtaskIndex: number = 0;
    private showSheetInstructions: boolean = true;
    private worksheetController: ParentService<Course, Worksheet> = new WorksheetController(this.$store.getters.api);
    private taskController: ParentService<Worksheet, Task> = new TaskController(this.$store.getters.api);

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
        alert("öffne Task zum bearbeiten " + task.name);
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

    public created() {
        this.worksheetController.load(this.$route.params.worksheetId);
    }

    private save() {
        alert("wird noch implementiert");
    }
    private reset() {
        alert("wird auch noch implementiert");
    }
    private compare() {
        alert("wird ebenfalls noch implementiert");
    }
    private setCurrentTask(task: Task, subtasks: Subtask[], index: number) {
        this.currentTask = task;
        this.currentMatchingSubtasks = subtasks;
        this.currentSubtask = subtasks[index];
        this.subtaskIndex = index;
    }
    private switchback() {
        this.showSheetInstructions = true;
    }


    get worksheet() {
      if (this.worksheetController.one !== undefined) {
        this.taskController.loadChildren(this.worksheetController.one);
      }
      return this.worksheetController.one;
    }

    get tasks() {
      return this.taskController.all;
    }
}
</script>

<style scoped>

</style>
