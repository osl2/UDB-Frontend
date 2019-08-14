<template>
    <div>
        <h3>{{$t('taskComp.instruction')}}</h3>
        <div class="taskContainer">
            {{this.currentSubtask.instruction}}
        </div>
        <h3>{{$t('mcTask.answerOptions')}}</h3>
        <div class="taskContainer">

            <b-form-group>
                <b-form-checkbox-group
                        v-model="selected"
                        :options="options"
                        stacked
                ></b-form-checkbox-group>
            </b-form-group>

            <b-button @click="$emit('save', subtaskSolution)">{{$t('taskComp.save')}}</b-button>
            <b-button v-show="currentSubtask.isSolutionVisible"
                      @click="$emit('compare', subtaskSolution)">
                {{$t('taskComp.compare')}}
            </b-button>
        </div>

    </div>
</template>

<script lang ="ts">
import Vue from 'vue';
import MultipleChoiceSolution from "@/dataModel/MultipleChoiceSolution";

export default Vue.extend({
        props: ['currentSubtask', 'solutions'],
        data() {
            return {
                selected: [],
                options: [] as object[], // am anfang leeres object drinnen? an index 0
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
                this.selected = this.solutions.get(this.currentSubtask.id).choices;
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
    .taskContainer {
        border: 1px lightgray solid;
        margin: 10px 0px 20px 0px;
        padding: 5px 0px 5px 10px;
    }
</style>
