<template>
    <div>
        <HelpButton :helpmsg="$t('helpMessages.sandbox')"></HelpButton>
        <DatabaseComponent elementId="sandbox-dropzone-db" showExportImport="true" loadSandboxLocalStorageDb="true"
                           ref="databaseComponent"
                           @databaseExists="eventDbExists" @reset="reset"></DatabaseComponent>
        <div v-if="databaseExists" :databaseExists:sync="databaseExists">
            <div class="btn switchButton float-right">
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
                           allowedSqlToolbox="toolbox_all.xml"
                ></component>
            </div>
            <div id="queryRes"></div>
            <div v-if="queryResult">
                <p>
                    {{$t('sandbox.resultText')}}({{queryResult.query}}):
                </p>
                <QueryResultComp :columns="queryResult.result.columns" :rows="queryResult.result.values"
                ></QueryResultComp>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Query from '@/components/Query.vue';
    import QueryResultComp from '@/components/QueryResult.vue';
    import PointAndClick from '@/components/PointAndClick.vue';
    import DatabaseComponent from '@/components/DatabaseComponent.vue';
    import QueryResult from '@/dataModel/QueryResult';
    import SQLExecutor from "@/controller/SQLExecutor";
    import HelpButton from "@/components/HelpButton.vue";


    @Component({
        components: {
            Query,
            QueryResultComp,
            PointAndClick,
            DatabaseComponent,
            HelpButton,
        },
    })

    export default class Sandbox extends Vue {

        // Data
        public isPointAndClickActive: boolean = false;
        public queryResult: QueryResult | null = null;
        private databaseExists: boolean = false;
        private sqlExecutor: SQLExecutor = this.$store.getters.sqlExecutor;

        get database() {
            const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
            if (dbComponent) {
                return dbComponent.$data.database;
            } else {
                return null;
            }
        }

        // Computed Properties
        private get dynamicComponent() {
            if (this.isPointAndClickActive) {
                return PointAndClick;
            } else {
                return Query;
            }
        }

        // Methods

        private executeQuery(query: string) {
            const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
            const dbNumber = dbComponent.$data.databaseNumber;
            this.sqlExecutor.executeQuery(dbNumber, query, 0).then((queryResult) => {
                this.queryResult = queryResult;
                const top = document.getElementById('queryRes')!.offsetTop; // Getting Y of target element
                window.scrollTo(0, top + 200);

                // this is not optimal because select requests does not need to replace database in storage neither metadata
                // fix by implementing the logic by detecting query type (select, update or delete)
                dbComponent.loadMetaData();
                dbComponent.replaceStorage();
            }).catch((error) => {
                alert(error.message);
            });
        }

        private eventDbExists(val: boolean) {
            this.databaseExists = val;
        }

        private reset() {
            this.queryResult = null;
        }

        private switchComponent() {
            this.isPointAndClickActive = !this.isPointAndClickActive;
        }
    }
</script>

<style scoped>
    .switchButton {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .sqlComponent {
        position: relative;
        margin-bottom: 15px;
    }

    /deep/.clear {
         clear: both;
     }
</style>
