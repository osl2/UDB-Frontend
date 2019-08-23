<template>
    <div>
        <div class="head">
            <h2>
                {{worksheet.name}}
            </h2>
            <b-button @click="toCourseView"> {{$t('teacherWorksheet.toOverview')}}</b-button>
        </div>
        <div>
            <h3>
                Einstellungen
            </h3>
            <!--Section to set options needed for a worksheet -->
            <b-input-group class="col-6">
                <b-input-group-text><span>Name</span></b-input-group-text>
                <b-input v-model="worksheet.name" :placeholder="$t('teacherWorksheet.name')">Name: </b-input>
            </b-input-group>
            <div class="d-flex">
                <b-form-group :label="$t('teacherWorksheet.sheetOnline')" class="col-6">
                    <b-form-radio v-model="worksheet.isOnline" :value="true">{{$t('teacherWorksheet.yes')}}</b-form-radio>
                    <b-form-radio v-model="worksheet.isOnline" :value="false">{{$t('teacherWorksheet.no')}}</b-form-radio>
                </b-form-group>

                <b-form-group :label="$t('teacherWorksheet.solutionOnline')" class="col-6">
                    <b-form-radio v-model="worksheet.isSolutionOnline" :value="true">{{$t('teacherWorksheet.yes')}}</b-form-radio>
                    <b-form-radio v-model="worksheet.isSolutionOnline" :value="false">{{$t('teacherWorksheet.no')}}</b-form-radio>
                </b-form-group>
            </div>
        </div>

        <!--Displays a TaskCreation Component for every Task in the worksheet -->
        <div>
            <h3>
                Aufgaben
            </h3>
            <TaskCreation v-for="task in tasks"
                          :key="task.id"
                          :databases="databases"
                          :initialTask="task"
                          :eventBus="eventBus"
                          @updateTasks="updateTasks"
                          @delete="deleteTask"
            ></TaskCreation>
        </div>
        <!--buttons to create a new Task assigned to the worksheet and to return to the course view -->
        <b-button @click="createTask">{{$t('teacherWorksheet.new')}}</b-button>
        <b-button @click="save" variant="primary">Speichern</b-button>
    </div>
</template>


<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import TaskCreation from '@/components/TaskCreation.vue';
import DatabaseController from "@/controller/DatabaseController";
import WorksheetController from "@/controller/WorksheetController";
import Worksheet from '@/dataModel/Worksheet';
import Task from "@/dataModel/Task";
import TaskController from "@/controller/TaskController";
import Database from "@/dataModel/Database";



@Component({
    components: {
        TaskCreation,
    },
})
export default class TeacherWorksheet extends Vue {

    private databaseController: DatabaseController = this.$store.getters.databaseController;
    private worksheetController: WorksheetController = this.$store.getters.worksheetController;
    private taskController: TaskController = this.$store.getters.taskController;

    private worksheet: Worksheet = new Worksheet('', '', [], false, false);
    private tasks: Task[] = [];
    private databases: Database[] = [];
    private eventBus = new Vue();

    public created() {
      this.databaseController = this.$store.getters.databaseController;
      this.worksheetController = this.$store.getters.worksheetController;
      this.taskController = this.$store.getters.taskController;


      this.worksheetController.get(this.$route.params.worksheetId).then((worksheet: Worksheet) =>
      {
        this.worksheet = worksheet;
        this.taskController.getChildren(this.worksheet).then((tasks: Task[]) => {
          this.tasks = tasks;
        }
        // TODO catchen
      ).catch(() => {});
      }).catch(() => {});


      this.databaseController.getAll().then((databases: Database[]) =>
      {
        this.databases = databases;
        // TODO catchen
      }).catch(() => {});
    }

    public createTask() {
      const task = new Task('', '', '', []);
      this.taskController.create(task)
        .then((taskId: string) => {
            task.id = taskId;
            this.tasks.push(task);
            this.worksheet.taskIds.push(taskId);
            // TODO entfernen, wenn create auf dem Backend auch das Worksheet aktualisiert
            this.worksheetController.save(this.worksheet).then();
          })
        // TODO catchen
        .catch(() => {});
    }



    public deleteTask(task: Task) {
        this.taskController.remove(task).then(() => {
        this.tasks = this.tasks.filter((oldTask: Task) => oldTask.id !== task.id);
        this.worksheet.taskIds = this.worksheet.taskIds.filter((id: string) => id !== task.id);
        // TODO entfernen, wenn delete auf dem Backend auch das Worksheet aktualisiert
        this.worksheetController.save(this.worksheet).then();
        });
    }



    public save() {
      this.eventBus.$emit('save');
      this.worksheetController.save(this.worksheet).then(() =>
      {
        // TODO Sprache auslagern
        alert("Speichern erfolgreich");
      })
      // TODO catchen
        .catch(() => {});
    }
    /*
     this method gets calles whenever a task gets saved in taskCreation.vue. That is so the task
     array in this view can get updated. It just gets called when the save call to the API was successful.
     */
  public updateTasks() {
    this.taskController.getChildren(this.worksheet).then((tasks: Task[]) => {
      this.tasks = tasks;
      // TODO catchen
    }).catch(() => {});
  }



    public toCourseView() {
      this.save();
      this.$router.push('/courseView/' + this.$route.params.courseId);
    }

}
</script>

<style scoped>
    .head {
        padding-top: 15px;
        padding-bottom: 15px;
        margin-bottom: 35px;
        text-align: center;
        background-color: #17a2b8;
        color: white;
    }
</style>
