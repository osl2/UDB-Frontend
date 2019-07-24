<template>
    <div>
        <div class="head">
            <h1>{{course.name}}</h1>
            <h2>{{course.description}}</h2>
        </div>
        <div class="container">
            <WorksheetList
                    :course="course"
                    @loadWorksheet="loadWorksheet"
            ></WorksheetList>
        </div>
        <div class="container">
            <SolutionsheetList
                    :course="course"
                    @generateSolutionsheet="generateSolutionsheet"
            ></SolutionsheetList>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import WorksheetList from '@/components/WorksheetList.vue';
  import SolutionsheetList from '@/components/SolutionsheetList.vue';
  import Course from '@/dataModel/Course.ts';
  import Worksheet from '@/dataModel/Worksheet.ts';

  // TODO entferne hardgecodete Worksheet Daten:
  const worksheet1 = new Worksheet('123', 'Blatt 01', [], true, true);
  const worksheet2 = new Worksheet('456', 'Blatt 02', [], true, false);
  const worksheet3 = new Worksheet('456', 'Blatt 03', [], true, true);
  const worksheet4 = new Worksheet('456', 'Blatt 04', [], true, false);

  export default Vue.extend({
    components: {
      WorksheetList,
      SolutionsheetList,
    },
    data() {
      return {
        course: null ,
      };
    },
    methods: {
      loadWorksheet(worksheet: Worksheet) {
        // TODO: route zu WorksheetView mit übergebenem Worksheet
      },
      generateSolutionsheet(worksheet: Worksheet) {
        // TODO: generateSolutionsheet als PDF + anzeigen
      },
    },

    mounted() {
      //this.course = new Course('abc', 'Klasse 7a', 'Schuljahr 19/20', [worksheet1, worksheet2, worksheet3, worksheet4]);
    },
  });
</script>

<style scoped>
    .container {
        width: 80%;
        margin: auto;
    }

    .head {
        padding-top: 15px;
        padding-bottom: 15px;
        margin-bottom: 35px;
        text-align: center;
        background-color: darkcyan;
        color: white;
    }
</style>
