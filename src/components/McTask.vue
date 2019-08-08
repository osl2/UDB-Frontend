<template>
    <div>
    <div>
        {{this.currentSubtask.instruction}}
    </div>

    <div>

        <b-form-group label="Form-checkbox-group stacked checkboxes">
            <b-form-checkbox-group
                    v-model="selected"
                    :options="options"
                    stacked
            ></b-form-checkbox-group>
        </b-form-group>

        <b-button @click="$emit('save', currentSubtask.id, subtaskSolution)">Speichern</b-button>
        <b-button v-show="currentSubtask.isSolutionVisible"
                  @click="$emit('compare', subtaskSolution)">
            Vergleich mit Musterlösung
        </b-button>
    </div>

    </div>
</template>

<script lang ="ts">
import MultipleChoiceTask from '@/datamodel/MultipleChoiceTask.ts';
import Vue from 'vue';
import MultipleChoiceSolution from "@/dataModel/MultipleChoiceSolution";

export default Vue.extend({
        props: ['currentSubtask', 'solutions'],
        data() {
            return {
                selected: [],
                options: [{}], // am anfang leeres object drinnen? an index 0
            };
        },
        methods: {
            setOptions() {
                for (let index = 0; index < this.currentSubtask.answerOptions.length; index++) {

                    this.options.push({text: this.currentSubtask.answerOptions[index], value: index});

                }
            },
        },
        created(): void {
            this.setOptions();

            if (this.solutions.has(this.currentSubtask.id)) {
                this.selected = this.solutions.get(this.currentSubtask.id).text;
            }
        },

    computed: {
        subtaskSolution: {
            get(): MultipleChoiceSolution {
                return new MultipleChoiceSolution(this.selected);
            },
        },
    },

    });
</script>

<style scoped>

</style>
