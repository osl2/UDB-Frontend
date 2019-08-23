<template>
    <div>
        <h3>{{ $t('taskComp.instruction') }}</h3>
        <div class="taskContainer">
            {{ currentSubtask.instruction }}
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Subtask from '@/dataModel/Subtask';

@Component
export default class InstructionTaskComp extends Vue {
    @Prop() private currentSubtask!: Subtask;
}
</script>

<style scoped>
.taskContainer {
    border: 1px lightgray solid;
    margin: 10px 0px 20px 0px;
    padding: 5px 0px 5px 10px;
}
</style>
