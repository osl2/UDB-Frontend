<template>
    <div>
        <h3>{{ $t('taskComp.instruction') }}</h3>
        <div class="taskContainer">
            {{ currentSubtask.instruction }}
        </div>

        <div v-if="currentSubtask.allowedSqlStatements === 1">
            {{ $t('sqlTaskComp.select') }}
        </div>

        <div>
            <div v-if="currentSubtask.isPointAndClickAllowed" class="taskSwitchButton">
                <b-button v-if="isPointAndClickActive" @click="switchComponent">
                    {{ $t('sandbox.switchToPlainSQL') }}
                </b-button>
                <b-button v-else @click="switchComponent">
                    {{ $t('sandbox.switchToPointAndClick') }}
                </b-button>
            </div>

            <div class="clear">
                <component
                    :is="sqlTaskDynamicComponent"
                    class="taskSqlComponent"
                    :allowed-sql-toolbox="allowedSqlToolbox"
                    @executeQuery="executeQuery"
                ></component>
            </div>

            <div v-if="gotFirstQueryExecuted">
                <p>{{ $t('sandbox.resultText') }}({{ lastQueryExecuted }}):</p>
                <QueryResultComp
                    :columns="queryResult.result.columns"
                    :rows="queryResult.result.values"
                ></QueryResultComp>
            </div>

            <b-button v-b-popover.hover="$t('sqlTaskComp.save')" @click="$emit('save', subtaskSolution)">
                {{ $t('taskComp.save') }}
            </b-button>
            <b-button
                v-if="currentSubtask.isSolutionVisible"
                id="compareSolutionButtonSQL"
                @click="$emit('compare', subtaskSolution)"
            >
                {{ $t('taskComp.compare') }}
            </b-button>
            <b-popover
                target="compareSolutionButtonSQL"
                triggers="hover focus"
                :content="$t('hoverText.compareSolutionMessage')"
            ></b-popover>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Query from '@/components/Query.vue';
import QueryResultComp from '@/components/QueryResult.vue';
import PointAndClick from '@/components/PointAndClick.vue';
import SqlSolution from '@/dataModel/SqlSolution';
import SqlTask from '@/dataModel/SqlTask';
import AllowedSqlStatements from '@/dataModel/AllowedSqlStatements';
import Subtask from '@/dataModel/Subtask';
import Solution from '@/dataModel/Solution';
import QueryResult from '@/dataModel/QueryResult';
import SQLExecutor from '@/controller/SQLExecutor';

@Component({
    components: {
        Query,
        PointAndClick,
        QueryResultComp,
    },
})
export default class SqlTaskComp extends Vue {
    @Prop() private currentSubtask!: Subtask;
    @Prop() private solutions!: Map<string, Solution>;
    @Prop() private queryResult!: QueryResult;
    @Prop() private gotFirstQueryExecuted!: boolean;
    @Prop() private lastQueryExecuted!: string;
    private isPointAndClickActive: boolean = false;
    private allowedSqlToolbox: string = 'toolbox_all.xml';
    private sqlExecutor: SQLExecutor = this.$store.getters.sqlExecutor;

    get sqlTaskDynamicComponent() {
        const subtask: SqlTask = this.currentSubtask as SqlTask;
        if (this.isPointAndClickActive && subtask.isPointAndClickAllowed) {
            return PointAndClick;
        } else {
            return Query;
        }
    }

    get subtaskSolution(): SqlSolution {
        const values: string[][] = [[]];
        let i = 0;
        for (const row of this.queryResult.result.values) {
            values.push([]);
            for (const cell of row) {
                if (cell != null) {
                    values[i].push(cell.toString());
                } else {
                    values[i].push('null');
                }
            }
            i++;
        }
        return new SqlSolution(this.queryResult.query, this.queryResult.result.columns, values);
    }

    created() {
        if (this.solutions.has(this.currentSubtask.id)) {
            const solution: SqlSolution = this.solutions.get(this.currentSubtask.id) as SqlSolution;
            this.executeQuery(solution.querySolution);
        }
        const tempSubtask = this.currentSubtask as SqlTask;
        if (tempSubtask.allowedSqlStatements === AllowedSqlStatements.SelectStatements) {
            this.allowedSqlToolbox = 'toolbox_query.xml';
        } else {
            this.allowedSqlToolbox = 'toolbox_all.xml';
        }
    }

    mounted() {
        if (this.solutions.has(this.currentSubtask.id)) {
            const solution: SqlSolution = this.solutions.get(this.currentSubtask.id) as SqlSolution;
            this.executeQuery(solution.querySolution);
        }
        const tempSubtask = this.currentSubtask as SqlTask;
        if (tempSubtask.allowedSqlStatements === AllowedSqlStatements.SelectStatements) {
            this.allowedSqlToolbox = 'toolbox_query.xml';
        } else {
            this.allowedSqlToolbox = 'toolbox_all.xml';
        }
    }

    private executeQuery(query: string) {
        if (this.checkAllowedSqlStatements(query)) {
            this.$emit('executeQuery', query);
        } else {
            alert(this.$t('sqlTaskComp.alertStatement') as string);
        }
    }

    /*
    checks if the query the student created only uses sql statements that are allowed to use in the subtask
     */
    checkAllowedSqlStatements(query: string): boolean {
        const tempSubtask = this.currentSubtask as SqlTask;
        if (tempSubtask.allowedSqlStatements === AllowedSqlStatements.SelectStatements) {
            // check if the input contains a statement which is NOT allowed
            const regexSelect = new RegExp('^/(drop)|(alter)|(create)|(update)|(insert)|(delete)/', 'i');
            if (query.match(regexSelect) === null) {
                return true;
            } else {
                return false;
            }
        } else {
            // no restrictions on the query input
            return true;
        }
    }

    switchComponent() {
        this.isPointAndClickActive = !this.isPointAndClickActive;
    }
}
</script>

<style scoped>
.taskContainer {
    border: 1px lightgray solid;
    margin: 10px 0px 20px 0px;
    padding: 5px 0px 5px 10px;
}
</style>
