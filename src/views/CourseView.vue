<template>
    <div>
        <div class="head">
            <h1>{{course.name}}</h1>
            <h2>{{course.description}}</h2>
        </div>
        <!-- TODO ButtonTexte Englisch und ButtonTexte wechseln lassen"-->
        <div>
            <b-button v-b-popover.hover="$t('hoverText.switchToStudentsView')"
                      @click="toggleView"
                      class="studentViewButton"
                      v-show="checkUserState()"
                      >
                {{$t('buttonText.changeView')}}
            </b-button>
        </div>
        <div class="clear"></div>
        <div class="container">
            <WorksheetList
                    :worksheets="worksheets"
                    :isStudentsViewActive="isStudentsViewActive"
                    @loadWorksheet="loadWorksheet"
            ></WorksheetList>
        </div>
        <div class="container">
            <SolutionsheetList
                    :worksheets="worksheets"
                    :isStudentsViewActive="isStudentsViewActive"
                    @generateSolutionsheet="generateSolutionsheet"
            ></SolutionsheetList>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import WorksheetList from '@/components/WorksheetList.vue';
import SolutionsheetList from '@/components/SolutionsheetList.vue';
import Course from '@/dataModel/Course.ts';
import Worksheet from '@/dataModel/Worksheet.ts';
import ParentService from '@/services/ParentService';
import SolutionService from '@/services/SolutionService';
import WorksheetController from '@/controller/WorksheetController';
import CourseController from '@/controller/CourseController';
import {userState} from '@/globalData/UserState';
import UserGroup from "@/dataModel/UserGroup";
import router from '@/router';


@Component({
  components: {
    WorksheetList,
    SolutionsheetList,
  },
})


export default class CourseView extends Vue {

  // Data
  private course!: Course;
  private worksheets!: Worksheet[];
  private solutionsheet!: Uint8Array;
  private courseController: ParentService<Course, Worksheet> = new CourseController(this.$store.getters.api);
  private worksheetController: SolutionService = new WorksheetController();
  private isStudentsViewActive: boolean = false;

  // Functions

  public loadWorksheet(worksheet: Worksheet) {
      router.push('/studentWorksheet/' + worksheet.id);
  }

  public generateSolutionsheet(worksheet: Worksheet) {
    this.solutionsheet = this.worksheetController.getSolution(worksheet);
    alert('TODO: PDF anzeigen' + worksheet.name);
  }


    public created() {
      if (userState.user.userGroup === UserGroup.Unauthenticated) {
        alert('Kein Zugriff auf diese Seite. Bitte Anmelden.');
        router.push('/');
      }
      this.setIsStudentsViewActive();
      this.course = this.courseController.get(this.$route.params.courseId);
      this.worksheets = this.courseController.getChildren(this.course);
    }

    private toggleView() {
    this.isStudentsViewActive = !this.isStudentsViewActive;
  }

  private checkUserState(): boolean {
    if (userState.user.userGroup === UserGroup.Teacher) {
      return true;
    } else {
      return false;
    }
  }
  private setIsStudentsViewActive() {
    if (userState.user.userGroup === UserGroup.Teacher) {
      this.isStudentsViewActive = false;
    } else if (userState.user.userGroup === UserGroup.Student) {
      this.isStudentsViewActive = true;
    }
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
        background-color: #17a2b8;
        color: white;
    }
    .studentViewButton {
        margin-bottom: 15px;
        float: right;
    }
</style>
