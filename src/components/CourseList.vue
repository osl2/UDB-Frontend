<template>
  <div class="container-fluid mb-2">
    <div class="d-flex flex-row flex-nowrap">
      <b-card
          v-for="course in courses"
          :key="course.id"
          bg-variant="light"
          class="card"
      >
        <b-card-title>
          {{course.name}}
        </b-card-title>
        <b-card-text>
          {{course.description}}
        </b-card-text>
        <b-card-text>
          Kurs-ID:<br />{{course.alias}}
        </b-card-text>
        <b-button
            class="bg-danger"
            slot="footer"
            @click="$emit('removeCourse', course)"
        >Löschen
        </b-button>
        <b-button
            class="bg-info"
            slot="footer"
            @click="$emit('loadCourse', course)"
        >Kurs öffnen
        </b-button>
      </b-card>
      <b-card>
        <b-card-title>
          Neuer Kurs
        </b-card-title>
        <b-card-body>
          <b-form-input v-model="name" placeholder="Name"></b-form-input>
          <b-form-input v-model="description" placeholder="Beschreibung"></b-form-input>
        </b-card-body>
        <b-button
            class="bg-info"
            slot="footer"
            @click="$emit('addCourse', name, description)"
        >Hinzufügen
        </b-button>
      </b-card>
    </div>
  </div>

</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Course from "@/dataModel/Course";

  @Component({})
  export default class CourseList extends Vue {
    @Prop() private courses!: Course[];

    private name: string = '';
    private description: string = '';

  }

</script>

<style scoped>
  .container-fluid {
    overflow-x: auto;
    display: flex;
    background-color: lightgray;
  }

  .card {
    text-align: center;
    min-width: 12rem;
    min-height: 10rem;
    max-width: 12rem;
    max-height: 10rem;
    margin: 10px 20px 10px 10px;
  }

</style>
