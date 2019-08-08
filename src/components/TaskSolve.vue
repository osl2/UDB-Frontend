<template>
    <div>
    <DatabaseComponent></DatabaseComponent>

        <div v-if="typeOfSubtask()===1">
            <SqlTaskComp :currentSubtask="currentSubtask"
                         :solutions="solutions"
                         @save="$emit('save', currentSubtask.id, subtaskSolution)"
                         @compare="$emit('compare', subtaskSolution)"
            >
            </SqlTaskComp>
        </div>
        <div v-else-if="typeOfSubtask()===2">
            <McTask :currentSubtask="currentSubtask"
                    :solutions="solutions"
                    @save="$emit('save', currentSubtask.id, subtaskSolution)"
                    @compare="$emit('compare', subtaskSolution)"
            >
            </McTask>
        </div>
        <div v-else-if="typeOfSubtask()===3">
            <TextTask :currentSubtask="currentSubtask"
                      :solutions="solutions"
                      @save="$emit('save', currentSubtask.id, subtaskSolution)"
                      @compare="$emit('compare', subtaskSolution)"
            >
            </TextTask>
        </div>
        <div v-else>
            <InstructionTaskComp :currentSubtask="currentSubtask"></InstructionTaskComp>
        </div>

        <!-- Buttons to navigate through one task-->
        <div>
            <b-card no-body >
                <div class="bg-secondary text-light">
                   Teilaufgabe {{subtaskId}} von {{numberOfSubtasks}}
                </div>
            </b-card>
        </div>
        <div>
            <b-button @click="$emit('prevSubtask')">Vorherige Aufgabe</b-button>
            <b-button @click="$emit('nextSubtask')">nächste Aufgabe</b-button>
        </div>

        <div>
            <b-button @click="$emit('switchback')">Zurück zur Übersicht</b-button>

            <b-button class="btn" v-b-modal.modal-reset>Aufgabe zurücksetzen</b-button>
            <b-modal id="modal-reset">
                <p>Wenn Du die Aufgabe zurücksetzt, geht Dein bisheriger Fortschritt aller zugehörigen Teilaufgaben
                    verloren. Du kannst diesen Vorgang nicht rückgängig machen.</p>
                <template slot="modal-footer">
                    <b-button size="sm" @click="$emit('reset')">
                        Aufgabe zurücksetzen
                    </b-button>
                    <b-button size="sm" @click="$bvModal.hide('modal-reset')">
                        Abbrechen
                    </b-button>
                </template>
            </b-modal>

        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DatabaseComponent from "@/components/DatabaseComponent.vue";
  import InstructionTaskComp from '@/components/InstructionTaskComp.vue';
  import SqlTaskComp from '@/components/SqlTaskComp.vue';
  import McTask from '@/components/McTask.vue';
  import TextTask from '@/components/TextTask.vue';
  import SubtaskTypes from "@/dataModel/SubtaskTypes";


  export default Vue.extend({
    props: ['currentSubtask', 'solutions', 'subtaskIndex', 'numberOfSubtasks'],



    components: {
        SqlTaskComp,
        TextTask,
        McTask,
        InstructionTaskComp,
        DatabaseComponent,
    },
    methods: {
      typeOfSubtask(): number {
          if (this.currentSubtask.type === SubtaskTypes.Sql) {
              return 1;
          } else if (this.currentSubtask.type === SubtaskTypes.MultipleChoice) {
              return 2;
          } else if (this.currentSubtask.type === SubtaskTypes.PlainText) {
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
