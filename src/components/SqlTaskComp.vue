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
    </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import Query from '@/components/Query.vue';
    import QueryResult from '@/components/QueryResult.vue';
    import PointAndClick from '@/components/PointAndClick.vue';
    import DatabaseComponent from '@/components/DatabaseComponent.vue';
    import SqlTask from '@/dataModel/SqlTask.ts'
    export default Vue.extend({
        props: ['currentSubtask'],
        components:{
          Query,
          PointAndClick,
            QueryResult,
        },
        data(){
            return{
                isPointAndClickActive: false,
        gotFirstQueryExecuted: false,
        query:'',
        lastQueryExecuted: '',
            // TODO Array nicht hard coden
        queryResult:[
                {Name: 'Schmidt', Vorname: 'Anna', Alter: 50},
                {Name: 'Müller', Vorname: 'Herbert', Alter: 29},
            ],

            };
        },
        methods: {
            executeQuery(query: string) {
                this.gotFirstQueryExecuted = true;
                this.query = query;
                this.lastQueryExecuted = query;
                const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
                this.queryResult = dbComponent.$data.database.content.exec(query);
            },

            switchComponent() {
                this.resetQuery();
                this.isPointAndClickActive = !this.isPointAndClickActive;
            },

            resetQuery() {
                this.query = '';
            },
        },
        computed:{
            sqlTaskDynamicComponent() {
                if (this.isPointAndClickActive) {
                    return PointAndClick;
                } else {
                    return Query;
                }
            }
        }
    })


</script >

<style scoped>

</style>
