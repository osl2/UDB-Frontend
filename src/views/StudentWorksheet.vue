<template>
    <div>
        <div class="worksheetHeader mb-5 pt-3 pb-3 text-center text-white">
            <h2>{{ worksheet.name }}</h2>
        </div>
        <!--Shows an Overview  of all Tasks with their Instructions-->
        <div v-if="showSheetInstructions" :sync:showSheetInstructions="showSheetInstructions">
            <WorksheetInstructions
                v-for="task in tasks"
                :key="task.id"
                class="mb-3"
                :task="task"
                @openTask="openTask"
            ></WorksheetInstructions>

            <!--Buttons to import and export the solutions the student created. This is used to be able to work
             on the same worksheet on different occasions while not loosing the progress made-->
            <div class="d-flex mt-4 justify-content-center">
                <b-button @click="exportSheet" class="mr-3">{{ $t('studentWorksheet.exportSolution') }}</b-button>
                <b-button @click="uploadTrigger">{{ $t('studentWorksheet.importSolution') }}</b-button>
                <input id="fileUpload" type="file" style="display:none;" accept=".json" @change="importSheet" />
            </div>
            <div class="d-flex mt-3 justify-content-center">
                <b-button @click="exportSheetAsPDF">
                    {{ $t('studentWorksheet.exportPdf') }}
                </b-button>
            </div>
        </div>

        <!-- Renders a TaskSolve Component for the current task that can be solved by the student -->
        <div>
            <TaskSolve
                v-if="!showSheetInstructions"
                :task="currentTask"
                :current-subtask="currentSubtask"
                :solutions="solutions"
                :subtask-index="subtaskIndex"
                :number-of-subtasks="numberOfSubtasks"
                :database="database"
                :has-next-subtask="hasNextSubtask"
                :has-previous-subtask="hasPreviousSubtask"
                @prevSubtask="prevSubtask"
                @nextSubtask="nextSubtask"
                @switchback="switchback"
                @save="save"
                @reset="reset"
                @compare="compare"
            ></TaskSolve>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import Worksheet from '@/dataModel/Worksheet.ts';
import Task from '@/dataModel/Task';
import WorksheetController from '@/controller/WorksheetController';
import ParentService from '@/services/ParentService';
import WorksheetInstructions from '@/components/WorksheetInstructions.vue';
import Subtask from '@/dataModel/Subtask';
import TaskSolve from '@/components/TaskSolve.vue';
import InstructionTask from '@/dataModel/InstructionTask';
import Solution from '@/dataModel/Solution';
import SubtaskService from '@/services/SubtaskService';
import DataManagementService from '@/services/DataManagementService';
import Database from '@/dataModel/Database';
import SolutionDiff from '@/dataModel/SolutionDiff';

@Component({
    components: {
        WorksheetInstructions,
        TaskSolve,
    },
})
export default class StudentWorksheet extends Vue {
    // Data
    private database: Database = new Database('', '', null);
    private worksheet: Worksheet = new Worksheet('', '', [], false, false);
    private tasks: Task[] = [];

    // the solution maps an id of a subtask to the students solution.
    private solutions: Map<string, Solution> = new Map<string, Solution>();
    private showSheetInstructions: boolean = true;

    // Attributes for the current chosen Task and Subtasks
    private currentTask: Task = new Task('', '', '', []);
    private currentMatchingSubtasks: Subtask[] = [];
    private currentSubtask: Subtask = new InstructionTask('', '');
    private subtaskIndex: number = 0;
    private numberOfSubtasks: number = 0;

    // Controller
    private worksheetController: WorksheetController = this.$store.getters.worksheetController;
    private taskController: ParentService<Worksheet, Task> = this.$store.getters.taskController;
    private subtaskController: SubtaskService = this.$store.getters.subtaskController;
    private databaseController: DataManagementService<Database> = this.$store.getters.databaseController;

