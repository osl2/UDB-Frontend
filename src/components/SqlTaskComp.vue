<template>
    <Query></Query>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import Query from '@/components/Query.vue';
    import QueryResult from '@/components/QueryResult.vue';
    import SqlTask from '@/dataModel/SqlTask.ts'
    export default {
        name: "SqlTask"
    }
</script >

<style scoped>
    import {Component, Prop, Vue} from 'vue-property-decorator';

</style>
