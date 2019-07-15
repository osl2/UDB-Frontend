<template>
    <div>

        <b-container class="queryContainer">
            <b-row>
                <b-col sm="10" offset="1">
                    <component
                            :is="dynamicComponent"
                            @executeQuery="executeQuery"
                    ></component>
                    <b-button @click="switchComponent"> Wechsel </b-button>
                </b-col>
            </b-row>

            {{query}}
        </b-container>
    </div>
</template>


<script lang="ts">

    import Vue from 'vue';
    import Query from '@/components/Query.vue';
    import Test from '@/components/Test.vue';

    export default Vue.extend({
        components: {
            Query,
            Test,
        },
        data() {
            return {
                isPointAndClickActive: false,
                query: '',
            };
        },
        methods: {
            executeQuery: function(query: string) {
                this.query = query;
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
                    return Test;
                } else {
                    return Query;
                }
            }
        },

    })

</script>

<style scoped>

</style>
