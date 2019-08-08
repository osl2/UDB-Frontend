<template>
    <div>
        <div> Aufgabe
           <!-- <b-form-select v-model="selected" :options="dboptions"></b-form-select> -->
        </div>

        <SubtaskCreation> </SubtaskCreation>
        <b-button @click="addSubtask">Teilaufgabe hinzufügen</b-button>
    </div>
</template>


<script lang="ts">
    import Task from "@/dataModel/Task";
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import SubtaskCreation from "@/components/SubtaskCreation.vue";

    @Component({
        components: {
            SubtaskCreation
        },
    })
    export default class TeacherWorksheet extends Vue{
        data() {
            return {

            };
        }

        addSubtask(){
        }

    }
</script>

<style scoped>

</style>
