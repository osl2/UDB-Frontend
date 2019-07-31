<template>
    <div>
        <b-form-group label="checkbox-group">
            <b-form-checkbox-group
                    v-for=" (option,index) in options"
                    v-model="selected"
                    value ="index"
                    :options="options"
                    name="checkbox"
                    stacked
            ></b-form-checkbox-group>
        </b-form-group>
        <v-button @click="save">Speichern</v-button>
        <v-button v-if=" currentSubtask._isSolutionVeryfiable" @click="compare"></v-button>
    
</template>

<script lang ="ts">
    import MultipleChoiceTask from '@/datamodel/MultipleChoiceTask.ts'
    import {Component, Prop, Vue} from 'vue-property-decorator';

    export default {
        name: "McTask";
        @Prop private currentSubtask: MultipleChoiceTask ;
        private options: string[] = currentSubtask._answerOptions;

        //methods
        public save(){
            currentSubtask.solution.setchoices(selected);
        }

        public compare(){
            //toDo
    }
    }
</script>

<style scoped>

</style>
