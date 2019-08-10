<template>
    <div>
        <div class="taskHeader">
            <h2>{{task.name}}</h2>
            <h3>Teilaufgabe {{subtaskIndex+1}} von {{numberOfSubtasks}}</h3>
        </div>
        <div class="containerDatabase">
            <h3>Übersicht über die Datenbank:</h3>
            <DatabaseComponent :elementId="task.id" showImportExport="false" ref="databaseComponent"></DatabaseComponent>
        </div>
        <div v-if="typeOfSubtask()===1">
            <SqlTaskComp :currentSubtask="currentSubtask"
                         :solutions="solutions"
                         :sqlExecutor="sqlExecutor"
                         :databaseNumber="databaseNumber"
                         @save="saveSubtask"
                         @compare="$emit('compare', subtaskSolution)"
            >
            </SqlTaskComp>
        </div>
        <div v-else-if="typeOfSubtask()===2">
            <McTask :currentSubtask="currentSubtask"
                    :solutions="solutions"
                    @save="saveSubtask"
                    @compare="$emit('compare', subtaskSolution)"
            >
            </McTask>
        </div>
        <div v-else-if="typeOfSubtask()===3">
            <TextTask :currentSubtask="currentSubtask"
                      :solutions="solutions"
                      @save="saveSubtask"
                      @compare="$emit('compare', subtaskSolution)"
            >
            </TextTask>
        </div>
        <div v-else>
            <InstructionTaskComp :currentSubtask="currentSubtask"></InstructionTaskComp>
        </div>

        <!-- Buttons to navigate through one task-->
        <div>
            <b-button @click="$emit('prevSubtask')">Vorherige Aufgabe</b-button>
            <b-button @click="$emit('nextSubtask')">nächste Aufgabe</b-button>
        </div>
        <div class="clear"></div>

        <div>
            <b-button @click="$emit('switchback')">Zurück zur Übersicht</b-button>

            <b-button class="btn" v-b-modal.modal-reset>Aufgabe zurücksetzen</b-button>
            <b-modal id="modal-reset">
                <p>Wenn Du die Aufgabe zurücksetzt, geht Dein bisheriger Fortschritt aller zugehörigen Teilaufgaben
                    verloren. Du kannst diesen Vorgang nicht rückgängig machen.</p>
                <template slot="modal-footer">
                    <b-button size="sm" @click="$emit('reset'),$bvModal.hide('modal-reset')">
                        Aufgabe neu starten
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
import Solution from "@/dataModel/Solution";
import SQLExecutor from "@/controller/SQLExecutor";
import SQLService from "@/services/SQLService";


export default Vue.extend({
    props: ['task', 'currentSubtask', 'solutions', 'subtaskIndex', 'numberOfSubtasks', 'database'],
    data() {
      return {
        sqlExecutor: new SQLExecutor() as SQLService,
        databaseNumber: 0 as number,
        };
    },
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

      /**
       * Calls the methods save in StudentWorksheet.vue
       */
      saveSubtask(solution: Solution): void {
        this.$emit('save', this.currentSubtask.id, solution);
      },

      /**
       * opens the database provided through props
       */
      initDatabase() {
          const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
          dbComponent.postInit(Promise.resolve(this.database));
        // this.sqlExecutor.open(this.database).then((dbNumber: number) => {
        //   this.databaseNumber = dbNumber;
        // });
      },


      created() {
        this.initDatabase();
      },
    },
});
</script>

<style scoped>
    .taskHeader {
        padding-top: 15px;
        padding-bottom: 15px;
        margin-bottom: 35px;
        text-align: center;
        background-color: #17a2b8;
        color: white;
    }
    .containerDatabase {
        margin-bottom: 20px;
    }

</style>
