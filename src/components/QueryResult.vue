<template>
    <div>
        <b-table striped hover :items="queryResult"></b-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: ['queryResult'],
});
</script>

<style scoped>

.table {
    border: 1px lightgray solid;
    border-radius: 3px;
}

</style>