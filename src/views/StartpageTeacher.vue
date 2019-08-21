<template>
    <div>
        <div class="head">
            <Navbar :courses="courses"
                    :databases="databases"
                    @loadCourse="loadCourse"
                    @logoutTeacher="logoutTeacher"
            ></Navbar>
        </div>
        <div>
            <ul>
                <li v-for="msg in messages">{{msg}}</li>
            </ul>
        </div>
        <div class="container">
            <h2 class="headings">{{$t('navbar.courseDropdown')}}:</h2>
            <CourseList :courses="courses"
                        @loadCourse="loadCourse"
                        @addCourse="addCourse"
                        @removeCourse="removeCourse"
            ></CourseList>
        </div>

        <div class="container">
            <h2 class="headings">{{$t('navbar.databaseDropdown')}}:</h2>

            <b-button @click="uploadTrigger" style="margin-bottom: 10px;">{{$t('teacher.uploadDb')}}</b-button>
            <b-alert v-model="dbErrorMsg" v-if="dbErrorMsg !== ''" variant="danger" dismissible>{{dbErrorMsg}}</b-alert>
            <input id="fileUpload" type="file" style="display:none;" multiple accept=".db"
                   @change="databaseUploadHandler">

            <DatabaseList class="d-flex flex-column"
                          :databases="databases"
                          @deleteDatabase="deleteDatabase"
            ></DatabaseList>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Navbar from '@/components/Navbar.vue';
    import CourseList from "@/components/CourseList.vue";
    import DatabaseList from "@/components/DatabaseList.vue";
    import Course from "@/dataModel/Course.ts";
    import Database from "@/dataModel/Database.ts";
    import DatabaseController from '@/controller/DatabaseController';
    import CourseController from '@/controller/CourseController';
    import router from '@/router';
    import UserController from "@/controller/UserController";


    @Component({
        components: {
            Navbar,
            CourseList,
            DatabaseList,
        },
    })
    export default class StartpageTeacher extends Vue {

        // Data
        private courses: Course[] = [];
        private databases: Database[] = [];
        private loading = true;
        public messages: string[] = [];
        private dbErrorMsg: string = '';
        private databaseController: DatabaseController = this.$store.getters.databaseController;
        private userController: UserController = this.$store.getters.userController;
        private courseController: CourseController = this.$store.getters.courseController;

        /*
        * This method sets the route to the requested course.
         */
        public loadCourse(course: Course) {
            router.push('/courseView/' + course.alias);
        }

        /*
        * This method is called if a teacher wants to logout. The route is set to the startpage.
         */
        public logoutTeacher() {
            this.userController.logout();
            this.$router.push("/");
        }

        /*
        * Method to create a new Course with a name and description given by the user.
         */
        public addCourse(name: string, description: string) {
            let newCourse = new Course("", name, description, "", []);
            this.courseController.create(newCourse)
              .then(() => {
                this.courses.push(newCourse)
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

        /*
        * Method to permanently remove a course.
         */
        public removeCourse(course: Course) {
            if (confirm(this.$t('teacher.alertCourse') as string + course.name
            + this.$t('teacher.alertDelete') as string)) {
                this.courseController.remove(course)
                  .then(() => {
                    this.courses = this.courses.filter((c: Course) => c.id !== course.id);
                  })
                  .catch((error) =>  {
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


        public created() {
            const loggedInUser = this.userController.userState;
            if (!loggedInUser || !loggedInUser.token) {
                alert(this.$t('teacher.notAuthorized'));
                this.$router.push('/');
                return;
            }
            this.courseController.getAll()
              .then((courses: Course[]) => {
                this.courses = courses;
                this.loading = false;
              })
              .catch((error) => {
                switch (error.status) {
                  case 404:
                    alert(this.$t('apiError.courses404') as string);
                    break;
                  case 500:
                    alert(this.$t('apiError.server500') as string);
                    break;
                  default:
                    alert(this.$t('apiError.defaultMsg') as string);
                    break;
                }
              });
            this.databaseController.getAll()
              .then((databases: Database[]) => {
                this.databases = databases;
              })
              .catch((error) => {
                switch (error.status) {
                  case 404:
                    alert(this.$t('apiError.databases404') as string);
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

        // Computed methods

        private uploadTrigger(event: Event) {
            document.getElementById('fileUpload')!.click();
        }

        private databaseUploadHandler(event: Event) {
            // we need to tell typescript and tslint checker that we are working with file input HTMLInputElement
            // for this there are no standards yet
            const target = event.target as (HTMLInputElement & Event);
            const files = target!.files!;
            for (let i = 0; i < files.length; i++) {
                const file = files.item(i)!;
                this.databaseController.importObject(file).then((database) => {
                    this.databaseController.create(database).then(() => {
                      this.databases.push(database);
                    }).catch((error) => {
                          this.dbErrorMsg = "Error";
                          switch (error.status) {
                            case 500:
                              this.dbErrorMsg = this.$t('apiError.server500') as string;
                              break;
                            default:
                              this.dbErrorMsg = this.$t('apiError.databaseCreate') as string;
                              break;
                          }
                    });
                });
            }
            target.value = '';
        }

        private deleteDatabase(database: Database) {
            if (confirm(this.$t('teacher.alertDatabase') as string + database.name
            + this.$t('teacher.alertDelete') as string)) {
                this.databaseController.remove(database).then(() => {
                  this.databases = this.databases.filter((db) => db.id !== database.id);
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
        }

    }
</script>

<style scoped>
    .headings {
        color: #333;
    }

    .container {
        width: 80%;
        margin: auto;
    }

    .head {
        margin-bottom: 40px;
    }
</style>