    public created() {
        this.worksheetController = this.$store.getters.worksheetController;
        this.taskController = this.$store.getters.taskController;
        this.subtaskController = this.$store.getters.subtaskController;
        this.databaseController = this.$store.getters.databaseController;
        this.worksheetController
            .get(this.$route.params.worksheetId)
            .then((worksheet: Worksheet) => {
                this.worksheet = worksheet;
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
    }

    // methods
    /*
       Exports the solutions the student created for the worksheet
       */
    public exportSheet() {
        this.worksheetController.exportObject(this.worksheet, this.solutions);
    }

    /*
       imports a previously exported solution
       */
    public importSheet(event: Event) {
        const target = event.target as (HTMLInputElement & Event);
        const files = target!.files!;
        this.worksheetController.importObject(files.item(0)!).then((sheetData: [string, Map<string, Solution>]) => {
            if (this.worksheet.id === sheetData[0]) {
                this.solutions = sheetData[1];
                alert(this.$t('studentWorksheet.alertSolutionChange') as string);
            } else {
                alert(this.$t('studentWorksheet.alertSolutionWrong') as string);
            }
        });
    }

    /*
       exports the solutions the student created for the worksheet as a pdf
       */
    public exportSheetAsPDF() {
        this.worksheetController.exportPDF(this.worksheet, this.solutions);
    }

    /*
       changes the Component to display the task that should be solved
       */
    public openTask(task: Task, subtasks: Subtask[]) {
        this.showSheetInstructions = false;
        this.setCurrentTask(task, subtasks, 0);
    }

    get hasPreviousSubtask() {
        return this.subtaskIndex !== 0;
    }

    get hasNextSubtask() {
        return this.subtaskIndex !== this.currentMatchingSubtasks.length - 1;
    }

    /*
       loads the subtask that is placed before the current task in the array of subtasks assigned to the task
       */
    public prevSubtask() {
        if (this.subtaskIndex === 0) {
            return;
        } else {
            this.subtaskIndex = this.subtaskIndex - 1;
            this.currentSubtask = this.currentMatchingSubtasks[this.subtaskIndex];
        }
    }

    /*
       loads the subtask that is placed after the current task in the array of subtasks assigned to the task
       */
    public nextSubtask() {
        if (this.subtaskIndex === this.currentMatchingSubtasks.length - 1) {
            return;
        } else {
            this.subtaskIndex = this.subtaskIndex + 1;
            this.currentSubtask = this.currentMatchingSubtasks[this.subtaskIndex];
        }
    }

    /*
       saves the solution the student created
       */
    public save(subtaskId: string, subtaskSolution: Solution) {
        if (subtaskSolution === undefined) {
            alert(this.$t('studentWorksheet.alertSolutionUndefined') as string);
            return;
        }
        // There should always just be one solution per subtask.
        if (this.solutions.has(subtaskId)) {
            this.solutions.delete(subtaskId);
        }
        this.solutions.set(subtaskId, subtaskSolution);
        alert(this.$t('studentWorksheet.alertSave') as string);
    }

    /*
     * This Method deletes the saved solutions in the solution map for the current Task.
     */
    public reset() {
        if (confirm(this.$t('studentWorksheet.alertReset') as string)) {
            for (const subtask of this.currentMatchingSubtasks) {
                if (this.solutions.has(subtask.id)) {
                    this.solutions.delete(subtask.id);
                }
            }
            this.setCurrentTask(this.currentTask, this.currentMatchingSubtasks, 0);
        }
    }

    /*
       compares the solution of the subtask created by the student with the solution the teacher provided

       */
    public compare(subtaskSolution: Solution) {
        this.currentSubtask.solution = subtaskSolution;
        this.save(this.currentSubtask.id, this.currentSubtask.solution);
        this.subtaskController
            .compareSolution(this.currentSubtask)
            .then((feedback: SolutionDiff) => {
                if (feedback.same) {
                    alert(this.$t('studentWorksheet.alertSolutionCorrect') as string);
                } else {
                    alert(feedback.getFeedbackString());
                }
            })
            .catch(error => {
                switch (error.status) {
                    case 404:
                        alert(this.$t('apiError.compare404') as string);
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

    // method so the worksheet instructions component gets shown.
    public switchback() {
        this.showSheetInstructions = true;
    }

    /*
       opens file upload dialog
       */
    private uploadTrigger(event: Event) {
        document.getElementById('fileUpload')!.click();
    }

    /* sets the current Task to the task provided. Also sets the current subtask to the subtask that can be found at
       the provided index in the array of subtasks provided.
       */
    private setCurrentTask(task: Task, subtasks: Subtask[], index: number) {
        this.currentTask = task;
        this.currentMatchingSubtasks = subtasks;
        this.currentSubtask = subtasks[index];
        this.subtaskIndex = index;
        this.numberOfSubtasks = this.currentMatchingSubtasks.length;
        this.databaseController
            .get(this.currentTask.databaseId)
            .then((database: Database) => {
                this.database = database;
            })
            .catch(error => {
                switch (error.status) {
                    case 404:
                        alert(this.$t('apiError.database404') as string);
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
}
</script>

<style scoped>
.worksheetHeader {
    background-color: #17a2b8;
}
</style>
