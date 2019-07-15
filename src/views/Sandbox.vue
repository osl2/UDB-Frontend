<template>
    <div>
    <b-container class="bv-example-row">
        <b-row>
            <b-col sm="10" offset="1">
                <Query></Query>
            </b-col>
        </b-row>
    </b-container>
    </div>
</template>


<script lang="ts">

    import Vue  from 'vue';
    import Query from '@/components/Query.vue';

    export default Vue.extend({
        components: {
            Query,
        }
    })

</script>

<style scoped>

</style>
