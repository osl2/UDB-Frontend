<template>
    <div>
        {{this.currentSubtask.instruction}}
    </div>

    <div>
        <b-form-textarea
                id="textarea"
                v-model="studentSolution"
                placeholder="Antwort eingeben">
           </b-form-textarea>S
        <v-button @click="save(studentSolution)">Speichern</v-button>
        <v-button v-if="currentubtask.isSolutionVeryfiable" @click="compare(studentSolution)">Vergleich mit Musterlösung</v-button>
        <b-modal>
            <p>Wenn du die Teilaufgabe zurücksetzt geht dein bisheriger Fortschritt verloren. Dieser Vorgang ist irreversible</p>
            <template slot="modal-footer">
                <b-button size="sm" @click="reset()">
                    Ok
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import PlainTextTask from "../dataModel/PlainTextTask";

    export default class extends Vue{
        @Prop() currentSubtask!: PlainTextTask;

    //methods
    public save(){

    }
    public compare(){

    }
    }
</script>

<style scoped>

</style>
