import UserGroup from "../dataModel/UserGroup";
<template>
    <div>
        help
        <div class="head">
            <h1>{{course.name}}</h1>
            <h2>{{course.description}}</h2>
        </div>
        <!-- TODO ButtonTexte Englisch und ButtonTexte wechseln lassen"-->
        <div>
            <b-button v-b-popover.hover="$t('hoverText.switchToStudentsView')"
                      @click="toggleView"
                      class="studentViewButton"
                      v-if="checkUserState()"
                      >
                {{$t('buttonText.changeView')}}
            </b-button>
        </div>
        <div class="clear"></div>
        <div class="container">
            <h2 class="headings">Aufgabenblätter</h2>
            <b-button v-if="checkUserState()"
                      @click="createNewWorksheet">
                Aufgabenblatt erstellen
            </b-button>
            <WorksheetList
                    :worksheets="worksheets"
                    :isStudentsViewActive="isStudentsViewActive"
                    @loadWorksheet="loadWorksheet"
                    @deleteWorksheet="deleteWorksheet"
                    @updateWorksheet="updateWorksheet"
            ></WorksheetList>
        </div>
        <div class="container">
            <h2 class="headings">Lösungsblätter</h2>
            <SolutionsheetList
                    :worksheets="worksheets"
                    :isStudentsViewActive="isStudentsViewActive"
                    @generateSolutionsheet="generateSolutionsheet"
            ></SolutionsheetList>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import WorksheetList from "@/components/WorksheetList.vue";
import SolutionsheetList from "@/components/SolutionsheetList.vue";
import Course from "@/dataModel/Course.ts";
import Worksheet from "@/dataModel/Worksheet.ts";
import WorksheetController from "@/controller/WorksheetController";
import CourseController from "@/controller/CourseController";
import {userState} from "@/globalData/UserState";
import UserGroup from "@/dataModel/UserGroup";
import router from "@/router";
import UserController from "@/controller/UserController";


@Component({
  components: {
    WorksheetList,
    SolutionsheetList,
  },
})


export default class CourseView extends Vue {

  // Data
  private courseController: CourseController = this.$store.getters.courseController;
  private worksheetController: WorksheetController = this.$store.getters.worksheetController;
  private userController: UserController = this.$store.getters.userController;
  private isStudentsViewActive: boolean = false;
  private courseId!: string;

  // Functions

  public loadWorksheet(worksheet: Worksheet) {
      if (this.userController.userState!.userGroup === UserGroup.Student) {
          router.push('/studentCourseView/' + this.courseId + '/' + worksheet.id);
      } else {
          router.push('/courseView/' + this.courseId + '/' + worksheet.id);
      }
  }

  public generateSolutionsheet(worksheet: Worksheet) {
    alert('TODO: PDF anzeigen zu: ' + worksheet.name);
    this.worksheetController.getSolution(worksheet);
  }


    public created() {
      if (this.userController.userState!.userGroup === UserGroup.Unauthenticated) {
        alert('Kein Zugriff auf diese Seite. Bitte Anmelden.');
        router.push('/');
      }
      this.setIsStudentsViewActive();
      this.courseController.load(this.$route.params.courseId);
      this.courseId = this.$route.params.courseId;
    }

    private toggleView() {
    this.isStudentsViewActive = !this.isStudentsViewActive;
  }

  private  createNewWorksheet() {
    router.push('/courseView/' + this.courseId + '/' + '');
  }

  private deleteWorksheet(worksheet: Worksheet) {
    try {
      this.worksheetController.remove(worksheet);
    } catch (e) {
      alert(e.message);
    }
  }

  private updateWorksheet(worksheet: Worksheet) {
    try {
      this.worksheetController.save(worksheet);
    } catch (e) {
      alert(e.message);
    }
  }

  private checkUserState(): boolean {
    if (this.userController.userState!.userGroup === UserGroup.Teacher) {
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

  get course() {
      let course;
      try {
          course = this.courseController.get(this.courseId);
      } catch (e) {
          return new Course("", "", "", "", []);
      }
      return course;
  }

  get worksheets() {
      return this.worksheetController.all;
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

    .headings {
        color: #333;
    }
</style>
