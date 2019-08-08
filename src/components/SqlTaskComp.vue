<template>
    <div>
    <div>
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
            <QueryResult :queryResult="queryResult"
                         v-show="gotFirstQueryExecuted"
            ></QueryResult>

        </div>

        <b-button @click="$emit('save', currentSubtask.id, subtaskSolution)">Speichern</b-button>
        <b-button v-show="currentSubtask.isSolutionVisible"
                  @click="$emit('compare', subtaskSolution)">
            Vergleich mit Musterlösung
        </b-button>
    </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import Query from '@/components/Query.vue';
import QueryResult from '@/components/QueryResult.vue';
import PointAndClick from '@/components/PointAndClick.vue';
import DatabaseComponent from '@/components/DatabaseComponent.vue';
import SqlTask from '@/dataModel/SqlTask.ts';
import SqlSolution from "@/dataModel/SqlSolution";
export default Vue.extend({
    props: ['currentSubtask', 'solutions'],
    components: {
        Query,
        PointAndClick,
        QueryResult,
    },

    data() {
        return{
            isPointAndClickActive: false,
            gotFirstQueryExecuted: false,
            lastQueryExecuted: '',
            solutionQuery: '',


            // TODO Array nicht hard coden
            queryResult: [
                 {Name: 'Schmidt', Vorname: 'Anna', Alter: 50},
                {Name: 'Müller', Vorname: 'Herbert', Alter: 29},
            ],

        };
    },
    methods: {
        executeQuery(query: string) {
            this.gotFirstQueryExecuted = true;
            this.lastQueryExecuted = query;
            //TODO prüfen ob das so passt -> evtl ; dazu oder läuft das mit mehreren eingaben. wenn ja prüfen ob letztes zeichen schon ; ?
            this.solutionQuery = this.solutionQuery.concat(query);
            const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
            this.queryResult = dbComponent.$data.database.content.exec(query);
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
        //ToDO query result in columns und values umwandeln damit das in der lsg gespeichert werden kann.
        subtaskSolution: {
            get(): SqlSolution {
                return new SqlSolution(this.solutionQuery,[],[]);
            },
        },
    },
});
</script >

<style scoped>

</style>
