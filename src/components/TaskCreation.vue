<template>
    <div>
        <div v-if="!showfull">
            <div class="bg-secondary text-light">
                {{task.name}}
            </div>
            <b-button @click="changeSize"> Teilaufgabe maximieren</b-button>
        </div>
        <div v-if="showfull">
            {{task.name}}
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
                                                            @save="save"
                                                            @deleteSubtask="deleteSubtask"
            ></SubtaskCreation>
        </div>
        <b-button @click="newSubtask"> Teilaufgabe erstellen</b-button>
            <b-button @click="changeSize"> Aufgabe minimieren</b-button>
    </div>
    </div>
</template>

<script lang ="ts" >
import Vue from 'vue';
import SubtaskCreation from '@/components/SubtaskCreation.vue';
import Subtask from "@/dataModel/Subtask";
import InstructionTask from "@/dataModel/InstructionTask";
import Task from '@/dataModel/Task';
import TaskController from "@/controller/TaskController";

export default Vue.extend({
    props: ['databases', 'taskindex', 'taskId'],
    components: {SubtaskCreation},
    data() {
        return {
            showfull: true,
            taskName: '',
            dbId: '',
            createdTaskId: '',
            dbOptions: [{text: "Wähle eine Datenbank aus", value: null}],
            index: 1,
            subtasks: [{subtaskId: '', index: 0}],
            subtaskIds: [] as string[],
            taskController: new TaskController(this.$store.getters.api),

        };
    },

    created() {
        for (const database of this.databases) {
            this.dbOptions.push({text: database.name, value: database.id});
        }
        if (this.taskId === '') {
            return;
        } else {
            this.taskController.load(this.taskId);


        }
    },
    computed: {
        task: {
            get(): Task {
                const tempTask = this.taskController.get(this.taskId);
                this.setTaskVars(tempTask);
                return tempTask;

            },
        },
    },

    methods: {
        setTaskVars(task: Task) {
            this.taskName = task.name;
            this.createdTaskId = task.id;
            this.dbId = task.databaseId;
            this.subtaskIds = task.subtaskIds;
            let tempIndex = 0;
            for (const subtask of this.subtaskIds) {
                this.subtasks.push({subtaskId: subtask, index: tempIndex});
                tempIndex++;
            }

        },
        // creates a new entry in the subtask array
        newSubtask() {
            this.subtasks.push({subtaskId: '', index: this.index});
            this.index++;
        },

        addSubtask(index: number, subtaskId: string) {

            for (const subtask of this.subtasks) {
                if (subtask.index === index) {
                    subtask.subtaskId = subtaskId;
                    return;
                }
            }
        },
        save(index: number, subtaskId: string) {
            let tempTask: Task;
            this.addSubtask(index, subtaskId);
            this.subtaskIds = [];
            for (const subtask of this.subtasks) {
                this.subtaskIds.push(subtask.subtaskId);
            }
            tempTask = new Task(this.taskId, this.taskName, this.dbId, this.subtaskIds);

            if (this.taskId === '') {
                this.taskController.create(tempTask);
                this.$emit('save', this.taskindex, tempTask.id);
            } else {
                this.taskController.save(tempTask);
            }

        },
        changeSize() {
            this.showfull = !this.showfull;
        },

        deleteSubtask(index: number) {
            const tempSubtasks: object[] = [];
            let tempindex: number = 0;
            for (const subtask of this.subtasks) {
                if (subtask.index !== index) {
                    tempSubtasks.push({subtaskId: subtask.subtaskId, index: tempindex}) ;
                    tempindex++;
                }
            }

        },

        deleteTask() {
            if (this.taskId !== '') {
                this.taskController.remove(this.task);
            }
            this.$emit('delete', this.taskindex);

            },
        },





});
</script>


<style scoped>

</style>
