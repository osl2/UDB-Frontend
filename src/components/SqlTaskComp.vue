<template>
    <div>
        <div v-if="currentSubtask._isPointAndClickAllowed" class="switchButton">
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
            <component class="sqlComponent"
                       :is="dynamicComponent"
                       @executeQuery="executeQuery"
            ></component>
        </div>

        <v-button @click='save()'>Speichern</v-button>
        <v-button v-if="currentSubtask._isSolutionVeryfiable" @click='compare()'>Vergleich mit Musterlösung</v-button>

        <div>
            <p v-show="gotFirstQueryExecuted">
                {{$t('sandbox.resultText')}}({{lastQueryExecuted}}):
            </p>
            <QueryResult :queryResult="queryResult"
                         v-show="gotFirstQueryExecuted"
            ></QueryResult>

        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import Query from '@/components/Query.vue';
    import QueryResult from '@/components/QueryResult.vue';
    import PointAndClick from '@/components/PointAndClick.vue';
    import DatabaseComponent from '@/components/DatabaseComponent.vue';
    import SqlTask from '@/dataModel/SqlTask.ts'
    export default {
        name: "SqlTask"
        @Prop currentSubtask: SqlTask;
    public isPointAndClickActive: boolean = false;
    public gotFirstQueryExecuted: boolean = false;
    public query: string = '';
    public lastQueryExecuted: string = '';
    // TODO Array nicht hard coden
    public queryResult: object[] = [
        {Name: 'Schmidt', Vorname: 'Anna', Alter: 50},
        {Name: 'Müller', Vorname: 'Herbert', Alter: 29},
    ];

    // Methods
    public save(){

    }
    public compare(){

    }
    public executeQuery(query: string) {
        this.gotFirstQueryExecuted = true;
        this.query = query;
        this.lastQueryExecuted = query;
        const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
        this.queryResult = dbComponent.$data.database.content.exec(query);
    }
    public switchComponent() {
        this.resetQuery();
        this.isPointAndClickActive = !this.isPointAndClickActive;
    }
    public resetQuery() {
        this.query = '';
    }

    // Computed Properties
    get dynamicComponent() {
        if (this.isPointAndClickActive) {
            return PointAndClick;
        } else {
            return Query;
        }
    }

    }
</script >

<style scoped>
    import {Component, Prop, Vue} from 'vue-property-decorator';

</style>
