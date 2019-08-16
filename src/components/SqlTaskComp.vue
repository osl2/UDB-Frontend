<template>
    <div>
        <h3>{{$t('taskComp.instruction')}}</h3>
        <div class="taskContainer">
            {{currentSubtask.instruction}}
         </div>

        <div v-if ="currentSubtask.allowedSqlStatements === 1">
            {{$t('sqlTaskComp.select')}}
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
                           :allowedSqlToolbox="allowedSqlToolbox"
                           @executeQuery="executeQuery"
                ></component>
            </div>

            <div v-if="gotFirstQueryExecuted">
                <p>
                    {{$t('sandbox.resultText')}}({{lastQueryExecuted}}):
                </p>
                <QueryResultComp :columns="queryResult.result.columns"
                                 :rows="queryResult.result.values"
                ></QueryResultComp>

            </div>

            <b-button v-b-popover.hover="this.$t('sqlTaskComp.hover')" as string
                      @click="$emit('save', subtaskSolution)"
            >
                {{$t('taskComp.save')}}</b-button>
            <b-button v-if="currentSubtask.isSolutionVisible"
                      @click="$emit('compare', subtaskSolution)">
                {{$t('taskComp.compare')}}
            </b-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Query from '@/components/Query.vue';
import QueryResultComp from '@/components/QueryResult.vue';
import PointAndClick from '@/components/PointAndClick.vue';
import SqlSolution from "@/dataModel/SqlSolution";
import QueryResult from "@/dataModel/QueryResult";
import SqlTask from "@/dataModel/SqlTask";
import AllowedSqlStatements from "@/dataModel/AllowedSqlStatements";
import DatabaseComponent from "@/components/DatabaseComponent.vue";

export default Vue.extend({
    props: ['currentSubtask', 'solutions', 'queryResult', 'gotFirstQueryExecuted', 'lastQueryExecuted'],
    components: {
        Query,
        PointAndClick,
        QueryResultComp,
    },

    data() {
        return {
            isPointAndClickActive: false,
            allowedSqlToolbox: 'toolbox_all.xml',
            sqlExecutor: this.$store.getters.sqlExecutor,
        };
    },
    methods: {

      executeQuery(query: string) {
        if (this.checkAllowedSqlStatements(query)) {
          this.$emit('executeQuery', query);
        } else {
            alert(this.$t('sqlTaskComp.alertStatement') as string);
        }
      },

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
      },

        switchComponent() {
            this.isPointAndClickActive = !this.isPointAndClickActive;
        },
    },

    created() {
        if (this.solutions.has(this.currentSubtask.id)) {
            this.executeQuery(this.solutions.get(this.currentSubtask.id).querySolution);
        }
        const tempSubtask = this.currentSubtask as SqlTask;
        if (tempSubtask.allowedSqlStatements === AllowedSqlStatements.SelectStatements) {
            this.allowedSqlToolbox = 'toolbox_query.xml';
        } else {
            this.allowedSqlToolbox = 'toolbox_all.xml';
        }
    },

    computed: {
        sqlTaskDynamicComponent() {
            if (this.isPointAndClickActive && this.currentSubtask.isPointAndClickAllowed) {
                return PointAndClick;
            } else {
                return Query;
            }
        },

        subtaskSolution: {
            get(): SqlSolution {
                const values: string[][] = [[]];
                let i = 0;
                for (const row of this.queryResult.result.values) {
                    values.push([]);
                    for (const cell of row) {
                        if (cell != null) {
                            values[i].push(cell.toString());
                        } else {
                            values[i].push("null");
                        }
                    }
                    i++;
                }
                return new SqlSolution(this.queryResult.query, this.queryResult.result.columns,
                  values);
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
