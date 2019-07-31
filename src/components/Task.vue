<template>
    <DatabaseComponent></DatabaseComponent>
    <div v-for="subtask in Task.subtasks">
    <div v-if="typeof(subtask[index]) === typeof(SqlTask)">
        <SqlTask currentSubtask="subtask"> </SqlTask>
    </div>
    <div v-else-if="typeof(subtask[index]) === typeof(MultipleChoiceTask)">
        <McTask currentSubtask="subtask"> </McTask>
    </div>
    <div v-else-if="typeof(subtask[index]) === typeof(PlainTextTaskTask)">
        <TextTaskTask currentSubtask="subtask"> </TextTaskTask>
    </div>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import DatabaseComponent from "@/components/DatabaseComponent.vue";
    import SqlTask from '@/dataModel/SqlTask.ts';
    import MultipleChoiceTask from '@/dataModel/MultipleChoiceTask.ts';
    import PlainTextTask from '@/dataModel/PlainTextTask.ts';
    import SqlTaskComp from '@/components/SqlTaskComp.vue'
    import McTask from '@/components/McTask.vue'
    import TextTask from '@/components/TextTask.vue';
    export default {
        private
        name: "Task",
        components: {TextTask, SqlTask, DatabaseComponent}
    }
</script>

<style scoped>

</style>
