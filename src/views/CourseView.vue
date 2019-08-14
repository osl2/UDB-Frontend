<template>
    <div>
        <div class="head">
            <h1>{{course.name}}</h1>
            <h2>{{course.description}}</h2>
        </div>
        <!-- TODO ButtonTexte Englisch und ButtonTexte wechseln lassen"-->
        <div>
            <b-button v-b-popover.hover="$t('hoverText.switchToStudentsView')"
                      @click="toggleView"
                      class="studentViewButton"
                      v-if="hasUserWritePermission"
            >
                {{$t('buttonText.changeView')}}
            </b-button>
        </div>
        <div class="clear"></div>
        <div class="container">
            <h2 class="headings">{{$t('course.worksheets')}}</h2>
            <WorksheetList
                    :worksheets="worksheets"
                    :isStudentsViewActive="isStudentsViewActive"
                    :hasUserWritePermission="hasUserWritePermission"
                    @openWorksheet="openWorksheet"
                    @loadWorksheets="loadWorksheets"
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
        private courseController: CourseController = this.$store.getters.courseController;
        private worksheetController: WorksheetController = this.$store.getters.worksheetController;
        private userController: UserController = this.$store.getters.userController;
        private _isStudentsViewActive: boolean = false;
        private worksheetsChanged: boolean = false;

        // Functions
        public openWorksheet(worksheet: Worksheet) {
            if (this.isStudentsViewActive) {
                router.push('/studentCourseView/' + this.courseAlias + '/' + worksheet.id);
            } else {
                router.push('/courseView/' + this.courseAlias + '/' + worksheet.id);
            }
        }

        public generateSolutionsheet(worksheet: Worksheet) {
            alert('TODO: PDF anzeigen zu: ' + worksheet.name);
            this.worksheetController.getSolution(worksheet);
        }

        public created() {
            this.userController = this.$store.getters.userController;
            this.courseController = this.$store.getters.courseController;
            this.worksheetController = this.$store.getters.worksheetController;

            if (this.userController.userState === undefined) {
                this.userController.userState = new User('', '', '', '', UserGroup.Unauthenticated);
            }

            if (this.userController.userState!.userGroup === UserGroup.Unauthenticated) {
                this.userController.switchUserGroup(UserGroup.Student);
            }

            this.setIsStudentsViewActive();
            try {
                this.courseController.loadWithAlias(this.$route.params.courseId);
            } catch (e) {
                alert(e.message);
            }
        }

        public toggleView() {
            this._isStudentsViewActive = !this._isStudentsViewActive;
        }

        public createWorksheet(name: string) {
            if (confirm(this.$t('course.alertEditWorksheet') as string)) {
                this.worksheetController.create(new Worksheet('', name, [], false, false)).then((worksheetId) => {
                    this.course.worksheetIds.push(worksheetId);
                    this.courseController.save(this.course);
                    this.worksheetsChanged = true;
                }).catch((e) => {
                    alert(e.message);
                });
            }
        }

        public deleteWorksheet(worksheet: Worksheet) {
            if (confirm(this.$t('course.alertDelete') as string)) {
                try {
                    this.worksheetController.remove(worksheet);
                } catch (e) {
                    alert(e.message);
                }
            }
        }

        public updateWorksheet(worksheet: Worksheet) {
            try {
                this.worksheetController.save(worksheet);
            } catch (e) {
                alert(e.message);
            }
        }

        public loadWorksheets() {
            const course = this.courseController.courses.get(this.courseId);
            if (course !== undefined) {
                try {
                    this.worksheetController.loadChildren(course);
                } catch (e) {
                    alert(e.message);
                }
            }
        }

        get isStudentsViewActive() {
            this.setIsStudentsViewActive();
            return this._isStudentsViewActive;
        }

        private setIsStudentsViewActive() {
            if (this.userController.userState !== undefined) {
                if (this.userController.userState.userGroup === UserGroup.Student ||
                    this.userController.userState.userGroup === UserGroup.Unauthenticated) {
                    this._isStudentsViewActive = true;
                }
            }
        }

        get hasUserWritePermission() {
            return (this.userController.userState!.userGroup === UserGroup.Teacher);
        }

        get courseAlias() {
            return this.$route.params.courseId;
        }

        get courseId() {
            return this.courseController.aliases.get(this.courseAlias) || '';
        }

        get course() {
            return this.courseController.courses.get(this.courseId) || new Course('', '', '', '', []);
        }

        @Watch('course')
        private onCourseChanged(value: Course, oldValue: Course) {
            if (value === undefined || value.id === '') {
                // course not yet loaded
                return;
            } else if (oldValue === undefined || oldValue.id === '' || value.id !== oldValue.id) {
                // course loaded or changed, load worksheets of this course
                this.loadWorksheets();
            }
        }

        get worksheets() {
            return this.worksheetController.all && this.worksheetController.getChildren(this.course);
        }

        @Watch('worksheets')
        private onWorksheetsChanged(value: Worksheet[], oldValue: Worksheet[]) {
            if (this.userController.userState!.userGroup === UserGroup.Teacher) {
                if (!value.every((worksheet: Worksheet) => oldValue.includes(worksheet))) {
                    // if value and oldValue are different
                    try {
                        this.courseController.save(new Course(
                            this.course.id,
                            this.course.name,
                            this.course.description,
                            this.course.alias,
                            value.map((worksheet: Worksheet) => worksheet.id),
                        ));
                    } catch (e) {
                        alert(e.message);
                    }
                }
            }
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
