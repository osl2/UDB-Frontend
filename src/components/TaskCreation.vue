<template>
    <div>
        <div v-if="!showfull">
            <div class="bg-secondary text-light">
                {{taskName}}
            </div>
            <b-button @click="changeSize"> Teilaufgabe minimieren</b-button>
        </div>
        <div v-if="showfull">
        <div>
            <b-form-input v-model="taskName" placeholder="Name der Aufgabe"></b-form-input>
        </div>
        <div>
            <b-form-select v-model="dbId" :options="dbOptions"></b-form-select>
        </div>
        <div v-if="dbOptions !== null">
            <SubtaskCreation v-for="subtask in subtasks"    :subindex="subtask.index"
                                                            :dbId="dbId"
                                                            :subTaskId="subtask.id"
                                                            @save="addSubtask"
                                                            @deleteSubtask="deleteSubtask"
            ></SubtaskCreation>
        </div>
        <b-button @click="newSubtask"> Teilaufgabe erstellen</b-button>
        <b-button @click="saveTask">Aufgabe speichern</b-button>
            <b-button @click="changeSize"> Aufgabe minimieren</b-button>
    </div>
    </div>
</template>

<script lang ="ts" >

    import Vue from 'vue';
    import SubtaskCreation from '@/components/SubtaskCreation.vue'
    import Subtask from "@/dataModel/Subtask";
    import InstructionTask from "@/dataModel/InstructionTask";
    import Task from '@/dataModel/Task';
    import TaskController from "@/controller/TaskController";

    export default Vue.extend({
        props: ['databases', 'taskindex', 'taskId'],
        components:{SubtaskCreation},
        data() {
            return {
                showfull: true,
                createdTask: new Task('','','',[]),
                taskName:'',
                dbId: '',
                createdTaskId: '',
                dbOptions: [{text: "Wähle eine Datenbank aus", value: null}],
                index:1,
                subtasks: [{subtaskId: '', index:0}],
                subtaskIds: [] as string[],
                taskController: new TaskController(this.$store.getters.api),

            };
        },

        created() {
            for (var database of this.databases) {
                this.dbOptions.push({text: database.name, value: database.id});
            }
            if(this.taskId === ''){
                return
            }else{
                this.taskController.load(this.taskId);
                this.createdTask = this.taskController.one as Task;
                this.taskName = this.createdTask.name;
                this.createdTaskId = this.createdTask.id;
                this.dbId = this.createdTask.databaseId;
                this.subtaskIds = this.createdTask.subtaskIds;
                for(var subtask of this.subtaskIds){
                }

            }
        },

        methods: {
            //creates a new entry in the subtask array
            newSubtask(){
                this.subtasks.push({subtaskId: '', index: this.index});
                this.index++;
            },

            addSubtask(index: number, subtaskId :string){

                for (var i: number = 0; i< this.subtasks.length -1; i++){
                    if(this.subtasks[i].index === index){
                        this.subtasks[i].subtaskId = subtaskId;
                        return;
                    }
                }
            },
            saveTask(){
                this.subtaskIds = [];
                for(var i: number = 0; i < this.subtasks.length; i++){
                    this.subtaskIds.push(this.subtasks[i].subtaskId);
                }
                this.createdTask = new Task(this.taskId, this.taskName, this.dbId, this.subtaskIds);

                if(this.taskId === '') {
                    this.taskController.create(this.createdTask);
                    this.$emit('save', this.taskindex, this.createdTask.id);
                }else {
                    this.taskController.save(this.createdTask);
                }

            },
            changeSize(){
                this.showfull = !this.showfull;
            },

            deleteSubtask(index: number){
                var tempSubtasks: Object[] = [];
                var tempindex: number = 0;
                for(var i: number = 0; i < this.subtasks.length; i++){
                    if(this.subtasks[i].index !== index){
                        tempSubtasks.push({subtaskId: this.subtasks[i].subtaskId, index: tempindex}) ;
                        tempindex++;
                    }
                }

            },

            deleteTask(){
                if(this.taskId !== ''){
                    this.taskController.remove(this.createdTask);
                }
                this.$emit('delete', this.taskindex);

                },
            },





    })
</script>


<style scoped>

</style>
