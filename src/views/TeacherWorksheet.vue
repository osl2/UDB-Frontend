<template>
    <div>
        {{worksheet.name}}
        <!--Section to set options needed for a worksheet -->
    <div>
        <b-form-input v-model="worksheetName" :placeholder="$t('teacherWorksheet.name')"></b-form-input>
        <b-form-group :label="$t('teacherWorksheet.sheetOnline')">
            <b-form-radio v-model="worksheet.isOnline" :value="true">{{$t('teacherWorksheet.yes')}}</b-form-radio>
            <b-form-radio v-model="worksheet.isOnline" :value="false">{{$t('teacherWorksheet.no')}}</b-form-radio>
        </b-form-group>

        <b-form-group :label="$t('teacherWorksheet.solutionOnline')">
            <b-form-radio v-model="worksheet.isSolutionOnline" :value="true">{{$t('teacherWorksheet.yes')}}</b-form-radio>
            <b-form-radio v-model="worksheet.isSolutionOnline" :value="false">{{$t('teacherWorksheet.no')}}</b-form-radio>
        </b-form-group>
    </div>

        <!--Displays a TaskCreation Component for every Task in the worksheet -->
        <div>
            <TaskCreation v-for="task in tasks"
                          :key="task.id"
                          :databases="databases"
                          :task="task"
                          @save="save"
                          @delete="deleteTask"
            ></TaskCreation>
        </div>
        <!--buttons to create a new Task assigned to the worksheet and to return to the course view -->
        <b-button @click="createTask">{{$t('teacherWorksheet.new')}}</b-button>
        <b-button @click="toCourseView"> {{$t('teacherWorksheet.toOverview')}}</b-button>
    </div>
</template>


<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import TaskCreation from '@/components/TaskCreation.vue';
import DatabaseController from "@/controller/DatabaseController";
import WorksheetController from "@/controller/WorksheetController";
import Worksheet from '@/dataModel/Worksheet';
import CourseController from "@/controller/CourseController";
import Task from "@/dataModel/Task";
import TaskController from "@/controller/TaskController";



@Component({
    components: {
        TaskCreation,
    },
})
export default class TeacherWorksheet extends Vue {

    get databases() {
        return this.databaseController.all;
    }

    /*
    returns a worksheet and calls the setVar method to update the variables to match the worksheet.
    this is used when an existing worksheet is loaded not when a new one is created
     */
    get worksheet(): Worksheet {
      let tempWorksheet = new Worksheet('', '', [], false, false);
      try {
        tempWorksheet = this.worksheetController.get(this.$route.params.worksheetId);
      } catch (e) {
        return tempWorksheet;
      }
      return tempWorksheet;
    }
    @Watch('worksheet')
    public onWorksheetChange(value: Worksheet, oldValue: Worksheet) {
      if (value === undefined) {
        return;
      }
      if (oldValue === undefined || value.id !== oldValue.id) {
        this.taskController.loadChildren(value);
      }
    }

    get tasks(): Task[] {
      return this.taskController.all && this.taskController.getChildren(this.worksheet);
    }
    @Watch('tasks')
    public onTasksChange(value: Task[], oldValue: Task[]) {
      if (value === undefined) {
        return;
      }
      console.log(value, oldValue);
      if (value.length !== oldValue.length || !value.every((task: Task, index: number) => oldValue[index].id === task.id)) {
        this.worksheet.taskIds = value.map((task: Task) => task.id);
        this.worksheetController.save(this.worksheet);
        console.log(this.worksheet.taskIds);
        this.taskController.loadChildren(this.worksheet);
      }
    }

    public index: number = 1;
    private databaseController: DatabaseController = this.$store.getters.databaseController;
    private worksheetController: WorksheetController = this.$store.getters.worksheetController;
    private courseController: CourseController = this.$store.getters.courseController;
    private taskController: TaskController = this.$store.getters.taskController;

    public created() {
      this.databaseController = this.$store.getters.databaseController;
      this.worksheetController = this.$store.getters.worksheetController;
      this.courseController = this.$store.getters.courseController;
      this.taskController = this.$store.getters.taskController;

      this.courseController.loadWithAlias(this.$route.params.courseId);
      this.worksheetController.load(this.$route.params.worksheetId);
    }

    public createTask() {
        this.taskController.create(new Task('', '', '', []))
          .then((taskId: string) => {
            this.worksheet.taskIds.push(taskId);
          });
    }

    public deleteTask(task: Task) {
        this.taskController.remove(task);
        this.worksheet.taskIds = this.worksheet.taskIds.filter((id: string) => id !== task.id);
        this.worksheetController.save(this.worksheet);
    }
}
</script>

<style scoped>

</style>
