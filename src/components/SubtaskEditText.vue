<template>
    <div>
        <b-form-textarea
            v-model="subtask.instruction"
            :placeholder="$t('subtaskCreation.instruction')"
            @change="change()"
        ></b-form-textarea>

        <b-form-group :label="$t('subtaskCreation.verifiable')">
            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="true" @change="change()">
                {{ $t('subtaskCreation.yes') }}
            </b-form-radio>
            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="false">
                {{ $t('subtaskCreation.no') }}
            </b-form-radio>
        </b-form-group>

        <div v-if="subtask.isSolutionVeryfiable">
            <b-form-textarea
                v-model="subtask.solution.text"
                :placeholder="$t('subtaskCreation.solution')"
                @change="change()"
            ></b-form-textarea>

            <b-form-group :label="$t('subtaskCreation.visible')">
                <b-form-radio v-model="subtask.isSolutionVisible" :value="true" @change="change()">
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
import PlainTextTask from '../dataModel/PlainTextTask';

@Component({
    components: {},
})
export default class SubtaskEditText extends Vue {
    @Prop() private value!: PlainTextTask;

    private subtask!: PlainTextTask;

    public created() {
        this.subtask = this.value;
    }

    public change() {
        this.$emit('input', this.subtask);
    }
}
</script>

<style scoped></style>
