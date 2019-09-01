<template>
    <div>
        <b-form-input
            v-model="subtask.instruction"
            :placeholder="$t('subtaskCreation.instruction')"
            @change="change()"
        ></b-form-input>

        <b-form-group :label="$t('subtaskCreation.allowedSql')">
            <b-form-radio v-model="subtask.allowedSqlStatements" :value="0">
                {{ $t('subtaskCreation.noRestriction') }}
            </b-form-radio>
            <b-form-radio v-model="subtask.allowedSqlStatements" :value="1">
                {{ $t('subtaskCreation.select') }}
            </b-form-radio>
        </b-form-group>

        <b-form-group :label="$t('subtaskCreation.PandC')">
            <b-form-radio v-model="subtask.isPointAndClickAllowed" :value="true">
                {{ $t('subtaskCreation.yes') }}
            </b-form-radio>
            <b-form-radio v-model="subtask.isPointAndClickAllowed" :value="false">
                {{ $t('subtaskCreation.no') }}
            </b-form-radio>
        </b-form-group>

        <b-form-group :label="$t('subtaskCreation.verifiable')">
            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="true">
                {{ $t('subtaskCreation.yes') }}
            </b-form-radio>
            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="false">
                {{ $t('subtaskCreation.no') }}
            </b-form-radio>
        </b-form-group>

        <div v-if="subtask.isSolutionVeryfiable">
            <h4>Lösung</h4>
            <b-input-group>
                <b-form-input
                    v-model="subtask.solution.querySolution"
                    :placeholder="$t('subtaskCreation.visible')"
                    @change="change()"
                ></b-form-input>
                <b-input-group-append>
                    <b-button @click="executeQuery()">Ausführen</b-button>
                </b-input-group-append>
            </b-input-group>
            <QueryResult :columns="columns" :rows="rows"></QueryResult>
            <b-form-group :label="$t('subtaskCreation.visible')">
                <b-form-radio v-model="subtask.isSolutionVisible" :value="true">
                    {{ $t('subtaskCreation.yes') }}
                </b-form-radio>
                <b-form-radio v-model="subtask.isSolutionVisible" :value="false">
                    {{ $t('subtaskCreation.no') }}
                </b-form-radio>
            </b-form-group>

            <b-form-group v-if="subtask.isSolutionVisible" :label="$t('subtaskCreation.rowOrder')">
                <b-form-radio v-model="subtask.doesRowOrderMatter" :value="true">
                    {{ $t('subtaskCreation.yes') }}
                </b-form-radio>
                <b-form-radio v-model="subtask.doesRowOrderMatter" :value="false">
                    {{ $t('subtaskCreation.no') }}
                </b-form-radio>
            </b-form-group>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SqlTask from '../dataModel/SqlTask';
import QueryResult from '@/components/QueryResult.vue';
import SqlSolution from '@/dataModel/SqlSolution';

@Component({
    components: {
        QueryResult,
    },
})
export default class SubtaskEditSql extends Vue {
    @Prop() private value!: SqlTask;
    @Prop() private resultBus!: Vue; // used to send results of sql query to this component

    private subtask!: SqlTask;
    private columns: string[] = [];
    private rows: string[][] = [[]];

    public created() {
        this.subtask = this.value;
        this.resultBus.$on('result-' + this.subtask.id, this.receivedResult);
    }

    public receivedResult(columns: string[], rows: string[][]) {
        this.columns = columns;
        this.rows = rows;
        (this.subtask.solution as SqlSolution).columns = columns;
        (this.subtask.solution as SqlSolution).values = rows;
        this.$emit('input', this.subtask);
    }

    public executeQuery() {
        this.$emit('executeQuery', (this.subtask.solution as SqlSolution).querySolution);
    }

    public change() {
        this.$emit('input', this.subtask);
    }
}
</script>

<style scoped></style>
