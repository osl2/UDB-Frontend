<template>
    <div>
        <h3>{{$t('taskComp.instruction')}}</h3>
        <div class="taskContainer">
            <p>{{this.currentSubtask.instruction}}</p>
        </div>

    <div>
        <b-form-textarea
                id="textarea"
                v-model="studentSolution"
                placeholder="Antwort eingeben">
        </b-form-textarea>

        <b-button id="saveText"
                  @click="$emit('save', subtaskSolution)">{{$t('taskComp.save')}}</b-button>
        <b-popover target="saveText"
                   triggers="hover focus"
                   :content="$t('hoverText.saveMessageStudentWorksheet')">
        </b-popover>
        <b-button id="compareSolutionButtonText"
                  v-if="currentSubtask.isSolutionVisible"
                  @click="$emit('compare', subtaskSolution)">
            {{$t('taskComp.compare')}}
        </b-button>
        <b-popover target="compareSolutionButtonText"
                   triggers="hover focus"
                   :content="$t('hoverText.compareSolutionMessage')">
        </b-popover>

    </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PlainTextSolution from "@/dataModel/PlainTextSolution";


export default Vue.extend({
    props: ['currentSubtask', 'solutions'],
  data() {
      return {
        studentSolution: '' as string,
      };
  },

  // if there is a saved solution in the solutions map it gets displayed by setting the attribute studentSolution
  created() {
    if (this.solutions.has(this.currentSubtask.id)) {
      this.studentSolution = this.solutions.get(this.currentSubtask.id).text;
    }
  },

  computed: {
    subtaskSolution: {
      get(): PlainTextSolution {
        return new PlainTextSolution(this.studentSolution);
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
