<template>
    <div>
        <h3>Aufgabenstellung:</h3>
        <div class="taskContainer">
            {{this.currentSubtask.instruction}}
         </div>
        <div>
            <div v-if="currentSubtask.isPointAndClickAllowed" class="taskSwitchButton">
                <b-button v-on:click="switchComponent"
                          v-if="isPointAndClickActive">
                    {{$t('sandbox.switchToPlainSQL')}}
                </b-button>
                <b-button v-on:click="switchComponent"
                          v-else>
                    {{$t('sandbox.switchToPointAndClick')}}
                </b-button>
            </div>

            <div class="clear">
                <component class="taskSqlComponent"
                           :is="sqlTaskDynamicComponent"
                           @executeQuery="executeQuery"
                ></component>
            </div>

            <div>
                <p v-show="gotFirstQueryExecuted">
                    {{$t('sandbox.resultText')}}({{lastQueryExecuted}}):
                </p>
                <QueryResultView :showResult="showResult"
                             v-show="gotFirstQueryExecuted"
                ></QueryResultView>

            </div>

            <b-button v-b-popover.hover="'Wenn Du diesen Knopf drückst, wird die zuletzt ausgeführte Query gespeichert.'+
            ' Achte darauf, dass Du die Anfrage, die Du speichern willst, auch noch einmal ausführst.'"
                      @click="$emit('save', subtaskSolution)"
            >
                Speichern</b-button>
            <b-button v-show="currentSubtask.isSolutionVisible"
                      @click="$emit('compare', subtaskSolution)">
                Vergleich mit Musterlösung
            </b-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Query from '@/components/Query.vue';
import QueryResultView from '@/components/QueryResult.vue';
import PointAndClick from '@/components/PointAndClick.vue';
import SqlSolution from "@/dataModel/SqlSolution";
import QueryResult from "@/dataModel/QueryResult";

export default Vue.extend({
    props: ['currentSubtask', 'solutions', 'sqlExecutor', 'databaseNumber'],
    components: {
        Query,
        PointAndClick,
        QueryResultView,
    },

    data() {
        return{
            isPointAndClickActive: false,
            gotFirstQueryExecuted: false,
            lastQueryExecuted: '',
            queryResult: {} as QueryResult,

            // TODO Array nicht hard coden
            showResult: [
                 {Name: 'Schmidt', Vorname: 'Anna', Alter: 50},
                {Name: 'Müller', Vorname: 'Herbert', Alter: 29},
            ],

        };
    },
    methods: {
        executeQuery(query: string) {
            this.sqlExecutor.executeQuery(this.databaseNumber, query, 0).then((res: QueryResult) => {
              this.queryResult = res;
              this.gotFirstQueryExecuted = true;
              this.lastQueryExecuted = query;
            }).catch((message: string) => {
              alert(message);
            });
        },

        switchComponent() {
            this.isPointAndClickActive = !this.isPointAndClickActive;
        },
    },
    created() {
        if (this.solutions.has(this.currentSubtask.id)) {
            this.executeQuery(this.solutions.get(this.currentSubtask.id).querySolution);
        }
    },
    computed: {
        sqlTaskDynamicComponent() {
            if (this.isPointAndClickActive) {
                return PointAndClick;
            } else {
                return Query;
            }
        },
        subtaskSolution: {
            get(): SqlSolution {
                return new SqlSolution(this.queryResult.query,this.queryResult.result.columns,
                  this.queryResult.result.values);
            },
        },
    },
});
</script>

<style scoped>
    .taskContainer {
        border: 1px lightgray solid;
        margin: 10px 0px 20px 0px;
        padding: 5px 0px 5px 10px;
    }

</style>
