<template>
    <div>
        <div class="taskHeader">
            <h2>{{ task.name }}</h2>
            <h3>
                {{ $t('taskSolve.subtask') }} {{ subtaskIndex + 1 }} {{ $t('taskSolve.of') }} {{ numberOfSubtasks }}
            </h3>
        </div>
        <div class="containerDatabase">
            <h3>{{ $t('taskSolve.dbOverview') }}</h3>
            <DatabaseComponent ref="databaseComponent" :element-id="task.id"></DatabaseComponent>
        </div>
        <!--Loads the component that matches the type of the current Subtask -->
        <div class="my-3">
            <div v-if="typeOfSubtask() === 1">
                <SqlTaskComp
                    :current-subtask="currentSubtask"
                    :solutions="solutions"
                    :query-result="queryResult"
                    :got-first-query-executed="gotFirstQueryExecuted"
                    :last-query-executed="lastQueryExecuted"
                    @save="saveSubtask"
                    @executeQuery="executeQuery"
                    @compare="compare"
                ></SqlTaskComp>
            </div>
            <div v-else-if="typeOfSubtask() === 2">
                <McTask
                    :current-subtask="currentSubtask"
                    :solutions="solutions"
                    @save="saveSubtask"
                    @compare="compare"
                ></McTask>
            </div>
            <div v-else-if="typeOfSubtask() === 3">
                <TextTask
                    :current-subtask="currentSubtask"
                    :solutions="solutions"
                    @save="saveSubtask"
                    @compare="compare"
                ></TextTask>
            </div>
            <div v-else>
                <InstructionTaskComp :current-subtask="currentSubtask"></InstructionTaskComp>
            </div>
        </div>

        <!-- Buttons to navigate through one task-->
        <div class="d-flex my-4 justify-content-between">
            <b-button :disabled="!hasPreviousSubtask" @click="$emit('prevSubtask')">
                {{ $t('taskSolve.prevSubtask') }}
            </b-button>

            <div>
                <b-button @click="$emit('switchback')">
                    {{ $t('taskSolve.toOverview') }}
                </b-button>
                <b-button class="btn btn-danger ml-3" @click="$emit('reset')">
                    {{ $t('taskSolve.resetTask') }}
                </b-button>
            </div>

            <b-button :disabled="!hasNextSubtask" @click="$emit('nextSubtask')">
                {{ $t('taskSolve.nextSubtask') }}
            </b-button>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import DatabaseComponent from '@/components/DatabaseComponent.vue';
import SqlTaskComp from '@/components/SqlTaskComp.vue';
import McTask from '@/components/McTask.vue';
import TextTask from '@/components/TextTask.vue';
import SubtaskTypes from '@/dataModel/SubtaskTypes';
import Solution from '@/dataModel/Solution';
import Task from '@/dataModel/Task';
import Subtask from '@/dataModel/Subtask';
import Database from '@/dataModel/Database';
import InstructionTaskComp from '@/components/InstructionTaskComp.vue';
import SQLExecutor from '@/controller/SQLExecutor';
import QueryResult from '@/dataModel/QueryResult';

@Component({
    components: {
        SqlTaskComp,
        McTask,
        TextTask,
        InstructionTaskComp,
        DatabaseComponent,
    },
})
export default class TaskSolve extends Vue {
    @Prop() private task!: Task;
    @Prop() private currentSubtask!: Subtask;
    @Prop() private solutions!: Map<string, Solution>;
    @Prop() private subtaskIndex!: number;
    @Prop() private numberOfSubtasks!: number;
    @Prop() private database!: Database;
    @Prop() private hasNextSubtask!: boolean;
    @Prop() private hasPreviousSubtask!: boolean;
    private sqlExecutor: SQLExecutor = this.$store.getters.sqlExecutor;
    private queryResult: QueryResult = {} as QueryResult;
    private gotFirstQueryExecuted: boolean = false;
    private lastQueryExecuted: string = '';

    public created() {
        this.sqlExecutor = this.$store.getters.sqlExecutor;
    }

    public mounted() {
        this.initDatabase();
    }
    /*
        method executes the query created by the student and checks if only allowed Statements are used
        */
    public executeQuery(query: string) {
        const dbComponent: DatabaseComponent = (this.$refs.databaseComponent as unknown) as DatabaseComponent;
        const dbNumber = dbComponent.$data.databaseNumber;
        this.sqlExecutor
            .executeQuery(dbNumber, query, 0)
            .then((queryResult: QueryResult) => {
                this.queryResult = queryResult;
                const VueScrollTo = require('vue-scrollto');
                const options = {
                    easing: 'ease-in',
                };
                VueScrollTo.scrollTo('#queryResult', 500, options);
                dbComponent.loadMetaData();
                this.gotFirstQueryExecuted = true;
                this.lastQueryExecuted = query;
            })
            .catch((e: string) => {
                alert(e);
            });
    }

    @Watch('database')
    public onDatabaseChange(value: Database, oldValue: Database) {
        if (value !== oldValue) {
            this.initDatabase();
            return;
        }
    }

    public compare(solution: Solution) {
        this.$emit('compare', solution);
    }

    /*
     * Calls the methods save in StudentWorksheet.vue
     */
    public saveSubtask(solution: Solution): void {
        this.$emit('save', this.currentSubtask.id, solution);
    }

    /*
     * opens the database provided through props
     */
    public initDatabase() {
        const dbComponent: DatabaseComponent = (this.$refs.databaseComponent as unknown) as DatabaseComponent;
        dbComponent.postInit(Promise.resolve(this.database));
    }

    private typeOfSubtask(): number {
        if (this.currentSubtask.type === SubtaskTypes.Sql) {
            return 1;
        } else if (this.currentSubtask.type === SubtaskTypes.MultipleChoice) {
            return 2;
        } else if (this.currentSubtask.type === SubtaskTypes.PlainText) {
            return 3;
        } else {
            // Instruction Task
            return 4;
        }
    }
}
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
