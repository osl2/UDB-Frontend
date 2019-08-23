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
  private subtasks: Subtask[] = [];

  private subtaskController: SubtaskController = this.$store.getters.subtaskController;

  public created() {
    this.subtaskController = this.$store.getters.subtaskController;
    this.subtaskController.getChildrenWithoutSolution(this.task).then((subtasks: Subtask[]) => {
      this.subtasks = subtasks;
    }).catch((error) => {
      switch (error.status) {
        case 404:
          alert(this.$t('apiError.tasks404') as string);
          break;
        case 500:
          alert(this.$t('apiError.server500') as string);
          break;
        default:
          alert(this.$t('apiError.defaultMsg') as string);
          break;
      }
    });
  }


}
</script>

<style scoped>

</style>
