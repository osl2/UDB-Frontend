<template>
    {{subtask._instruction}}
    <div>
        <b-form-textarea
                id="textarea"
                v-model="studentSolution"
                placeholder="Antwort eingeben">
           </b-form-textarea>
        <v-button @click="save(studentSolution)">Speichern</v-button>
        <v-button v-if="subtask._isSolutionVeryfiable" @click="compare(studentSolution)">Vergleich mit Musterlösung</v-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import PlainTextTask from "../dataModel/PlainTextTask";

    export default {
        @Prop() private currentSubtask: PlainTextTask;


    //methods
    }
</script>

<style scoped>

</style>
