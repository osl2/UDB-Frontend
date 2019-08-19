<template>
    <div class="card mb-4 box-shadow">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">
                {{ description }}
            </p>
            <!--This section determines the content of the bottom of the panel
                    teacher: two modal buttons, one for login with two input fields and one for registration with 3input fields
                    student: A modal button to enter a course-id-->
            <template v-if="type === 'teacher'">
                <b-button v-if='!loggedIn' class="btn btn-lg" v-b-modal.modal-login style="margin-left: 10px;">
                    {{$t('home.login')}}
                </b-button>
                <b-modal id="modal-login">
                    <p class=error>
                        {{errorMsg}}
                    </p>
                    <div>
                        <b-form-input class="inputfield" v-model="username"
                                      :placeholder="$t('home.name')"></b-form-input>
                    </div>
                    <div>
                        <b-form-input class="inputfield" v-model="password" type="password"
                                      :placeholder="$t('home.pw')"></b-form-input>
                    </div>

                    <template slot="modal-footer">
                        <b-button size="sm" @click="loginTeacher(username, password)">
                            {{$t('home.login')}}
                        </b-button>
                    </template>
                </b-modal>

                <b-button v-if='!loggedIn' class="btn btn-lg" v-b-modal.modal-registration>{{ $t('home.register') }}
                </b-button>
                <b-modal id="modal-registration">
                    <p class=error>
                        {{errorMsg}}
                    </p>
                    <div>
                        <b-form-input class="inputfield" v-model="username"
                                      :placeholder="$t('home.name')"></b-form-input>
                    </div>
                    <div>
                        <b-form-input class="inputfield" v-model="password" type="password"
                                      :placeholder="$t('home.pw')"></b-form-input>
                    </div>
                    <div>
                        <b-form-input class="inputfield" v-model="repeatedpw" type="password"
                                      :placeholder="$t('home.repeatedpw')"></b-form-input>
                    </div>
                    <template slot="modal-footer">
                        <b-button size="sm" @click="registration(username, password, repeatedpw)">
                            {{$t('home.register')}}
                        </b-button>
                    </template>
                </b-modal>
                <router-link :to="path">
                    <b-button v-if='loggedIn' tag="button" class="btn btn-lg btn-block btn-secondary">
                        <span v-html="$t('home.alreadyLoggedIn',{ userName: this.userController.userState.name})"></span>
                    </b-button>
                </router-link>
            </template>

            <template v-else-if="type === 'student'">
                <b-button class="btn btn-lg btn-block" v-b-modal.modal-joinCourse>{{buttonName}}</b-button>
                <b-modal id="modal-joinCourse" :ok-title="$t('home.join')" :cancel-title="$t('home.cancel')">
                    <div>
                        <b-form-input class="inputfield" v-model="courseId"
                                      :placeholder="$t('home.courseId')"></b-form-input>
                    </div>
                    <template slot="modal-footer">
                        <b-button size="sm" @click="enterCourse(courseId)">
                            {{$t('home.join')}}
                        </b-button>
                    </template>
                </b-modal>
            </template>

            <router-link v-else :to="path">
                <b-button tag="button" class="btn btn-lg btn-block btn-secondary">{{buttonName}}</b-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import CourseController from "@/controller/CourseController";
    import UserGroup from "@/dataModel/UserGroup";
    import UserController from "@/controller/UserController";
    import User from '@/dataModel/User';
    import Course from "@/dataModel/Course";

    @Component
    export default class StartPagePanel extends Vue {

        private errorMsg: string = '';
        @Prop() private title!: string;
        @Prop() private description!: string;
        @Prop() private buttonName!: string;
        @Prop() private path!: string;
        @Prop() private type!: string;
        private loggedIn: boolean = false;
        private username: string = '';
        private password: string = '';
        private repeatedpw: string = '';
        private courseId: string = '';
        private courseController: CourseController = this.$store.getters.courseController;
        private userController: UserController = this.$store.getters.userController;


        // methods
        private loginTeacher(username: string, password: string, mmsg: string): void {
            if (!username) {
                this.errorMsg = this.$t('home.errorUser') as string;
                return;
            }
            if (!password) {
                this.errorMsg = this.$t('home.errorPw') as string;
                return;
            }
            this.path = "/startPageTeacher";

            this.userController.login(username, password).then((success) => {
                if (success) {
                    this.$router.push(this.path);
                } else {
                    this.errorMsg = this.$t('home.errorLogin') as string;
                    return;
                }
            });
        }

        private registration(username: string, password: string, repeatedpw: string): void {

            if (!username) {
                this.errorMsg = this.$t('home.errorUser') as string;
                return;
            }
            if (!password || !repeatedpw) {
                this.errorMsg = this.$t('home.error2Pw') as string;
                return;
            }
            if (password !== repeatedpw) {
                this.errorMsg = this.$t('home.errorPwEqual') as string;
                return;
            }


            this.userController.register(username, password).then((_) => {
                this.$router.push(this.path);
            }).catch((e) => {
                this.errorMsg = this.$t('home.errorRegistration') as string;
            });

        }

        private enterCourse(courseId: string): void {
            if (!courseId) {
                this.errorMsg = this.$t('home.errorCourseId') as string;
            }
            this.courseController.getWithAlias(courseId)
              .then((course: Course) => {
                if (this.userController.getCurrentUserGroup() !== UserGroup.Teacher) {
                  this.userController.switchUserGroup(UserGroup.Student);
                }
                this.$router.push(this.path + courseId);
              })
              .catch((error) => {
                switch (error.status) {
                  case 404:
                    alert("ERROR: Dieser Kurs existiert nicht!");
                    break;
                  case 500:
                    alert("ERROR: Der Server ist abgekackt!");
                    break;
                  default:
                    alert("ERROR: Etwas ist schiefgelaufen");
                    break;
                }
              })
        }

        private created() {
            if (this.userController.userState === undefined) {
                this.userController.userState = new User('', '', '', '', UserGroup.Unauthenticated);
            }
            const user = this.userController.userState!;
            if (user && user.name && user.token && user.userGroup === UserGroup.Teacher) {
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
        }


    }
</script>

<style scoped lang="scss">
    .bottom-btn {
        position: absolute;
        alignment: center;
        bottom: 17px;
    }

    .inputfield {
        margin-bottom: 5px;
    }

    .error {
        color: darkred;
    }

</style>
