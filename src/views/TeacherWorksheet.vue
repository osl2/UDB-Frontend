<template>
    <div>
        <div class="head">
            <h2>
                {{ worksheet.name }}
            </h2>
            <b-button @click="toCourseView">{{ $t('teacherWorksheet.toOverview') }}</b-button>
        </div>
        <div>
            <h3>
                Einstellungen
            </h3>
            <!--Section to set options needed for a worksheet -->
            <b-input-group class="col-6">
                <b-input-group-prepend>
                    <b-input-group-text><span>Name</span></b-input-group-text>
                </b-input-group-prepend>
                <b-input v-model="worksheet.name" :placeholder="$t('teacherWorksheet.name')"></b-input>
            </b-input-group>
            <div class="d-flex">
                <b-form-group :label="$t('teacherWorksheet.sheetOnline')" class="col-6">
                    <b-form-radio v-model="worksheet.isOnline" :value="true">
                        {{ $t('teacherWorksheet.yes') }}
                    </b-form-radio>
                    <b-form-radio v-model="worksheet.isOnline" :value="false">
                        {{ $t('teacherWorksheet.no') }}
                    </b-form-radio>
                </b-form-group>

                <b-form-group :label="$t('teacherWorksheet.solutionOnline')" class="col-6">
                    <b-form-radio v-model="worksheet.isSolutionOnline" :value="true">
                        {{ $t('teacherWorksheet.yes') }}
                    </b-form-radio>
                    <b-form-radio v-model="worksheet.isSolutionOnline" :value="false">
                        {{ $t('teacherWorksheet.no') }}
                    </b-form-radio>
                </b-form-group>
            </div>
        </div>

        <!--Displays a TaskCreation Component for every Task in the worksheet -->
        <div>
            <h3>
                Aufgaben
            </h3>
            <TaskCreation :databases="databases" @createTask="createTask"></TaskCreation>
            <draggable-component v-model="tasks" handle=".task-drag-handle">
                <TaskEdit
                    v-for="task in tasks"
                    :key="task.id"
                    :databases="databases"
                    :initial-task="task"
                    :event-bus="eventBus"
                    @updateTasks="updateTasks"
                    @delete="deleteTask"
                ></TaskEdit>
            </draggable-component>
        </div>
        <b-button variant="primary" @click="save">Speichern</b-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import TaskEdit from '@/components/TaskEdit.vue';
import TaskCreation from '@/components/TaskCreation.vue';
import DatabaseController from '@/controller/DatabaseController';
import WorksheetController from '@/controller/WorksheetController';
import Worksheet from '@/dataModel/Worksheet';
import Task from '@/dataModel/Task';
import TaskController from '@/controller/TaskController';
import Database from '@/dataModel/Database';
import draggableComponent from 'vuedraggable';

@Component({
    components: {
        draggableComponent,
        TaskCreation,
        TaskEdit,
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

        this.worksheetController
            .get(this.$route.params.worksheetId)
            .then((worksheet: Worksheet) => {
                this.worksheet = worksheet;
                this.taskController
                    .getChildren(this.worksheet)
                    .then(
                        (tasks: Task[]) => {
                            this.tasks = tasks;
                        }
                        // TODO catchen
                    )
                    .catch(error => {
                        switch (error.status) {
                            case 404:
                                alert(this.$t('apiError.tasks404') as string);
                                break;
                            case 500:
                                alert(this.$t('apiError.server500') as string);
                                break;
                            default:
                                alert(this.$t('apiError.defaultMsg') as string);
                                break;
                        }
                    });
            })
            .catch(error => {
                switch (error.status) {
                    case 404:
                        alert(this.$t('apiError.worksheet404') as string);
                        break;
                    case 500:
                        alert(this.$t('apiError.server500') as string);
                        break;
                    default:
                        alert(this.$t('apiError.defaultMsg') as string);
                        break;
                }
            });

        this.databaseController
            .getAll()
            .then((databases: Database[]) => {
                this.databases = databases;
            })
            .catch(error => {
                switch (error.status) {
                    case 404:
                        alert(this.$t('apiError.databases404') as string);
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

    public createTask(task: Task) {
        this.taskController
            .create(task)
            .then((taskId: string) => {
                task.id = taskId;
                this.worksheet.taskIds.push(taskId);
                this.worksheetController.save(this.worksheet).then(() => {
                    this.tasks.push(task);
                });
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

    public deleteTask(task: Task) {
        this.tasks = this.tasks.filter((oldTask: Task) => oldTask.id !== task.id);
        this.worksheet.taskIds = this.worksheet.taskIds.filter((id: string) => id !== task.id);
        this.worksheetController
            .save(this.worksheet)
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

    public save() {
        this.eventBus.$emit('save');
        this.worksheetController
            .save(this.worksheet)
            .then(() => {
                // TODO Sprache auslagern
                alert('Speichern erfolgreich');
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
    /*
     this method gets calles whenever a task gets saved in taskCreation.vue. That is so the task
     array in this view can get updated. It just gets called when the save call to the API was successful.
     */
    public updateTasks() {
        this.taskController
            .getChildren(this.worksheet)
            .then((tasks: Task[]) => {
                this.tasks = tasks;
            })
            .catch(error => {
                switch (error.status) {
                    case 404:
                        alert(this.$t('apiError.tasks404') as string);
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
