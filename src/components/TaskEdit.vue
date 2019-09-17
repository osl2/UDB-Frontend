<template>
    <div class="task">
        <div class="task-drag-handle">
            <font-awesome-icon icon="arrows-alt-v"></font-awesome-icon>
        </div>
        <!-- Shows all the options needed to create or update a task-->
        <div class="task-content">
            <div>
                <b-button v-b-toggle="'task-' + task.id" squared block variant="secondary">
                    {{ task.name }}
                    <font-awesome-icon icon="angle-down"></font-awesome-icon>
                </b-button>
            </div>
            <b-collapse :id="'task-' + task.id" class="task-settings">
                <div class="d-flex mb-3">
                    <b-input-group class="mr-3">
                        <b-input-group-prepend>
                            <b-input-group-text>{{ $t('taskEdit.name') }}</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-input v-model="task.name" :placeholder="$t('taskCreation.name')"></b-form-input>
                    </b-input-group>
                    <b-input-group>
                        <b-input-group-prepend>
                            <b-input-group-text>{{ $t('taskEdit.database') }}</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-select v-model="task.databaseId" :options="dbOptions"></b-form-select>
                    </b-input-group>
                </div>
                <!--Displays a SubtaskCreation component for every subtask in the subtasks array -->
                <draggable-component
                    v-model="subtasks"
                    group="subtasks"
                    handle=".subtask-drag-handle"
                    @change="updateSinT"
                >
                    <SubtaskEdit
                        v-for="(subtask, index) in subtasks"
                        :key="subtask.id"
                        :index="index"
                        :initial-subtask="subtask"
                        :event-bus="eventBus"
                        :result-bus="resultBus"
                        @delete="deleteSubtask"
                        @executeQuery="executeQuery"
                    ></SubtaskEdit>
                </draggable-component>
                <SubtaskCreation @createSubtask="createSubtask"></SubtaskCreation>
            </b-collapse>
        </div>
        <div class="task-delete">
            <b-button squared variant="danger" @click="deleteTask">
                <font-awesome-icon icon="trash"></font-awesome-icon>
            </b-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SubtaskEdit from '@/components/SubtaskEdit.vue';
import Subtask from '@/dataModel/Subtask';
import SqlTask from '@/dataModel/SqlTask';
import AllowedSqlStatements from '@/dataModel/AllowedSqlStatements';
import MultipleChoiceTask from '@/dataModel/MultipleChoiceTask';
import PlainTextTask from '@/dataModel/PlainTextTask';
import InstructionTask from '@/dataModel/InstructionTask';
import SqlSolution from '@/dataModel/SqlSolution';
import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';
import PlainTextSolution from '@/dataModel/PlainTextSolution';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Database from '@/dataModel/Database';
import Task from '@/dataModel/Task';
import TaskController from '@/controller/TaskController';
import SubtaskController from '@/controller/SubtaskController';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faAngleDown, faArrowsAltV, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import draggableComponent from 'vuedraggable';
import SubtaskCreation from '@/components/SubtaskCreation.vue';
import SQLExecutor from '@/controller/SQLExecutor';
import QueryResult from '@/dataModel/QueryResult';
import { SqlJs } from 'sql.js/module';
import ValueType = SqlJs.ValueType;

library.add(faTrash, faAngleDown, faArrowsAltV, faPlus);

@Component({
    components: {
        SubtaskCreation,
        SubtaskEdit,
        draggableComponent,
    },
})
export default class TaskEdit extends Vue {
    @Prop() private databases: Database[] = [];
    @Prop() private initialTask!: Task;
    @Prop() private eventBus!: Vue; // bus to send save()-command to subtasks

    private taskController: TaskController = this.$store.getters.taskController;
    private subtaskController: SubtaskController = this.$store.getters.subtaskController;
    private sqlExecutor: SQLExecutor = this.$store.getters.sqlExecutor;

