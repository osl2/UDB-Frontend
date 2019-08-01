<template>
    <div>
        <b-list-group v-for="(task, index) in tasks">
            <h3>{{task.name}}</h3>
            <b-button @click="$emit('openTask',task, subtasks[index])">Bearbeiten</b-button>

            <b-list-group-item v-for="subtask in subtasks[index]">
            {{subtask.instruction}}
            </b-list-group-item>

        </b-list-group>
        <b-button @click="$emit('exportSheet')">Bearbeitungsstand exportieren</b-button>
        <b-button @click="$emit('importSheet')">Bearbeitungsstand importieren</b-button>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';


    export default  Vue.extend({
        props: ['tasks','subtasks'],

    })
</script>

<style scoped>

</style>
