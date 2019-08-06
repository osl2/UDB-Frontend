<template>
    <div>
    <div>
        {{this.currentSubtask.instruction}}
    </div>

    <div>
        <b-form-textarea
                id="textarea"
                v-model="studentSolution"
                placeholder="Antwort eingeben">
        </b-form-textarea>

        <b-button @click="$emit('save', currentSubtask.id, subtaskSolution)">Speichern</b-button>
        <b-button v-show="currentSubtask.isSolutionVisible"
                  @click="$emit('compare', subtaskSolution)">
            Vergleich mit Musterlösung
        </b-button>

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

</style>
