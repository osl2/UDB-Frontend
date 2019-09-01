<template>
    <div>
        <b-form-textarea
            v-model="subtask.instruction"
            :placeholder="$t('subtaskCreation.instruction')"
        ></b-form-textarea>

        <StringListEdit
            v-model="subtask.answerOptions"
            :item-description="$t('subtaskCreation.answerOption')"
            @change="change"
        ></StringListEdit>

        <b-form-group :label="$t('subtaskCreation.verifiable')">
            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="true">
                {{ $t('subtaskCreation.yes') }}
            </b-form-radio>
            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="false">
                {{ $t('subtaskCreation.no') }}
            </b-form-radio>
        </b-form-group>

        <div v-if="subtask.isSolutionVeryfiable">
            {{ $t('subtaskCreation.rightAnswers') }}
            <b-form-group>
                <b-form-checkbox-group
                    v-model="choices"
                    :options="subtask.answerOptions"
                    stacked
                    @change="change"
                ></b-form-checkbox-group>
            </b-form-group>

            <b-form-group :label="$t('subtaskCreation.visible')">
                <b-form-radio v-model="subtask.isSolutionVisible" :value="true">
                    {{ $t('subtaskCreation.yes') }}
                </b-form-radio>
                <b-form-radio v-model="subtask.isSolutionVisible" :value="false">
                    {{ $t('subtaskCreation.no') }}
                </b-form-radio>
            </b-form-group>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MultipleChoiceTask from '../dataModel/MultipleChoiceTask';
import StringListEdit from '@/components/StringListEdit.vue';
import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';

@Component({
    components: {
        StringListEdit,
    },
})
export default class SubtaskEditMC extends Vue {
    @Prop() private value!: MultipleChoiceTask;

    private subtask!: MultipleChoiceTask;
    private _choices: string[] = [];

    public created() {
        this.subtask = this.value;
        if (this.subtask.solution === undefined || this.subtask.solution === null) {
            this.subtask.solution = new MultipleChoiceSolution([]);
        }
        this._choices = (this.subtask.solution as MultipleChoiceSolution).choices.map(
            (index: number) => this.subtask.answerOptions[index]
        );
    }

    public change() {
        this.$emit('input', this.subtask);
    }

    get choices(): string[] {
        return this._choices;
    }

    set choices(value: string[]) {
        this._choices = value;
        (this.subtask.solution as MultipleChoiceSolution).choices = value.map((choice: string) =>
            this.subtask.answerOptions.indexOf(choice)
        );
    }
}
</script>

<style scoped></style>
