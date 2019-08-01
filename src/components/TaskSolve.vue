<template>
    <div>
    <DatabaseComponent></DatabaseComponent>

        <div v-if="typeOfSubtask()===1">
            <SqlTaskComp :currentSubtask="currentSubtask"> </SqlTaskComp>
        </div>
        <div v-else-if="typeOfSubtask()===2">
            <McTask :currentSubtask="currentSubtask"> </McTask>
        </div>
        <div v-else-if="typeOfSubtask()===3">
            <TextTask :currentSubtask="currentSubtask"> </TextTask>
        </div>
        <div v-else>
            <InstructionTaskComp :currentSubtask="currentSubtask"> </InstructionTaskComp>
        </div>

    <div>
        <b-button @click="$emit('prevSubtask')">Vorherige Aufgabe</b-button>
        <b-button @click="$emit('nextSubtask')">nächste Aufgabe</b-button>

    </div>
        <div>
            <b-button @click="$emit('switchback')">Zurück zur Übersicht</b-button>
            <b-button @click="$emit('save')">Speichern</b-button>
            <b-button v-show="currentSubtask.isSolutionVeryfiable"
                      @click="$emit('compare')">
                Vergleich mit Musterlösung
            </b-button>

            <b-button class="btn" v-b-modal.modal-reset>Aufgabe zurücksetzen</b-button>
            <b-modal id="modal-reset">
                <p>Wenn du die Teilaufgabe zurücksetzt geht dein bisheriger Fortschritt verloren. Dieser Vorgang ist irreversible</p>
                <template slot="modal-footer">
                    <b-button size="sm" @click="$emit('reset')">
                        Ok
                    </b-button>
                </template>
            </b-modal>

        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DatabaseComponent from "@/components/DatabaseComponent.vue";
import Task from "@/dataModel/Task.js";
import SqlTask from '@/dataModel/SqlTask.js';
import Subtask from "@/dataModel/Subtask.js";
import MultipleChoiceTask from '@/dataModel/MultipleChoiceTask.js';
import PlainTextTask from '@/dataModel/PlainTextTask.js';
import InstructionTaskComp from '@/components/InstructionTaskComp.vue';
import SqlTaskComp from '@/components/SqlTaskComp.vue';
import McTask from '@/components/McTask.vue';
import TextTask from '@/components/TextTask.vue';

export default Vue.extend({
    props: ['currentSubtask'],



    components: {
        SqlTaskComp,
        TextTask,
        McTask,
        InstructionTaskComp,
        DatabaseComponent,
    },
    methods: {
      typeOfSubtask(): number {
          if (this.currentSubtask.type === 'sql') {
              return 1;
          } else if (this.currentSubtask.type === 'mc') {
              return 2;
          } else if (this.currentSubtask.type === 'text') {
              return 3;
          } else { // Instruction Task
              return 4;
          }

      },
    },
});
</script>

<style scoped>

</style>
