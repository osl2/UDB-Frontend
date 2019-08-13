<template>
    <div>
        <!-- A minimized version of the task that doesn't show the options to make the page
        less cluttered when working on several tasks-->
        <div v-if="!showfull">
            <div class="bg-secondary text-light">
                {{task.name}}
            </div>
            <b-button @click="changeSize"> {{$t('taskCreation.maximize')}}</b-button>
        </div>

        <!-- Shows all the options needed to create or update a task-->
        <div v-if="showfull">
            {{task.name}}
        <div>
            <b-form-input v-model="task.name" :placeholder="$t('taskCreation.name')"></b-form-input>
            <b-form-select v-model="task.databaseId" :options="dbOptions"></b-form-select>
        </div>
            <!--Displays a SubtaskCreation component for every subtask in the subtasks array -->
        <div v-if="dbOptions !== null">
            <SubtaskCreation v-for="subtask in subtasks"
                             :key="subtask.id"
                             :dbId="task.databaseId"
                             :initialSubtask="subtask"
                             @save="save"
                             @deleteSubtask="deleteSubtask"
                             @createSubtask="createSubtask"
            ></SubtaskCreation>
        </div>
        <div>
            <b-button-group>
            <b-button @click="newSqlTask">{{$t('taskCreation.new')}} SQL</b-button>
            <b-button @click="newMCTask">{{$t('taskCreation.new')}} MC</b-button>
            <b-button @click="newTextTask">{{$t('taskCreation.new')}} Text</b-button>
            <b-button @click="newInstructionTask">{{$t('taskCreation.new')}} Instruction</b-button>
            </b-button-group>
        </div>

        <b-button @click="changeSize"> {{$t('taskCreation.minimize')}}</b-button>
    </div>
    </div>
</template>

<script lang ="ts">
import Vue from 'vue';
import SubtaskCreation from '@/components/SubtaskCreation.vue';
import Subtask from "@/dataModel/Subtask";
import SqlTask from "@/dataModel/SqlTask";
import AllowedSqlStatements from "@/dataModel/AllowedSqlStatements";
import MultipleChoiceTask from "@/dataModel/MultipleChoiceTask";
import PlainTextTask from "@/dataModel/PlainTextTask";
import InstructionTask from "@/dataModel/InstructionTask";
import SqlSolution from "@/dataModel/SqlSolution";
import MultipleChoiceSolution from "@/dataModel/MultipleChoiceSolution";
import PlainTextSolution from "@/dataModel/PlainTextSolution";
import Component from "vue-class-component";
import {Prop, Watch} from "vue-property-decorator";
import Database from "@/dataModel/Database";
import Task from "@/dataModel/Task";
import TaskController from "@/controller/TaskController";
import SubtaskController from "@/controller/SubtaskController";

@Component({
  components: {SubtaskCreation},
})
export default class TaskCreation extends Vue {

  @Prop() private databases!: Database[];
  @Prop() private initialTask!: Task;

  private task: Task = new Task('', '', '', []);
  private showfull: boolean = true;
  private dbOptions: Array<{text: string, value: string}> = [{text: "Wähle eine Datenbank aus", value: ''}];
  private subtaskType: string = "";
  private subtaskTypes: string[] = ["SQL", "Multiple-Choice", "Text", "Instruction"];
  private taskController: TaskController = this.$store.getters.taskController;
  private subtaskController: SubtaskController = this.$store.getters.subtaskController;

    /*
    method is called when the component is created. it loads the databases connected to the user and loads a task
    if one was given
     */
   public created() {
        this.task = this.initialTask;
        this.subtaskController = this.$store.getters.subtaskController;
        this.taskController = this.$store.getters.taskController;
        for (const database of this.databases) {
            this.dbOptions.push({text: database.name, value: database.id});
        }
        this.subtaskController.loadChildren(this.task);
    }

   get subtasks(): Subtask[] {
     const subtasks = this.subtaskController.getChildren(this.task);
     return this.subtaskController.all && subtasks;
   }

      // creates a new entry in the subtask array
   public createSubtask() {
     switch (this.subtaskType) {
       case "SQL":
         this.newSqlTask();
         break;
       case "Multiple-Choice":
         this.newMCTask();
         break;
       case "Text":
         this.newTextTask();
         break;
       case "Instruction":
         this.newInstructionTask();
         break;
     }
   }

   public newSqlTask() {
        this.subtaskController.create(
          new SqlTask('', new SqlSolution('', [], [[]]), '',
            false, false, false, false, AllowedSqlStatements.NoRestriction),
        ).then((subtaskId: string) => {
          this.task.subtaskIds.push(subtaskId);
          this.save();
        });
    }
   public newMCTask() {
        this.subtaskController.create(
          new MultipleChoiceTask('', new MultipleChoiceSolution([]), '', false, false, []),
        ).then((subtaskId: string) => {
          this.task.subtaskIds.push(subtaskId);
          this.save();
        });
      }
   public newTextTask() {
        this.subtaskController.create(
          new PlainTextTask('', new PlainTextSolution(''), '', false, false),
        ).then((subtaskId: string) => {
          this.task.subtaskIds.push(subtaskId);
          this.save();
        });
      }
   public newInstructionTask() {
        this.subtaskController.create(
          new InstructionTask('', ''),
        ).then((subtaskId: string) => {
          this.task.subtaskIds.push(subtaskId);
          this.save();
        });
   }

      /*
        sends a create request to the server if the task defined by the component is new
        or sends an update request to the server if an existing task was changed
        emits the save call to the TeacherWorksheet view to also update the worksheet.
        this is needed to ensure that a task always has a worksheet it is assigned to, even if the website is
        closed during the creation
        index: the index where the subtask can be found that was saved and started the save call
        subtaskId: id of the subtask that was changed
     */
  public save() {
    this.taskController.save(this.task);
  }

  /*
    changes the value of the show full variable to show or hide the options needed to create or update a task
     */
  public changeSize() {
    this.showfull = !this.showfull;
  }

  /*
    sends a request to the server to delete the task that is currently displayed in this component.
    emits a delete and taskindex to the teacherworksheet to also delete the task from the array of tasks assigned
    to the worksheet
     */
  public deleteTask() {
    if (confirm(this.$t('subtaskCreation.alertDelete') as string)) {
      this.taskController.remove(this.task);
      this.$emit('delete', this.task);
    }
  }
}
</script>


<style scoped>

</style>
