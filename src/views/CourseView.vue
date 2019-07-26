
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
import {Vue, Component, Prop} from 'vue-property-decorator';
import WorksheetList from '@/components/WorksheetList.vue';
import SolutionsheetList from '@/components/SolutionsheetList.vue';
import Course from '@/dataModel/Course.ts';
import Worksheet from '@/dataModel/Worksheet.ts';



@Component({
  components: {
    WorksheetList,
    SolutionsheetList,
  },
})


export default class CourseViewStudent extends Vue {

  // Data
  public courseId: any = this.$route.params.courseId;
  public course!: Course;

  // Functions

  public loadWorksheet(worksheet: Worksheet) {
    alert('TODO: route zu WorksheetView mit übergebenem Worksheet' + worksheet.name);
    /* TODO: Sobald die WorksheetViewStudent steht, wird von hier aus der Router aufgerufen
    */
  }

  public generateSolutionsheet(worksheet: Worksheet) {
    alert('TODO: generateSolutionsheet als PDF + anzeigen' + worksheet.name);
  }


  public created() {
    /* TODO rufe hier getCourse() by ID auf mit übergebener courseID (s. Data - Abschnitt).
        Der Rückgabetyp MUSS ein Course-Object sein. Die Methode soll also das Attribut
        course initialisieren.
    */
  }
}
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
