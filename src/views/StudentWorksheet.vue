<template>
    <div>
        <div v-for=" (task, index) in tasks">
            Aufgabe: {{++index}}
            <p v-for="(subtask, index) in task">
               {{++index}} {{subtask.instruction}}
            </p>
            <v-button @click="changeview(task)">Bearbeiten</v-button>
        </div>
        <v-button @click="exportSheet()">Bearbeitungsstand importieren</v-button>
        <v-button @click="importSheet()">Bearbeitungsstand exportieren</v-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    import Worksheet from '@/dataModel/Worksheet.ts';
    import Task from '@/dataModel/Task';
    import WorksheetController from "@/controller/WorksheetController";
    export default class StudentWorksheet extends Vue{
        public worksheet!: Worksheet;
        private tasks!: Task[];
        private controller: WorksheetController = new WorksheetController();

        created(){
            this.worksheet = this.controller.get(this.$route.params.worksheetId);
            this.tasks = this.controller.getChildren(this.worksheet);
        }
        exportSheet(){

        }
        importSheet(){

        }
    }
</script>

<style scoped>

</style>
