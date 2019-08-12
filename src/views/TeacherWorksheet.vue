<template>
    <div>
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
            <TaskCreation v-for="task in tasks" :databases="databases"
                                                :taskIndex="index"
                                                :taskId="tasks[index].id"
                                                @save="addTask"
                                                @delete="deleteTask"
            ></TaskCreation>
        </div>
        <b-button @click="newTask"> Teilaufgabe erstellen</b-button>
        <b-button @click="saveWorksheet">Aufgabenblatt speichern</b-button>
        <b-button @click="deleteSheet"> Aufgabenblatt löschen</b-button>
    </div>
</template>


<script lang="ts">

    import {Vue, Component, Prop} from 'vue-property-decorator';
    import TaskCreation from '@/components/TaskCreation.vue';
    import DatabaseController from "@/controller/DatabaseController";
    import WorksheetController from "@/controller/WorksheetController";
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
        public worksheet!: Worksheet;
        private databaseController:DatabaseController= new DatabaseController(this.$store.getters.api);
        private worksheetController: WorksheetController = new WorksheetController(this.$store.getters.api);
        public tasks = [{taskId: '', index:0}];
        public taskIds: string[] = [];

        get databases() {
            return this.databaseController.all;
        }
        newTask(){
            this.tasks.push({taskId: '', index: this.index});
            this.index++;
        }

        addTask(index: number, taskid : string){

            for (var i: number = 0; i< this.tasks.length -1; i++){
                if(this.tasks[i].index === index){
                    this.tasks[i].taskId = taskid;

                    return;
                }
            }
        }
        created(){
            //To-Do wie kriegt man das worksheet?
            if(this.worksheetId ===''){
                return;
            }else{
                this.worksheetController.load(this.worksheetId);
                this.worksheet = this.worksheetController.one as Worksheet;
                this.index = 1;
                this.worksheetName = this.worksheet.name;
                this.isOnline = this.worksheet.isOnline;
                this.isSolutionOnline = this.worksheet.isSolutionOnline;
                this.taskIds = this.worksheet.taskIds;
                this.tasks = [];
                for(var taskid of this.taskIds){
                    this.tasks.push({taskId: taskid, index: this.index})
                    this.index++;
                }

            }
        }
        saveWorksheet(){
            this.taskIds = [];
            for(var i: number = 0; i < this.tasks.length; i++){
                this.taskIds.push(this.tasks[i].taskId);
            }
            this.worksheet = new Worksheet(this.worksheetId,this.worksheetName,this.taskIds,this.isOnline, this.isSolutionOnline);
            if(this.worksheetId == null){
                this.worksheetController.create(this.worksheet);
            }else{
                this.worksheetController.save(this.worksheet);
            }

        }
        deleteTask(taskIndex: number){
            var tempTasks: Object[] = [];
            var tempindex: number = 0;
            for(var i: number = 0; i < this.tasks.length; i++){
                if(this.tasks[i].index !== taskIndex){
                    tempTasks.push({taskId: this.tasks[i].taskId, index: tempindex}) ;
                    tempindex++;
                }
            }

        }
        deleteSheet(){
            if (this.worksheetId === ''){
                //geh zurück zum kurs
            }else{
                this.worksheetController.remove(this.worksheet);
            }
        }



    }
</script>

<style scoped>

</style>
