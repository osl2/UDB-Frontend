<template>
    <div>
        <h3>{{ $t('taskComp.instruction') }}</h3>
        <div class="taskContainer">
            {{ currentSubtask.instruction }}
        </div>
        <h3>{{ $t('mcTask.answerOptions') }}</h3>
        <div class="taskContainer">
            <b-form-group>
                <b-form-checkbox-group v-model="selected" :options="options" stacked></b-form-checkbox-group>
            </b-form-group>

            <b-button id="saveMC" @click="$emit('save', subtaskSolution)">{{ $t('taskComp.save') }}</b-button>
            <b-popover
                target="saveMC"
                triggers="hover focus"
                :content="$t('hoverText.saveMessageStudentWorksheet')"
            ></b-popover>
            <b-button
                v-show="currentSubtask.isSolutionVisible"
                id="compareSolutionButtonMC"
                @click="$emit('compare', subtaskSolution)"
            >
                {{ $t('taskComp.compare') }}
            </b-button>
            <b-popover
                target="compareSolutionButtonMC"
                triggers="hover focus"
                :content="$t('hoverText.compareSolutionMessage')"
            ></b-popover>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';
import MultipleChoiceTask from '@/dataModel/MultipleChoiceTask';
import Solution from '@/dataModel/Solution';

@Component({})
export default class McTask extends Vue {
    @Prop() private currentSubtask!: MultipleChoiceTask;
    @Prop() private solutions!: Map<string, Solution>;

    private selected: number[] = [];
    private options: object[] = []; // am anfang leeres object drinnen? an index 0

    public setOptions() {
        for (let index = 0; index < this.currentSubtask.answerOptions.length; index++) {
            this.options.push({ text: this.currentSubtask.answerOptions[index], value: index });
        }
    }

    public created(): void {
        this.setOptions();
        if (this.solutions.has(this.currentSubtask.id)) {
            const solution = this.solutions.get(this.currentSubtask.id)! as MultipleChoiceSolution;
            this.selected = solution.choices;
        }
    }
    get subtaskSolution(): MultipleChoiceSolution {
        return new MultipleChoiceSolution(this.selected);
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
