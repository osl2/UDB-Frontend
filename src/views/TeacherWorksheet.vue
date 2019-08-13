<template>
    <div>
        {{worksheet.name}}
        <!--Section to set options needed for a worksheet -->
    <div>
        <b-form-input v-model="worksheetName" placeholder="{{$t('teacherWorksheet.name')}}"></b-form-input>
        <b-form-group label="{{$t('teacherWorksheet.sheetOnline')}}">
            <b-form-radio v-model="isOnline" :value="true">{{$t('teacherWorksheet.yes')}}</b-form-radio>
            <b-form-radio v-model="isOnline" :value="false">{{$t('teacherWorksheet.no')}}</b-form-radio>
        </b-form-group>

        <b-form-group label="{{$t('teacherWorksheet.solutionOnline')}}">
            <b-form-radio v-model="isSolutionOnline" :value="true">{{$t('teacherWorksheet.yes')}}</b-form-radio>
            <b-form-radio v-model="isSolutionOnline" :value="false">{{$t('teacherWorksheet.no')}}</b-form-radio>
        </b-form-group>
    </div>

        <!--Displays a TaskCreation Component for every Task in the worksheet -->
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
        <!--buttons to create a new Task assigned to the worksheet and to return to the course view -->
        <b-button @click="newTask">{{$t('teacherWorksheet.new')}}</b-button>
        <b-button @click="toCourseView"> {{$t('teacherWorksheet.toOverview')}}</b-button>
    </div>
</template>


<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import TaskCreation from '@/components/TaskCreation.vue';
import Worksheet from '@/dataModel/Worksheet';



@Component({
    components: {
        TaskCreation,
    },
})
export default class TeacherWorksheet extends Vue {


    public worksheetName!: string;
    public isOnline: boolean = false;
    public isSolutionOnline: boolean = false;
    public index: number = 1;
    public tasks = [{taskId: '', index: 0}];
    public taskIds: string[] = [];
    private databaseController = this.$store.getters.databaseController();
    private worksheetController = this.$store.getters.worksheetController();
    private courseController = this.$store.getters.courseController();

    /*
    adds an empty task to the tasks assigned to the worksheet.
    Once a subtaskof the task is saved the entry will be updated
     */
    public newTask() {
        this.tasks.push({taskId: '', index: this.index});
        this.index++;
    }
    /*
    returns all databases of the teacher
     */
    get databases() {
        return this.databaseController.all;
    }

    /*
    returns a worksheet and calls the setVar method to update the variables to match the worksheet.
    this is used when an existing worksheet is loaded not when a new one is created
     */
    get worksheet(): Worksheet {
        const tempWorksheet = this.worksheetController.get(this.$route.params.worksheetId);
        this.setSheetVars(tempWorksheet);
        return tempWorksheet;

    }

    /*
    updates the taskid in the array of taskids assigned to the worksheet. this is used when a new task was
    created and saved as it had no id at that point
     */
    public addTask(index: number, taskid: string) {

        for (const task of this.tasks) {
            if (task.index === index) {
                task.taskId = taskid;

                return;
            }
        }
    }

    /*
    created method, called when the component is created. loads contents of a worksheed if needed
     */
    public created() {
        this.courseController.load(this.$route.params.courseId);
        if (this.$route.params.worksheetId === '') {
            return;
        } else {
            this.worksheetController.load(this.$route.params.worksheetId);

        }
    }

    /*
    saves the worksheet and sends an update request to the server
    index: index where tha task should be found in array. this is needed to ensure that the order of the tasks stays
            the same and is not influenced by the order in which the tasks call the save function
     */
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

    /*
     deletes the reference of the task in the array of tasks
     taskIndex: the index of the task that should be deleted
     */
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

    /*
    sets the variables of the component to match  the content of the worksheet
    worksheet: the worksheet that should be loaded in the component
     */
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

    /*
    method to leave the teacherworksheet view and return to the courseview
     */
    private toCourseView() {
        if (confirm(this.$t('teacherWorksheet.alertReturn') as string)) {
            this.$router.push('/courseView/' + this.$route.params.courseId);
        }
    }



}
</script>

<style scoped>

</style>