    private task: Task = new Task('', '', '', []);
    private database!: Database;
    private databaseNumber: number = 0;
    private dbOptions: Array<{ text: string; value: string }> = [];
    private subtasks: Subtask[] = [];
    private resultBus: Vue = new Vue(); // bus to send result of sql query to sql-subtask-component

    /*
    method is called when the component is created. It loads the databases connected to the user and loads a task
     */
    public created() {
        this.task = this.initialTask;
        this.eventBus.$on('save', this.save);
        this.subtaskController = this.$store.getters.subtaskController;
        this.taskController = this.$store.getters.taskController;
        this.sqlExecutor = this.$store.getters.sqlExecutor;
        const database = this.databases.find((db: Database) => db.id === this.task.databaseId);
        if (database !== undefined) {
            this.database = database;
            this.sqlExecutor.open(database).then((dbNr: number) => {
                this.databaseNumber = dbNr;
            });
        }

        this.subtaskController
            .getChildren(this.task)
            .then((subtasks: Subtask[]) => {
                this.subtasks = subtasks;
            })
            .catch(error => {
                switch (error.status) {
                    case 404:
                        alert(this.$t('apiError.subtasks404') as string);
                        break;
                    case 500:
                        alert(this.$t('apiError.server500') as string);
                        break;
                    default:
                        alert(this.$t('apiError.defaultMsg') as string);
                        break;
                }
            });
    }

    public createSubtask(subtask: Subtask) {
        this.subtaskController
            .create(subtask)
            .then((subtaskId: string) => {
                subtask.id = subtaskId;
                this.subtasks.push(subtask);
                this.task.subtaskIds.push(subtaskId);
                this.save();
            })
            .catch(error => {
                switch (error.status) {
                    case 500:
                        alert(this.$t('apiError.server500') as string);
                        break;
                    default:
                        alert(this.$t('apiError.defaultMsg') as string);
                        break;
                }
            });
    }

    @Watch('databases')
    public onDbChange() {
        for (const database of this.databases) {
            this.dbOptions.push({ text: database.name, value: database.id });
        }
    }

    public save() {
        this.taskController.save(this.task);
    }

    public updateSinT() {
        this.task.subtaskIds = this.subtasks.map((s: Subtask) => s.id);
        return true;
    }

    public executeQuery(query: string, subtaskId: string) {
        this.sqlExecutor.executeQuery(this.databaseNumber, query, 0).then((result: QueryResult) => {
            const columns = result.result.columns;
            const rows = result.result.values.map((row: ValueType[]) =>
                row.map((value: ValueType) => {
                    return value ? value.toString() : '';
                })
            );
            this.resultBus.$emit('result-' + subtaskId, columns, rows);
        });
    }

    public deleteSubtask(subtask: Subtask) {
        this.subtasks = this.subtasks.filter((oldSubtask: Subtask) => oldSubtask.id !== subtask.id);
        this.task.subtaskIds = this.task.subtaskIds.filter((id: string) => id !== subtask.id);
        this.taskController
            .save(this.task)
            .then()
            .catch(error => {
                switch (error.status) {
                    case 500:
                        alert(this.$t('apiError.server500') as string);
                        break;
                    default:
                        alert(this.$t('apiError.defaultMsg') as string);
                        break;
                }
            });
    }

    /*
   calls the method deleteTask in TeacherWorksheet.vue to send a delete request to the server and delete it in
   the data of the component.
   */
    public deleteTask() {
        if (confirm(this.$t('taskCreation.alertDelete') as string)) {
            this.$emit('delete', this.task);
        }
    }
}
</script>

<style scoped>
.task {
    display: flex;
    flex-direction: row;
    margin-top: 1em;
    box-shadow: 3px 3px 9px 0px rgba(140, 140, 140, 0.37);
    background-color: darkgrey;
}
.task-drag-handle {
    background-color: lightgray;
    padding: 6px 12px;
}
.task-content {
    flex-grow: 1;
}
.task-settings {
    padding: 1em 0 1em 1em;
}
.task-delete {
    align-self: flex-start;
}
</style>
