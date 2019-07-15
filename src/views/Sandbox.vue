<template>
    <div>
        <component :is="dynamicComponent"></component>
        <b-button @click="switchComponent"> Wechsel </b-button>
        <b-container class="bv-example-row">
            <b-row>
                <b-col sm="10" offset="1">
                    <Query
                            @executeQuery="executeQuery"
                    ></Query>
                </b-col>
            </b-row>

            {{query}}
        </b-container>
    </div>
</template>


<script lang="ts">

    import Vue  from 'vue';
    import Query from '@/components/Query.vue';
    import Test from '@/components/Test.vue'

    export default Vue.extend({
        components: {
            Query,
            Test,
        },
        data() {
            return {
                isPointAndClickActive: false,
                dynamicComponent: Query,
                query: '',
            }
        },
        methods: {
            executeQuery: function(query: string){
                this.query = query;
            },
            switchComponent: function () {
                if (this.isPointAndClickActive) {
                    this.isPointAndClickActive = false;
                    this.dynamicComponent = Query;
                } else {
                    this.isPointAndClickActive = true;
                    this.dynamicComponent = Test;
                }
            }
        },
    })

</script>

<style scoped>

</style>
