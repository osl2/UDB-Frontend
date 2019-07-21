<template>
    <div>
        <h3>
            HALLO DAS SWITCHEN FUNKTIONIERT
        </h3>
    </div>
    <div>
        {{apitest}}
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                apitest: {},
            };
        },
        mounted() {
            this.$store.getters.api.getDatabases()
                .then((response: {}) => (this.apitest = response));
        },
    })

</script>



<style scoped>

</style>