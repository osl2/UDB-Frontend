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
      <b-button @click="uploadTrigger">Datenbanken hochladen</b-button>
      <input id="fileUpload" type="file" style="display:none;" multiple accept=".db" @change="databaseUploadHandler">

      <DatabaseList class="d-flex flex-column"
                    :databases="databases"
                    @showDatabase="showDatabase" @deleteDatabase="deleteDatabase"
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
  import DataManagementService from '@/services/DataManagementService';
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
    private databaseController: DatabaseController = this.$store.getters.databaseController;
    private userController: UserService = this.$store.getters.userController;
    private courseController: CourseController = this.$store.getters.courseController;

    /*
    * This method sets the route to the requested course.
     */
    public loadCourse(course: Course) {
      router.push('/courseView/' + course.alias);
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
      try {
        this.courseController.create(new Course("", name, description, "", []));
      } catch (e) {
        alert(e.message);
      }
    }

    /*
    * Method to permanently remove a course.
     */
    public removeCourse(course: Course) {
      if (confirm('Kurs ' + course.name + ' wirklich löschen? Dies kann nicht mehr rückgängig gemacht werden.')) {
        this.courseController.remove(course);
      }
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
          this.databaseController.create(database);
        });
      }
      target.value = '';
    }

    private deleteDatabase(database: Database) {
      if (confirm('Datenbank wirklich löschen? Dies kann nicht mehr rückgängig gemacht werden.')) {
        this.databaseController.remove(database);
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
