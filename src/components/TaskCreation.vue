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
            <b-form-input v-model="taskName" placeholder={{$t('taskCreation.name')}}></b-form-input>
        </div>
        <div>
            <b-form-select v-model="dbId" :options="dbOptions"></b-form-select>
        </div>
            <!--Displays a SubtaskCreation component for every subtask in the subtasks array -->
        <div v-if="dbOptions !== null">
            <SubtaskCreation v-for="subtask in subtasks"
                             :key="subtask.index"
                             :subindex="subtask.index"
                             :dbId="dbId"
                             :subTaskId="subtask.id"
                             @save="save"
                             @deleteSubtask="deleteSubtask"
            ></SubtaskCreation>
        </div>
        <b-button @click="newSubtask">{{$t('taskCreation.new')}}</b-button>
            <b-button @click="changeSize"> {{$t('taskCreation.minimize')}}</b-button>
    </div>
    </div>
</template>

<script lang ="ts" >
import Vue from 'vue';
import SubtaskCreation from '@/components/SubtaskCreation.vue';
import Task from '@/dataModel/Task';

export default Vue.extend({
    props: ['databases', 'taskindex', 'taskId'],
    components: {SubtaskCreation},
    data() {
        return {
            showfull: true,
            taskName: '',
            dbId: '',
            createdTaskId: '',
            dbOptions: [{text: this.$t('taskCreation.chooseDb') as string, value: null}],
            index: 1,
            subtasks: [{subtaskId: '', index: 0}],
            subtaskIds: [] as string[],
            taskController: this.$store.getters.taskController(),
        };
    },

    /*
    method is called when the component is created. it loads the databases connected to the user and loads a task
    if one was given
     */
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

        /*
        returns a task and calls a function that updates the variables of the component
         */
        task: {
            get(): Task {
                const tempTask = this.taskController.get(this.taskId);
                this.setTaskVars(tempTask);
                return tempTask;

            },
        },
    },

    methods: {
        /*
        updates the variables of the component to match the contents of the given task
        task: a task that was passed to the component and should be updated
         */
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

        /*
         creates a new entry with an empty id in the subtask array
         */
        newSubtask() {
            this.subtasks.push({subtaskId: '', index: this.index});
            this.index++;
        },

        /*
        updates the content of the subtask array when a newly created subtask is saved
        index: index of the subtask array where the subtask should be saved
        subtaskId: the id of the subtask that should be added to the subtasks array
         */
        addSubtask(index: number, subtaskId: string) {

            for (const subtask of this.subtasks) {
                if (subtask.index === index) {
                    subtask.subtaskId = subtaskId;
                    return;
                }
            }
        },

        /*
            sends a create request to the server if the task defined by the component is new
            or sends an update request to the server if an existing task was changed
            emits the save call to the TeacherWorksheet view to also update the worksheet.
                this is needed to ensure that a task always has a worksheet it is assigned to, even if the website is
                closed during the creation
            index: the index where the subtask can be found that was saved and started the save call
            subtaskId: id of the subtask that was changed
         */
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

        /*
        changes the value of the show full variable to show or hide the options needed to create or update a task
         */
        changeSize() {
            this.showfull = !this.showfull;
        },

        /*
        deletes a subtask from the array of subtasks assigned to the task
        index: the index where the subtask can be found in the array of subtasks
         */
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

        /*
        sends a request to the server to delete the task that is currently displayed in this component.
        emits a delete and taskindex to the teacherworksheet to also delete the task from the array of tasks assigned
        to the worksheet
         */
        deleteTask() {
            if (confirm(this.$t('subtaskCreation.alertDelete') as string)) {
                if (this.taskId !== '') {
                    this.taskController.remove(this.task);
                }
                this.$emit('delete', this.taskindex);
            }

            },

        },





});
</script>


<style scoped>

</style>
