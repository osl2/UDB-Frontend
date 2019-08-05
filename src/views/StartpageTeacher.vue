<template>
    <div>
        <div class="head">
            <Navbar :courses="courses"
                    :databases="databases"
                    @loadCourse="loadCourse"
                    @showDatabase="showDatabase"
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
            <DatabaseList class="d-flex flex-column"
                          :databases="databases"
                          @showDatabase="showDatabase"
            ></DatabaseList>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import Navbar from '@/components/Navbar.vue';
import CourseList from "@/components/CourseList.vue";
import DatabaseList from "@/components/DatabaseList.vue";
import Course from "@/dataModel/Course.ts";
import Database from "@/dataModel/Database.ts";
import Worksheet from "@/dataModel/Worksheet";
import DataManagementService from '@/services/DataManagementService';
import ParentService from '@/services/ParentService';
import DatabaseController from '@/controller/DatabaseController';
import CourseController from '@/controller/CourseController';
import router from '@/router';
import UserService from "@/services/UserService";
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
  public messages: string[] = [];
  private courseController: DataManagementService<Course> = new CourseController(this.$store.getters.api);
  private databaseController: DataManagementService<Database> = new DatabaseController(this.$store.getters.api);
  private userController: UserService = new UserController(this.$store.getters.api);

  /*
  * This method sets the route to the requested course.
   */
  public loadCourse(course: Course) {
    router.push('/courseView/' + course.id);
  }

  /*
  * This method should display a requested database.
   */
  public showDatabase(database: Database) {
    alert("TODO: Zeige die Datenbank mit folgendem Namen an: " + database.name);
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
      this.courseController.create(new Course("", name, description, []));
  }

  /*
  * Method to permanently remove a course.
   */
  public removeCourse(course: Course) {
    alert('TODO: Warnmeldung, die bestätigt werden muss.')
      this.courseController.remove(course);
  }


  public created() {
      this.courseController.loadAll();
      this.databaseController.loadAll();
  }

  // Computed methods

  get courses() {
      return this.courseController.all;
  }

  get databases() {
      return this.databaseController.all;
  }

}
</script>

<style scoped>
    .headings{
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
