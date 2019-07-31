<template>
    <div>
        {{this.currentSubtask.instruction}}
    </div>

    <div>
        <b-form-group label="checkbox-group">
            <b-form-checkbox-group
                    v-for=" (option,index) in options"
                    v-model="selected"
                    value ="index"
                    :options="options"
                    name="checkbox"
                    stacked
            ></b-form-checkbox-group>
        </b-form-group>
        <v-button @click="save">Speichern</v-button>
        <v-button v-if=" currentSubtask.isSolutionVeryfiable" @click="compare"></v-button>

        <b-button class="btn btn-lg" v-b-modal.modal-reset-mc>Zurücksetzen</b-button>
        <b-modal id="modal-reset-mc">
            <p>Wenn du die Teilaufgabe zurücksetzt geht dein bisheriger Fortschritt verloren. Dieser Vorgang ist irreversible</p>
            <template slot="modal-footer">
                <b-button size="sm" @click="reset()">
                    Ok
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script lang ="ts">
    import MultipleChoiceTask from '@/datamodel/MultipleChoiceTask.ts'
    import {Component, Prop, Vue} from 'vue-property-decorator';

    export default class extends Vue{
        @Prop() private currentSubtask!: MultipleChoiceTask ;
        private options: string[] = this.currentSubtask.answerOptions;

        //methods
        public save(){
        }

        public compare(){
            //toDo
    }
        public reset(){

        }
    }
</script>

<style scoped>

</style>
