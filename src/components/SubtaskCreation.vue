<template>
    <div class="create-subtasks">
        <b-button variant="info" @click="createSubtask(0)">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            {{ $t('taskCreation.newSql') }}
        </b-button>
        <b-button variant="info" @click="createSubtask(1)">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            {{ $t('taskCreation.newMc') }}
        </b-button>
        <b-button variant="info" @click="createSubtask(2)">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            {{ $t('taskCreation.newText') }}
        </b-button>
        <b-button variant="info" @click="createSubtask(3)">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            {{ $t('taskCreation.newInstruction') }}
        </b-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SubtaskTypes from '@/dataModel/SubtaskTypes';
import InstructionTask from '@/dataModel/InstructionTask';
import PlainTextTask from '@/dataModel/PlainTextTask';
import PlainTextSolution from '@/dataModel/PlainTextSolution';
import MultipleChoiceTask from '@/dataModel/MultipleChoiceTask';
import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';
import SqlTask from '@/dataModel/SqlTask';
import SqlSolution from '@/dataModel/SqlSolution';
import AllowedSqlStatements from '@/dataModel/AllowedSqlStatements';

library.add(faPlus);

@Component({})
export default class SubtaskCreation extends Vue {
    public createSubtask(type: SubtaskTypes) {
        switch (type) {
            case SubtaskTypes.Instruction:
                this.$emit('createSubtask', new InstructionTask('', ''));
                break;
            case SubtaskTypes.PlainText:
                this.$emit('createSubtask', new PlainTextTask('', new PlainTextSolution(''), '', false, false));
                break;
            case SubtaskTypes.MultipleChoice:
                this.$emit(
                    'createSubtask',
                    new MultipleChoiceTask('', new MultipleChoiceSolution([]), '', false, false, [])
                );
                break;
            case SubtaskTypes.Sql:
                this.$emit(
                    'createSubtask',
                    new SqlTask(
                        '',
                        new SqlSolution('', [], [[]]),
                        '',
                        false,
                        true,
                        false,
                        false,
                        AllowedSqlStatements.NoRestriction
                    )
                );
                break;
            default:
                alert('ERROR: Subtask type does not exist');
        }
    }
}
</script>

<style scoped>
.create-subtasks {
    display: flex;
    justify-content: flex-end;
}
</style>
