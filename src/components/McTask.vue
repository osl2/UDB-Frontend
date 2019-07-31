<template>
    <div>
        <b-form-group label="checkbox-group">
            <b-form-checkbox-group
                    v-for=" option in currentSubtask._answerOptions"
                    v-model="selected"
                    :options="options"
                    name="flavour-2a"
                    stacked
            ></b-form-checkbox-group>
        </b-form-group>
    
</template>

<script lang ="ts">
    import MultipleChoiceTask from '@/datamodel/MultipleChoiceTask.ts'
    import {Component, Prop, Vue} from 'vue-property-decorator';

    export default {
        name: "McTask"
        @Prop private currentSubtask: MultipleChoiceTask;
        options: currentTask._answerOptions;
    }
</script>

<style scoped>

</style>
