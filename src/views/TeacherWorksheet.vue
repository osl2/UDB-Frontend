<template>
    <div>
        {{worksheet.name}}
    <div>
        <b-form-input v-model="worksheetName" placeholder="Name des Worksheets"></b-form-input>
        <b-form-group label="Ist das Worksheet für Schüler online?">
            <b-form-radio v-model="isOnline" :value="true">ja</b-form-radio>
            <b-form-radio v-model="isOnline" :value="false">nein</b-form-radio>
        </b-form-group>
        <b-form-group label="Ist das Lösungsblatt für Schüler einsehbar?">
            <b-form-radio v-model="isSolutionOnline" :value="true">ja</b-form-radio>
            <b-form-radio v-model="isSolutionOnline" :value="false">nein</b-form-radio>
        </b-form-group>
    </div>
        <div>
            <TaskCreation v-for="task in tasks"
                          :key="task.index"
                          :databases="databases"
                          :taskIndex="index"
                          :taskId="task.id"
                          @save="save"
                          @delete="deleteTask"
            ></TaskCreation>
        </div>
        <b-button @click="newTask"> Teilaufgabe erstellen</b-button>
    </div>
</template>


<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import TaskCreation from '@/components/TaskCreation.vue';
import DatabaseController from "@/controller/DatabaseController";
import WorksheetController from "@/controller/WorksheetController";
import Worksheet from '@/dataModel/Worksheet';
import CourseController from "@/controller/CourseController";



@Component({
    components: {
        TaskCreation,
    },
})
export default class TeacherWorksheet extends Vue {

    get databases() {
        return this.databaseController.all;
    }
    get worksheet(): Worksheet {
        const tempWorksheet = this.worksheetController.get(this.$route.params.worksheetId);
        this.setSheetVars(tempWorksheet);
        return tempWorksheet;

    }
    public worksheetName!: string;
    public isOnline: boolean = false;
    public isSolutionOnline: boolean = false;
    public index: number = 1;
    public tasks = [{taskId: '', index: 0}];
    public taskIds: string[] = [];
    private databaseController: DatabaseController = new DatabaseController(this.$store.getters.api);
    private worksheetController: WorksheetController = new WorksheetController(this.$store.getters.api);
    private courseController: CourseController = new CourseController(this.$store.getters.api);
    public newTask() {
        this.tasks.push({taskId: '', index: this.index});
        this.index++;
    }

    public addTask(index: number, taskid: string) {

        for (const task of this.tasks) {
            if (task.index === index) {
                task.taskId = taskid;

                return;
            }
        }
    }
    public created() {
        this.courseController.load(this.$route.params.courseId);
        if (this.$route.params.worksheetId === '') {
            return;
        } else {
            this.worksheetController.load(this.$route.params.worksheetId);

        }
    }
    public save(index: number, taskid: string) {
        let tempWs: Worksheet;
        this.addTask(index, taskid);
        this.taskIds = [];
        for (const task of this.tasks) {
            this.taskIds.push(task.taskId);
        }
        tempWs = new Worksheet(this.$route.params.worksheetId, this.worksheetName,
            this.taskIds, this.isOnline, this.isSolutionOnline);
        if (this.$route.params.worksheetId === '') {
            this.worksheetController.create(tempWs);
            const tempCourse = this.courseController.get(this.$route.params.courseId);
            tempCourse.worksheetIds.push(tempWs.id);
            this.courseController.save(tempCourse);
        } else {
            this.worksheetController.save(tempWs);
        }


    }
    public deleteTask(taskIndex: number) {
        const tempTasks: object[] = [];
        let tempindex: number = 0;
        for (const task of this.tasks) {
            if (task.index !== taskIndex) {
                tempTasks.push({taskId: task.taskId, index: tempindex}) ;
                tempindex++;
            }
        }

    }
    private setSheetVars( worksheet: Worksheet) {
        this.index = 1;
        this.worksheetName = worksheet.name;
        this.isOnline = worksheet.isOnline;
        this.isSolutionOnline = worksheet.isSolutionOnline;
        this.taskIds = worksheet.taskIds;
        this.tasks = [];
        for (const taskid of this.taskIds) {
            this.tasks.push({taskId: taskid, index: this.index});
            this.index++;
        }

    }



}
</script>

<style scoped>

</style>
