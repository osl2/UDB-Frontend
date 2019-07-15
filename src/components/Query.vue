<template>
    <div>
        <b-form-textarea
                id="textarea"
                v-model="query"
                placeholder="SQL-Statement eingeben"
                rows="3"
                max-rows="6"
        ></b-form-textarea>
        <b-button @click="$emit('executeQuery', query)">
            Ausführen
        </b-button>
    </div>
</template>

<script lang="ts">
    import Vue  from 'vue';

    export default Vue.extend({
            data() {
                return {
                    query: '',
                }
            },
        }
    )
</script>

<style scoped>
</style>
