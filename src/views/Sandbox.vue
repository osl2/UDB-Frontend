<template>
    <div>
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

    export default Vue.extend({
        components: {
            Query,
        },
        data() {
            return {
                query: '',
            }
        },
        methods: {
            executeQuery: function(query: string){
                this.query = query;
            }
        }
    })

</script>

<style scoped>

</style>
