<template>
    <div>
        <div class="head">
            <Navbar :courses="courses"
                    :databases="databases"
                    @loadCourse="loadCourse"
                    @showDatabase="showDatabase"
            ></Navbar>
        </div>
        <div class="container">
            <h2 class="headings">{{$t('navbar.courseDropdown')}}:</h2>
            <CourseList :courses="courses"
                        @loadCourse="loadCourse"
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
import router from '@/router';

@Component({
  components: {
    Navbar,
    CourseList,
    DatabaseList,
  },
})

export default class StartpageTeacher extends Vue {

  // Data
  public databases!: Database[];
  public courses!: Course[];


  public loadCourse(course: Course) {
    router.push('/courseView/' + course.id);
    alert("TODO: Lade den Kurs mit Namen: " + course.name);
  }
  public showDatabase(database: Database) {
    alert("TODO: Zeige die Datenbank mit folgendem Namen an: " + database.name);
  }

  public created() {
    /* TODO: getAll- Methoden der Services für den angemeldeten Lehrer aufrufen: Rückgabewerte müssen
        ein Database-Array und ein Course-Array sein, um die Attribute zu initialisieren.
     */
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
