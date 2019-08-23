<template>
    <div>
        <h3>
            HALLO DAS SWITCHEN FUNKTIONIERT
        </h3>
        <div>
            {{ apitest }}
            {{ errmsg }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GetDatabaseRequest } from '@/api/DefaultApi';
import Database from '@/dataModel/Database';

export default Vue.extend({
    data() {
        return {
            apitest: {},
            request: { databaseId: '14352392' } as GetDatabaseRequest,
            test2: {},
            errmsg: '',
        };
    },

    mounted() {
        this.$store.getters.api.getDatabases().then((response: Database[]) => (this.apitest = response));
        this.$store.getters.api
            .getDatabase(this.request)
            .then((response: {}) => (this.test2 = response))
            .catch((error: any) => (this.errmsg = error.message));
    },
});
</script>

<style scoped></style>
