<template>
    <div>
        <div class="head">
            <h1>{{course.name}}</h1>
            <h2>{{course.description}}</h2>
        </div>
        <div>
            <b-button id="changeViewButton"
                      @click="toggleView"
                      class="studentViewButton float-right"
                      v-if="hasUserWritePermission"
            >
                {{$t('buttonText.changeView')}}
            </b-button>
            <b-popover target="changeViewButton"
                       triggers="hover focus"
                       :content="changeMessage">
            </b-popover>
        </div>
        <div class="clear"></div>
        <div class="container">
            <h2 class="headings">{{$t('course.worksheets')}}</h2>
            <WorksheetList
                    :worksheets="worksheets"
                    :isStudentsViewActive="isStudentsViewActive"
                    :hasUserWritePermission="hasUserWritePermission"
                    @openWorksheet="openWorksheet"
                    @deleteWorksheet="deleteWorksheet"
                    @updateWorksheet="updateWorksheet"
                    @createWorksheet="createWorksheet"
            ></WorksheetList>
        </div>
        <div class="container" v-if="(worksheets.length !== 0)">
            <h2 class="headings">{{$t('course.solutionsheets')}}</h2>
            <SolutionsheetList
                    :worksheets="worksheets"
                    :isStudentsViewActive="isStudentsViewActive"
                    @generateSolutionsheet="generateSolutionsheet"
            ></SolutionsheetList>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import WorksheetList from '@/components/WorksheetList.vue';
import SolutionsheetList from '@/components/SolutionsheetList.vue';
import Course from '@/dataModel/Course.ts';
import Worksheet from '@/dataModel/Worksheet.ts';
import WorksheetController from '@/controller/WorksheetController';
import CourseController from '@/controller/CourseController';
import UserGroup from '@/dataModel/UserGroup';
import router from '@/router';
import UserController from '@/controller/UserController';
import User from '@/dataModel/User';

@Component({
    components: {
        WorksheetList,
        SolutionsheetList,
    },
})


export default class CourseView extends Vue {

    // Data
    private course: Course = new Course('', 'Loading', '', '', []);
    private worksheets: Worksheet[] = [];
    private courseController: CourseController = this.$store.getters.courseController;
    private worksheetController: WorksheetController = this.$store.getters.worksheetController;
    private userController: UserController = this.$store.getters.userController;
    private isInStudentView: boolean = false;
    private worksheetsChanged: boolean = false;
    private changeMessage: string = "";


    // Functions
    public openWorksheet(worksheet: Worksheet) {
            if (this.isStudentsViewActive) {
                router.push('/studentCourseView/' + this.course.alias + '/' + worksheet.id);
            } else {
                if (confirm(this.$t('course.alertEditWorksheet') as string)) {
                router.push('/courseView/' + this.course.alias + '/' + worksheet.id);
                }
            }
    }

    public generateSolutionsheet(worksheet: Worksheet) {
        this.worksheetController.getSolution(worksheet);
    }

    public created() {
        this.userController = this.$store.getters.userController;
        this.courseController = this.$store.getters.courseController;
        this.worksheetController = this.$store.getters.worksheetController;
        this.changeMessage = this.$t('hoverText.switchToStudentsView') as string;

        if (this.userController.userState === undefined) {
            this.userController.userState = new User('', '', '', '', UserGroup.Unauthenticated);
        }

        if (this.userController.userState!.userGroup === UserGroup.Unauthenticated) {
            this.userController.switchUserGroup(UserGroup.Student);
        }

        this.setIsStudentsViewActive();
        this.courseController.getWithAlias(this.$route.params.courseId)
              .then((course: Course) => {
                this.course = course;
                this.worksheetController.getChildren(course)
                  .then((worksheets: Worksheet[]) => {
                    this.worksheets = worksheets;
                  }).catch((error) => {
                  switch (error.status) {
                    case 404:
                      alert(this.$t('apiError.worksheets404') as string);
                      break;
                    case 500:
                      alert(this.$t('apiError.server500') as string);
                      break;
                    default:
                      alert(this.$t('apiError.defaultMsg') as string);
                      break;
                  }
                });
              })
              .catch((error) => {
                switch (error.status) {
                  case 404:
                    alert(this.$t('apiError.course404') as string);
                    break;
                  case 500:
                    alert(this.$t('apiError.server500') as string);
                    break;
                  default:
                    alert(this.$t('apiError.defaultMsg') as string);
                    break;
                }
              });
        }

    public toggleView() {
        this.isInStudentView = !this.isInStudentView;
    }

    public createWorksheet(name: string) {
        if (!name) {
            alert(this.$t('course.alertName') as string);
            return;
        }
        const newWorksheet = new Worksheet('', name, [], false, false);
        this.worksheetController.create(newWorksheet).then((worksheetId) => {
                this.worksheets.push(newWorksheet);
                this.course.worksheetIds.push(worksheetId);
                // TODO rausschmeißen, wenn das Backend bei create den Kurs aktualisiert
                this.courseController.save(this.course).then();
                this.worksheetsChanged = true;
            }).catch((error) => {
              switch (error.status) {
                case 500:
                  alert(this.$t('apiError.server500') as string);
                  break;
                default:
                  alert(this.$t('apiError.defaultMsg') as string);
                  break;
              }
            });
    }

        public deleteWorksheet(worksheet: Worksheet) {
            if (confirm(this.$t('course.alertDelete') as string)) {
                this.worksheetController.remove(worksheet)
                  .then(() => {
                    this.worksheets = this.worksheets.filter((ws: Worksheet) => ws.id !== worksheet.id);
                  })
                  .catch((error) => {
                    switch (error.status) {
                      case 500:
                        alert(this.$t('apiError.server500') as string);
                        break;
                      default:
                        alert(this.$t('apiError.defaultMsg') as string);
                        break;
                    }
                  });
            }
        }

        public updateWorksheet(worksheet: Worksheet) {
          this.worksheetController.save(worksheet)
            .catch((error) => {
              switch (error.status) {
                case 500:
                  alert(this.$t('apiError.server500') as string);
                  break;
                default:
                  alert(this.$t('apiError.defaultMsg') as string);
                  break;
              }
            });
        }

    get isStudentsViewActive() {
        this.setIsStudentsViewActive();
        return this.isInStudentView;
    }

    private setIsStudentsViewActive() {
        if (this.userController.userState !== undefined) {
            if (this.userController.userState.userGroup === UserGroup.Student ||
                this.userController.userState.userGroup === UserGroup.Unauthenticated) {
                this.isInStudentView = true;
            }
        }
    }

        get hasUserWritePermission() {
            return (this.userController.userState!.userGroup === UserGroup.Teacher);
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
    }

    .headings {
        color: #333;
    }
</style>
