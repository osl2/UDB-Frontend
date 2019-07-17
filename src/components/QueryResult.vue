<template>
    <div class="table">
        Hier kommt ein Ergebnis hin.
        {{queryResultValues}}
        {{queryResultColumnNames}}
        <table class="table">
            <thead>
            <tr>
                <th v-for="columnName in queryResultColumnNames"
                    scope="col">{{columnName}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="column in queryResultValues">
                <td v-for="value in column">{{value}}</td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        props: ['queryResultColumnNames', 'queryResultValues'],
    })
</script>

<style scoped>

.table {
    border: 1px lightgray solid;
}

</style>