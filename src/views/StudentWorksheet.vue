<template>
    <div>
        <div v-for=" (task, index) in worksheet.taks">
            Aufgabe: {{++index}}
            <p v-for="(subtask, index) in task">
               {{++index}} {{subtask._instruction}}
            </p>
            <v-button @click="changeview">Bearbeiten</v-button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Worksheet from '@/dataModel/Worksheet.ts';
    export default class StudentWorksheet extends Vue{
        public worksheet!: Worksheet;
    }
</script>

<style scoped>

</style>
