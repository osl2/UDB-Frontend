<template>
    <div>
        <h3>{{ $t('taskComp.instruction') }}</h3>
        <div class="taskContainer">
            <p>{{ currentSubtask.instruction }}</p>
        </div>

        <div>
            <b-form-textarea
                id="textarea"
                v-model="studentSolution"
                :placeholder="$t('taskComp.enterSolution')"
            ></b-form-textarea>

            <b-button id="saveText" class="mt-2" @click="$emit('save', subtaskSolution)">
                {{ $t('taskComp.save') }}
            </b-button>
            <b-popover
                target="saveText"
                triggers="hover focus"
                :content="$t('hoverText.saveMessageStudentWorksheet')"
            ></b-popover>
            <b-button
                v-if="currentSubtask.isSolutionVeryfiable"
                id="compareSolutionButtonText"
                class="mt-2 ml-2"
                @click="$emit('compare', subtaskSolution)"
            >
                {{ $t('taskComp.compare') }}
            </b-button>
            <b-popover
                target="compareSolutionButtonText"
                triggers="hover focus"
                :content="$t('hoverText.compareSolutionMessage')"
            ></b-popover>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PlainTextSolution from '@/dataModel/PlainTextSolution';
import Subtask from '@/dataModel/Subtask';
import Solution from '@/dataModel/Solution';

@Component
export default class TextTask extends Vue {
    @Prop() private currentSubtask!: Subtask;
    @Prop() private solutions!: Map<string, Solution>;
    private studentSolution: string = '';

    get subtaskSolution(): PlainTextSolution {
        return new PlainTextSolution(this.studentSolution);
    }

    // if there is a saved solution in the solutions map it gets displayed by setting the attribute studentSolution
    created() {
        if (this.solutions.has(this.currentSubtask.id)) {
            const solution = this.solutions.get(this.currentSubtask.id) as PlainTextSolution;
            this.studentSolution = solution.text;
        }
    }
}
</script>

<style scoped>
.taskContainer {
    border: 1px lightgray solid;
    margin: 10px 0px 20px 0px;
    padding: 5px 0px 5px 10px;
}
</style>
