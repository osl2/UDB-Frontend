<template>
    <div class="mb-5 pb-3 border-dark border-bottom">

        <!-- Shows all the options needed to create or update a task-->
        <div>
            <b-button block variant="info" v-b-toggle="'task-' + task.id">{{task.name}}</b-button>
        </div>
        <b-collapse :id="'task-' + task.id" accordion="tasks-accordion">
            <div>
                <b-form-input v-model="task.name" :placeholder="$t('taskCreation.name')"></b-form-input>
                <b-form-select v-model="task.databaseId" :options="dbOptions"></b-form-select>
            </div>
                <!--Displays a SubtaskCreation component for every subtask in the subtasks array -->
            <div v-if="dbOptions !== null">
                <SubtaskCreation v-for="subtask in subtasks"
                                 :key="subtask.id"
                                 :initialSubtask="subtask"
                                 :eventBus="eventBus"
                                 @delete="deleteSubtask"
                                 @updateSubtasks="updateSubtasks"
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
        </b-collapse>
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
  @Prop() private eventBus!: Vue;

  private taskController: TaskController = this.$store.getters.taskController;
  private subtaskController: SubtaskController = this.$store.getters.subtaskController;

  private task: Task = new Task('', '', '', []);
  private subtasks: Subtask[] = [];
  private showfull: boolean = true;
  private dbOptions: Array<{text: string, value: string}> = [{text: "Wähle eine Datenbank aus", value: ''}];
  private subtaskType: string = "";
  private subtaskTypes: string[] = ["SQL", "Multiple-Choice", "Text", "Instruction"];

    /*
    method is called when the component is created. It loads the databases connected to the user and loads a task
     */
   public created() {
        this.task = this.initialTask;
        this.eventBus.$on('save', this.save);
        this.subtaskController = this.$store.getters.subtaskController;
        this.taskController = this.$store.getters.taskController;
        for (const database of this.databases) {
            this.dbOptions.push({text: database.name, value: database.id});
        }
        this.subtaskController.getChildren(this.task).then((subtasks: Subtask[]) => {
          this.subtasks = subtasks;
          // TODO catchen
        }).catch(() => {});
    }

   public newSqlTask() {
     const subtask = new SqlTask('', new SqlSolution(';', [], [[]]), '',
       false, false, false, false, AllowedSqlStatements.NoRestriction);
        this.subtaskController.create(subtask).then((subtaskId: string) => {
          subtask.id = subtaskId;
          this.subtasks.push(subtask);
          this.task.subtaskIds.push(subtaskId);
          // TODO Methode entfernen, sobald Create auf dem Backend den Task aktualisisert
          this.save();
          // TODO catchen
        }).catch(() => {});
    }
   public newMCTask() {
     const subtask = new MultipleChoiceTask('', new MultipleChoiceSolution([0]), '', false, false, []);
        this.subtaskController.create(subtask).then((subtaskId: string) => {
          subtask.id = subtaskId;
          this.subtasks.push(subtask);
          this.task.subtaskIds.push(subtaskId);
          // TODO Methode entfernen, sobald Create auf dem Backend den Task aktualisisert
          this.save();
          // TODO catchen
        }).catch(() => {});
      }
   public newTextTask() {
     const subtask = new PlainTextTask('', new PlainTextSolution(''), '', false, false);
        this.subtaskController.create(subtask).then((subtaskId: string) => {
          subtask.id = subtaskId;
          this.subtasks.push(subtask);
          this.task.subtaskIds.push(subtaskId);
          // TODO Methode entfernen, sobald Create auf dem Backend den Task aktualisisert
          this.save();
          // TODO catchen
        }).catch(() => {});
      }
   public newInstructionTask() {
     const subtask = new InstructionTask('', '');
        this.subtaskController.create(subtask).then((subtaskId: string) => {
          subtask.id = subtaskId;
          this.subtasks.push(subtask);
          this.task.subtaskIds.push(subtaskId);
          // TODO Methode entfernen, sobald Create auf dem Backend den Task aktualisisert
          this.save();
          // TODO catchen
        }).catch(() => {});
   }


  public save() {
    this.taskController.save(this.task).then(() => {
      this.$emit('updateTasks');
      // TODO Sprache auslagern, bzw auch nicht, Methode wird noch gelöscht
      alert("Subtask wurde Task erfolgreich hinzugefügt");
    });
  }

  /*
   this method gets calles whenever a subtask gets saved in SubtaskCreation.vue. That is so the subtask
   array in this view can get updated. It just gets called when the save call to the API was successful.
   */
  public updateSubtasks(){
     this.subtaskController.getChildren(this.task).then((subtasks: Subtask[]) => {
       this.subtasks = subtasks;
       // TODO catchen
     }).catch(() => {});
  }

  /*
    changes the value of the show full variable to show or hide the options needed to create or update a task
     */
  public changeSize() {
    this.showfull = !this.showfull;
  }

  public deleteSubtask(subtask: Subtask) {
    this.subtaskController.remove(subtask).then(() => {
      this.subtasks = this.subtasks.filter((oldSubtask: Subtask) => oldSubtask.id !== subtask.id);
      this.task.subtaskIds = this.task.subtaskIds.filter((id: string) => id !== subtask.id);
      // TODO entfernen, wenn delete auf dem Backend auch den Task aktualisiert
      this.taskController.save(this.task).then();
    });
  }

  /*
   calls the method deleteTask in TeacherWorksheet.vue to send a delete request to the server and delete it in
   the data of the component.
   */
  public deleteTask() {
    if (confirm(this.$t('subtaskCreation.alertDelete') as string)) {
      this.$emit('delete', this.task);
    }
  }
}
</script>


<style scoped>

</style>