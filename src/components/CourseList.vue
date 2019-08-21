<template>
  <div class="container-fluid bg-secondary mb-5 pt-3 pb-3 pl-0">
    <div class="d-flex flex-row flex-nowrap">
      <b-card
          v-for="course in courses"
          :key="course.id"
          bg-variant="light"
          class="card ml-3 col col-2 p-0"
      >
        <b-card-title>
          {{course.name}}
        </b-card-title>
        <b-card-text>
          {{course.description}}
        </b-card-text>
        <b-card-text>
          {{$t('courseList.name')}} <br />{{course.alias}}
        </b-card-text>
        <div class="btn-toolbar justify-content-center" slot="footer">
          <b-button
                  class="bg-danger mr-3"
                  @click="$emit('removeCourse', course)"
          >{{$t('courseList.delete')}}
          </b-button>
          <b-button
                  class="bg-info"
                  @click="$emit('loadCourse', course)"
          >{{$t('courseList.open')}}
          </b-button>
        </div>
      </b-card>
      <b-card
              class="card ml-3 col col-2 p-0"
      >
        <b-card-title>
          {{$t('courseList.new')}}
        </b-card-title>
        <b-card-body>
          <b-form-input v-model="name" :placeholder="$t('courseList.name')"></b-form-input>
          <b-form-input v-model="description" :placeholder="$t('courseList.description')"></b-form-input>
        </b-card-body>
        <b-button
            class="bg-info"
            slot="footer"
            @click="$emit('addCourse', name, description)"
        >{{$t('courseList.add')}}
        </b-button>
      </b-card>
      <!--Empty Div is needed to fix slider behaviour!-->
      <div class="ml-3"></div>
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
  }

  /deep/.card {
    text-align: left;
    min-width: 18rem;
  }

  /deep/.card-footer {
    text-align: center;
  }

  /deep/.card-title {
    overflow-y: fragments;
  }
</style>
