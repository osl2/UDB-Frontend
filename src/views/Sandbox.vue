<template>
    <div class="container">
        <div class="switchButton">
            <b-button v-on:click="switchComponent">
                {{switchButtonText}}
            </b-button>
        </div>
        <div class="clear">
            <component
                    class="sqlComponent"
                    :is="dynamicComponent"
                    @executeQuery="executeQuery"
            ></component>
            {{query}}
            {{lastQueryExecuted}}
        </div>
        <div>
            <QueryResult :queryResult="queryResult"
                         v-show="gotFirstQueryExecuted"
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
                gotFirstQueryExecuted: false,
                query: '',
                switchButtonText: 'Point-and-Click Feature',
                lastQueryExecuted: '',
                queryResult: [
                    {Name: 'Schmidt', Vorname: 'Anna', Alter: 50},
                    {Name: 'Müller', Vorname: 'Herbert', Alter: 29},
                ],

            };
        },
        methods: {
            executeQuery: function(query: string) {
                this.gotFirstQueryExecuted = true;
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
    .switchButton {
        float: right;
        margin-top: 15px;
        margin-bottom: 15px;
    }
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
<!-- TODO auslagern in globales CSS sheet -->
<style>
    .clear {
        clear: both;
    }
</style>