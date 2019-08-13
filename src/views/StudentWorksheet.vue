<template>
    <div>
        <div class="worksheetHeader">
            <h2>{{worksheet.name}}</h2>
        </div>
        <!--Shows an Overview  of all Tasks with their Instructions-->
        <div v-if="showSheetInstructions">
            <WorksheetInstructions class="instructionContainer"
                                   v-for="task in tasks"
                                   :key="task.id"
                                   :task="task"
                                   @openTask="openTask"
            >
            </WorksheetInstructions>

            <!--Buttons to import and export the solutions the student created. This is used to be able to work
             on the same worksheet on different occasions while not loosing the progress made-->
            <b-button @click="exportSheet"
            >{{$t('studentWorksheet.exportSolution')}}
            </b-button>

            <b-button @click="importSheet"
            >{{$t('studentWorksheet.importSolution')}}}
            </b-button>
        </div>

        <!-- Renders a TaskSolve Component for the current task that can be solved by the student -->
        <div>
            <TaskSolve v-if="!showSheetInstructions"
                       :task="currentTask"
                       :currentSubtask="currentSubtask"
                       :solutions="solutions"
                       :subtaskIndex="subtaskIndex"
                       :numberOfSubtasks="numberOfSubtasks"
                       :database="database"
                       @prevSubtask="prevSubtask"
                       @nextSubtask="nextSubtask"
                       @switchback="switchback"
                       @save="save"
                       @reset="reset"
                       @compare="compare"
            >
            </TaskSolve>
        </div>
        <div>
            <b-button @click="exportSheetAsPDF">{{$t('studentWorksheet.exportPdf')}}</b-button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

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

        // computed methods

        // returns the worksheet that matches the WorksheetId saved in the component
        get worksheet() {
            if (this.worksheetController.get(this.worksheetId) !== undefined) {
                try {
                    this.taskController.loadChildren(this.worksheetController.get(this.worksheetId));
                } catch (e) {
                    alert(e.message);
                }
            }
            return this.worksheetController.get(this.worksheetId);
        }

        // returns all tasks that are assigned to the worksheet saved in the component
        get tasks() {
            return this.taskController.all;
        }

        // returns the database of the task that can currently be solved
        get database() {
            return this.databaseController.get(this.currentTask.databaseId);
        }

        // Data

        private worksheetId: string = '';

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
                },
            );
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
            this.save(this.currentSubtask.id, subtaskSolution);
            this.subtaskController.compareSolution(this.currentSubtask).then((feedback: SolutionDiff) => {
                    if (feedback.same === true) {
                        alert(this.$t('studentWorksheet.alertSolutionCorrect') as string);
                    } else {
                        alert(feedback.getFeedbackString());
                    }
                },
            ).catch((response) => {
                alert('Error comparing solution: ' + response.status + ' ' + response.statusText);
            });
        }

        // method so the worksheet instructions component gets shown.
        public switchback() {
            this.showSheetInstructions = true;
        }

        // lifecycle methods

        public created() {
            this.worksheetController = this.$store.getters.worksheetController;
            this.taskController = this.$store.getters.taskController;
            this.subtaskController = this.$store.getters.subtaskController;
            this.databaseController = this.$store.getters.databaseController;
            try {
                this.worksheetController.load(this.$route.params.worksheetId);
            } catch (e) {
                alert(e.message);
            }
            this.worksheetId = this.$route.params.worksheetId;
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
            try {
                this.databaseController.load(this.currentTask.databaseId);
            } catch (e) {
                alert(e.message);
            }
        }
    }
</script>

<style scoped>
    .worksheetHeader {
        padding-top: 15px;
        padding-bottom: 15px;
        margin-bottom: 35px;
        text-align: center;
        background-color: #17a2b8;
        color: white;
    }

    .instructionContainer {
        margin-bottom: 20px;
    }

</style>
