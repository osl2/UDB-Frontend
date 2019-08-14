<template>
    <div>
        <b-list-group>
            <h3>{{task.name}}</h3>
            <b-button @click="$emit('openTask', task, subtasks)">{{$t('workSheetInstruction.edit')}}</b-button>

            <b-list-group-item v-for="subtask in subtasks"
                               :key="subtask.id"
            >
            {{subtask.instruction}}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Subtask from "@/dataModel/Subtask";
import Task from "@/dataModel/Task";
import SubtaskController from "@/controller/SubtaskController";
@Component({})

export default class WorksheetInstructions extends Vue {
  @Prop() private task!: Task;

  private subtaskController: SubtaskController = this.$store.getters.subtaskController;

  created() {
    this.subtaskController = this.$store.getters.subtaskController;
    this.subtaskController.loadChildren(this.task);
  }

  get subtasks(): Subtask[] {
    return this.subtaskController.getAllWithoutSolution();

  }

};
</script>

<style scoped>

</style>
