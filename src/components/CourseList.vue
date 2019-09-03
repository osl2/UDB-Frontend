<template>
    <div class="container-fluid bg-secondary mb-5 pt-3 pb-3 pl-0">
        <div class="d-flex flex-row flex-nowrap">
            <b-card v-for="course in courses" :key="course.id" bg-variant="light" class="card ml-3 col col-2 p-0">
                <b-card-title>
                    {{ course.name }}
                    <b-btn
                        v-b-modal.changeCourse
                        class="float-right mr-2"
                        variant="secondary"
                        @click="selectCourse(course)"
                    >
                        <font-awesome-icon icon="cog" />
                    </b-btn>
                </b-card-title>
                <b-card-text>
                    {{ course.description }}
                </b-card-text>
                <b-card-text>
                    {{ $t('courseList.id') }}
                    <br />
                    {{ course.alias }}
                </b-card-text>
                <div slot="footer" class="btn-toolbar justify-content-center">
                    <b-button class="bg-danger mr-3" @click="$emit('removeCourse', course)">
                        {{ $t('courseList.delete') }}
                    </b-button>
                    <b-button class="bg-info" @click="$emit('loadCourse', course)">
                        {{ $t('courseList.open') }}
                    </b-button>
                </div>
            </b-card>
            <b-card class="card ml-3 col col-2 p-0">
                <b-card-title>
                    {{ $t('courseList.new') }}
                </b-card-title>
                <b-card-body>
                    <b-form-input v-model="name" :placeholder="$t('courseList.name')"></b-form-input>
                    <b-form-input v-model="description" :placeholder="$t('courseList.description')"></b-form-input>
                </b-card-body>
                <b-button slot="footer" class="bg-info" @click="$emit('addCourse', name, description)">
                    {{ $t('courseList.add') }}
                </b-button>
            </b-card>
            <!--Empty Div is needed to fix slider behaviour!-->
            <div class="ml-3"></div>
        </div>
        <b-modal
            id="changeCourse"
            :ok-title="$t('courseList.change')"
            :cancel-title="$t('courseList.cancel')"
            @ok="updateCourse(selectedCourse)"
        >
            <label>{{ $t('courseList.name') }}:</label>
            <b-form-input
                v-model="selectedCourseName"
                class="inputfield mb-1"
                @keydown.enter.native="updateCourse(selectedCourse)"
            ></b-form-input>
            <label>{{ $t('courseList.description') }}:</label>
            <b-form-input
                v-model="selectedCourseDescription"
                class="inputfield"
                @keydown.enter.native="updateCourse(selectedCourse)"
            ></b-form-input>
        </b-modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Course from '@/dataModel/Course';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import CourseController from '@/controller/CourseController';
library.add(faCog);

@Component({})
export default class CourseList extends Vue {
    @Prop() private courses!: Course[];

    private courseController: CourseController = this.$store.getters.courseController;

    private name: string = '';
    private description: string = '';
    private selected: Course = new Course('', '', '', '', []);
    private selectedCourseName: string = '';
    private selectedCourseDescription: string = '';

    get selectedCourse() {
        return this.selected;
    }

    private selectCourse(course: Course) {
        this.selected = course;
        this.selectedCourseName = course.name;
        this.selectedCourseDescription = course.description;
    }

    private updateCourse(course: Course) {
        course.name = this.selectedCourseName;
        course.description = this.selectedCourseDescription;
        this.courseController.save(course).then();
    }
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
    height: 100%;
}

/deep/.card-footer {
    text-align: center;
}

/deep/.card-title {
    overflow-y: fragments;
}
</style>
