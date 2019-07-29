
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
import ParentService from '@/services/ParentService';
import SolutionService from '@/services/SolutionService';
import WorksheetController from '@/controller/WorksheetController';
import CourseController from '@/controller/CourseController';


@Component({
  components: {
    WorksheetList,
    SolutionsheetList,
  },
})


export default class CourseView extends Vue {

  // Data
  private course!: Course;
  private solutionsheet!: Uint8Array;
  private courseController: ParentService<Course, Worksheet> = new CourseController();
  private worksheetController: SolutionService = new WorksheetController();

  // Functions

  public loadWorksheet(worksheet: Worksheet) {
    alert('TODO: route zu WorksheetView mit übergebenem Worksheet' + worksheet.name);
    /* TODO: Sobald die WorksheetViewStudent steht, wird von hier aus der Router aufgerufen
    */
  }

  public generateSolutionsheet(worksheet: Worksheet) {
    this.solutionsheet = this.worksheetController.getSolution(worksheet);
    alert('TODO: PDF anzeigen' + worksheet.name);
  }


  public created() {
    this.course = this.courseController.get(this.$route.params.courseId);
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
