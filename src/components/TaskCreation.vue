import AllowedSqlStatements from "@/dataModel/AllowedSqlStatements";
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
        </div>
        <div>
            <b-form-select v-model="dbId" :options="dbOptions"></b-form-select>
        </div>
            <!--Displays a SubtaskCreation component for every subtask in the subtasks array -->
        <div v-if="dbOptions !== null">
            <SubtaskCreation v-for="subtask in subtasks"
                             :key="subtask.id"
                             :dbId="dbId"
                             :subtask="subtask"
                             @save="save"
                             @deleteSubtask="deleteSubtask"
            ></SubtaskCreation>
        </div>
        <div>
            <b-form-select v-model="subtaskType" v-on:change="createSubtask" :options="subtaskTypes"></b-form-select>
        </div>
        <b-button @click="newSubtask">{{$t('taskCreation.new')}}</b-button>
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

export default Vue.extend({
    props: ['databases', 'task'],
    components: {SubtaskCreation},
    data() {
        return {
            showfull: true,
            dbOptions: [{text: "Wähle eine Datenbank aus", value: null}],
            subtasks: [],
            subtaskType: "",
            subtaskTypes: ["SQL", "Multiple-Choice", "Text", "Instruction"],
            taskController: this.$store.getters.taskController,
            subtaskController: this.$store.getters.subtaskController,
        };
    },

    /*
    method is called when the component is created. it loads the databases connected to the user and loads a task
    if one was given
     */
    created() {
        this.subtaskController = this.$store.getters.subtaskController;
        this.taskController = this.$store.getters.taskController;
        for (const database of this.databases) {
            this.dbOptions.push({text: database.name, value: database.id});
        }
        this.subtaskController.loadChildren(this.task);
    },


    computed: {

        /*
        returns a task and calls a function that updates the variables of the component
         */
        subtasks: {
            get(): Subtask[] {
              return this.subtaskController.all && this.subtaskController.loadChildren(this.task);
            },
        },
    },

    methods: {
        // creates a new entry in the subtask array
        createSubtask() {
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
        },
        newSqlTask() {
            this.subtaskController.create(
              new SqlTask('', new SqlSolution('', [], [[]]), '', false, false, false, false, AllowedSqlStatements.NoRestriction),
            ).then((subtaskId: string) => {
              this.task.subtaskIds.push(subtaskId);
              this.save();
            });
        },
        newMCTask() {
          this.subtaskController.create(
            new MultipleChoiceTask('', new MultipleChoiceSolution([]), '', false, false, []),
          ).then((subtaskId: string) => {
            this.task.subtaskIds.push(subtaskId);
            this.save();
          });
        },
        newTextTask() {
          this.subtaskController.create(
            new PlainTextTask('', new PlainTextSolution(''), '', false, false),
          ).then((subtaskId: string) => {
            this.task.subtaskIds.push(subtaskId);
            this.save();
          });
        },
        newInstructionTask() {
          this.subtaskController.create(
            new InstructionTask('', ''),
          ).then((subtaskId: string) => {
            this.task.subtaskIds.push(subtaskId);
            this.save();
          });
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
        save() {
            this.taskController.save(this.task);
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
