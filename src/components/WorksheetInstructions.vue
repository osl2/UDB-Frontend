<template>
    <div>
        <b-list-group>
            <h3>{{task.name}}</h3>
            <b-button @click="$emit('openTask', task, subtasks)">Bearbeiten</b-button>

            <b-list-group-item v-for="subtask in subtasks">
            {{subtask.instruction}}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SubtaskController from "@/controller/SubtaskController";
import SubtaskService from "@/services/SubtaskService";
import Subtask from "@/dataModel/Subtask";


export default  Vue.extend({
  props: ['task'],
  data() {
    return {
      subtaskController: new SubtaskController(this.$store.getters.api) as SubtaskService,
    };
  },
  created: function() {
    this.subtaskController.loadChildren(this.task);
  },
  computed: {
    subtasks: {
      get: function(): Subtask[] {
        return this.subtaskController.getAllWithoutSolution();
      },
    }
  }
});
</script>

<style scoped>

</style>
