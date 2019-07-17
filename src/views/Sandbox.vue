<template>
    <div class="container">
        <div class="switchButton">
            <b-button v-on:click="switchComponent">
                {{switchButtonText}}
            </b-button>
        </div>
        <div>
            <component
                    class="sqlComponent"
                    :is="dynamicComponent"
                    @executeQuery="executeQuery"
            ></component>
            {{query}}
            {{lastQueryExecuted}}
        </div>
        <div>
            <QueryResult :queryResultColumnNames="queryResultColumnNames"
                         :queryResultValues="queryResultValues"
            ></QueryResult>
        </div>

    </div>
</template>


<script lang="ts">

    import Vue from 'vue';
    import Query from '@/components/Query.vue';
    import Test from '@/components/Test.vue';
    import QueryResult from '@/components/QueryResult.vue';

    export default Vue.extend({
        components: {
            Query,
            Test,
            QueryResult,
        },
        data() {
            return {
                isPointAndClickActive: false,
                query: '',
                switchButtonText: 'Point-and-Click Feature',
                lastQueryExecuted: '',
                queryResultColumnNames:['Name', 'Vorname'],
                queryResultValues: [['Schmidt', 'Müller'], ['Anna', 'Herbert']],

            };
        },
        methods: {
            executeQuery: function(query: string) {
                this.query = query;
                this.lastQueryExecuted = query;
                //TODO executeQuery()
            },
            switchComponent: function() {
                this.resetQuery();
                this.isPointAndClickActive = !this.isPointAndClickActive;

            },
            resetQuery: function() {
                this.query = '';
            },

        },

        computed: {
            dynamicComponent: function () {
                if (this.isPointAndClickActive) {
                    this.switchButtonText = 'Zurück zum Textfeld';
                    return Test;
                } else {
                    this.switchButtonText = 'Point-and-Click Feature aktivieren';
                    return Query;
                }
            }
        },

    })

</script>

<style scoped>
    .container {
        width: 80%;
        margin: auto;
    }
    /*.switchButton {
        float: right;
        margin-top: 15px;
        margin-bottom: 15px;
    }*/
    /*.container .btn {
        float: right;
        margin-top: 15px;
        margin-bottom: 15px;
    }*/
    .sqlComponent {
        position: relative;
        margin-bottom: 15px;
    }


</style>
