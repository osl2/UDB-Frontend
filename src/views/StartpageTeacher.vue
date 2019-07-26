<template>
    <div>
        <div class="head">
            <Navbar :courses="courses"
                    :databases="databases"
                    @loadCourse="loadCourse"
                    @showDatabase="showDatabase"
            ></Navbar>
        </div>
        <div>
            <CourseList class="container"
                        :courses="courses"
                        @loadCourse="loadCourse"
            ></CourseList>
        </div>
        <div>
            <DatabaseList class="container"
                          :databases="databases"
                          @showDatabase="showDatabase"
            ></DatabaseList>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '@/components/Navbar.vue';
import CourseList from "@/components/CourseList.vue";
import DatabaseList from "@/components/DatabaseList.vue";
import Course from "@/dataModel/Course.ts";
import Database from "@/dataModel/Database.ts";

// TODO Diese Kurse sind als Beispiel hard gecodet
const course1 = new Course("1234", "Klasse 7a", "SJ 18/19", []);
const course2 = new Course("345", "Klasse 8a", "SJ 18/19", []);
const course3 = new Course("rte", "Klasse 9b", "SJ 18/19", []);
const database1 = new Database("nuief", "Schule", null);
const database2 = new Database("gdghrt", "Mitarbeiter", null);
const database3 = new Database("fhkrwe", "Musik", null);

export default Vue.extend({
  components: {
    Navbar,
    CourseList,
    DatabaseList,
  },
  data() {
    return {
      databases: [database1, database2, database3], // TODO in mounted initialisieren
      courses: [course1, course2, course3],
    };
  },
  methods: {
    loadCourse(course: Course) {
      alert("TODO: Lade den Kurs mit Namen: " + course.name);
    },
    showDatabase(database: Database) {
      alert("TODO: Zeige die Datenbanke mit folgendem Namen an: " + database.name);
    },
  },
});
</script>

<style scoped>
    .container {
        width: 80%;
        margin: auto;
    }

    .head {
        margin-bottom: 40px;
    }

</style>