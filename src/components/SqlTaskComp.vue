<template>
    <div>
        {{this.currentSubtask.instruction}}
    </div>
    <div>
        <div v-if="currentSubtask.isPointAndClickAllowed" class="switchButton">
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
        <v-button v-if="currentSubtask.isSolutionVeryfiable" @click='compare()'>Vergleich mit Musterlösung</v-button>
        <b-modal>
            <p>Wenn du die Teilaufgabe zurücksetzt geht dein bisheriger Fortschritt verloren. Dieser Vorgang ist irreversible</p>
            <template slot="modal-footer">
                <b-button size="sm" @click="reset()">
                   Ok
                </b-button>
            </template>
        </b-modal>

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
    import Query from '@/components/Query.vue';
    import QueryResult from '@/components/QueryResult.vue';
    import PointAndClick from '@/components/PointAndClick.vue';
    import DatabaseComponent from '@/components/DatabaseComponent.vue';
    import SqlTask from '@/dataModel/SqlTask.ts'
    export default class extends Vue {
        @Prop() currentSubtask!: SqlTask;
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
    public reset(){

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

</style>
