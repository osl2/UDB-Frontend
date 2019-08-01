<template>
    <div>
    <div>
        {{this.currentSubtask.instruction}}
    </div>

    <div>
        <b-form-textarea
                id="textarea"
                v-model="studentSolution"
                placeholder="Antwort eingeben">
           </b-form-textarea>

    </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';


    export default Vue.extend({
        props: ['currentSubtask'],
    })

</script>

<style scoped>

</style>
