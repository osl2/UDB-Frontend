<template>

    <div>
       <WorksheetInstructions v-show="showSheetInstructions"
                               :tasks="tasks"
                               :subtasks="subtasks"
                               @openTask="openTask"
                               @exportSheet="exportSheet"
                               @importSheet="importSheet"
                                >
       </WorksheetInstructions>
       <TaskSolve v-show="!showSheetInstructions"
                  :currentSubtask="currentSubtask"
                  @prevSubtask="prevSubtask"
                  @nextSubtask="nextSubtask"
                  @switchback="switchback"
                  @save="save"
                  @reset="reset"
                  @compare="compare"
       >
       </TaskSolve>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    import Worksheet from '@/dataModel/Worksheet.ts';
    import Task from '@/dataModel/Task';
    import WorksheetController from "@/controller/WorksheetController";
    import ParentService from '@/services/ParentService';
    import WorksheetInstructions from '@/components/WorksheetInstructions.vue';
    import Subtask from '@/dataModel/Subtask';
    import TaskController from "@/controller/TaskController";
    import TaskSolve from '@/components/TaskSolve.vue';
    import InstructionTask from '@/dataModel/InstructionTask';

    @Component({
        components: {
            WorksheetInstructions,
            TaskSolve,
        },
    })
    export default class StudentWorksheet extends Vue{
        // Data
        private worksheet!: Worksheet;
        private tasks: Task[] = [];
        private subtasks: Subtask[][] = [];
        private currentTask: Task = new Task('','','',[]);
        private currentMatchingSubtasks!: Subtask[];
        private currentSubtask: Subtask = new InstructionTask('','');
        private subtaskIndex: number = 0;
        private showSheetInstructions: boolean = true;
        private worksheetController: ParentService<Worksheet, Task> = new WorksheetController();
        private taskController: ParentService<Task, Subtask>= new TaskController();

        // methods
        public exportSheet(){
            alert("wird noch implementiert");

        }
        public importSheet(){
            alert("wird noch implementiert");

        }
        private save(){
            alert("wird noch implementiert");
        }
        private reset(){
            alert("wird auch noch implementiert");
        }
        private compare(){
            alert("wird ebenfalls noch implementiert");
        }

        public openTask(task: Task, subtasks: Subtask[]){
            this.showSheetInstructions = false;
           this.setCurrentTask(task, subtasks,0);
            alert("öffne Task zum bearbeiten " + task.name);
        }
        private setCurrentTask(task: Task, subtasks: Subtask[], index: number){
            this.currentTask = task;
            this.currentMatchingSubtasks = subtasks;
            this.currentSubtask = subtasks[index];
            this.subtaskIndex = index;
        }
        public prevSubtask(){
            if(this.subtaskIndex == 0){
                return
            }else{
                this.subtaskIndex = this.subtaskIndex -1;
                this.currentSubtask = this.currentMatchingSubtasks[this.subtaskIndex];
            }

        }
        public nextSubtask(){

            if(this.subtaskIndex == this.currentMatchingSubtasks.length -1) {
                return
            }else{
                this.subtaskIndex = this.subtaskIndex +1;
                this.currentSubtask = this.currentMatchingSubtasks[this.subtaskIndex];
            }

        }
        private switchback(){
            this.showSheetInstructions = true;
        }

        public created(){
            this.worksheet = this.worksheetController.get(this.$route.params.worksheetId);
            this.tasks = this.worksheetController.getChildren(this.worksheet);
            for(const task of this.tasks){
                this.subtasks.push(this.taskController.getChildren(task));
            }
        }
    }
</script>

<style scoped>

</style>
