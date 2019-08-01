<template>
        <div>
            {{this.currentSubtask.instruction}}
        </div>

</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
    props: ['currentSubtask'],
});
</script>

<style scoped>

</style>
