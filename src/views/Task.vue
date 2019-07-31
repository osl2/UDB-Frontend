<template>
    <DatabaseComponent></DatabaseComponent>

    <div v-if="typeof(this.currentSubtask) === typeof(SqlTask)">
        <SqlTask currentSubtask="subtask"> </SqlTask>
    </div>
    <div v-else-if="typeof(this.currentSubtask) === typeof(MultipleChoiceTask)">
        <McTask currentSubtask="subtask"> </McTask>
    </div>
    <div v-else-if="typeof(this.currentSubtask) === typeof(PlainTextTaskTask)">
        <TextTaskTask currentSubtask="subtask"> </TextTaskTask>
    </div>
    <div> </div>
    <v-button @click="prev()">Zurück</v-button>
    <v-button @click="next()">Weiter</v-button>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import DatabaseComponent from "@/components/DatabaseComponent.vue";
    import Task from "@/dataModel/Task.js"
    import SqlTask from '@/dataModel/SqlTask.js';
    import Subtask from "@/dataModel/Subtask.js"
    import MultipleChoiceTask from '@/dataModel/MultipleChoiceTask.js';
    import PlainTextTask from '@/dataModel/PlainTextTask.js';
    import SqlTaskComp from '@/components/SqlTaskComp.vue'
    import McTask from '@/components/McTask.vue'
    import TextTask from '@/components/TextTask.vue';
    import TaskController from "@/controller/TaskController";
    export default class extends Vue{
        private subIndex :number = 0;
        private controller :TaskController = new TaskController();
        private subtasks !: Subtask[];
        private currentSubtask!: Subtask;
        private task!: Task ;
        created(){
            this.task = this.controller.get(this.$route.params.taskId)
            this.subtasks = this.controller.getChildren(this.task);
            this.currentSubtask = this.subtasks[this.subIndex];
        }
        next(){
            this.subIndex = this.subIndex++;
            this.currentSubtask = this.subtasks[this.subIndex];
        }
        prev(){
            this.subIndex = this.subIndex--;
            this.currentSubtask = this.subtasks[this.subIndex];
        }
    }
</script>

<style scoped>

</style>
