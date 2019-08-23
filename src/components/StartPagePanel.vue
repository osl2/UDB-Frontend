<template>
    <div class="card mb-4 box-shadow">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">
                {{ description }}
            </p>
        </div>
        <div class="card-footer">
            <!--This section determines the content of the bottom of the panel
        teacher: two modal buttons, one for login with two input fields and one for registration with 3input fields
        student: A modal button to enter a course-id-->
            <template v-if="type === 'teacher'">
                <div class="btn-toolbar justify-content-center">
                    <b-button
                        v-if="!loggedIn"
                        v-b-modal.modal-login
                        class="btn btn-lg mr-1 mr-sm-0 mr-xl-3 mb-0 mb-sm-1 mb-xl-0"
                    >
                        {{ $t('home.login') }}
                    </b-button>
                    <b-button v-if="!loggedIn" v-b-modal.modal-registration class="btn btn-lg">
                        {{ $t('home.register') }}
                    </b-button>
                </div>

                <router-link :to="path">
                    <b-button v-if="loggedIn" tag="button" class="btn btn-lg btn-block btn-secondary">
                        <span
                            v-html="$t('home.alreadyLoggedIn', { userName: this.userController.userState.name })"
                        ></span>
                    </b-button>
                </router-link>

                <b-modal id="modal-login" @hidden="resetErrorMsgOnModalHide">
                    <p class="error">
                        {{ errorMsg }}
                    </p>

                    <div>
                        <b-form-input
                            v-model="username"
                            class="inputfield"
                            :placeholder="$t('home.name')"
                            @keydown.enter.native="loginTeacher(username, password)"
                        ></b-form-input>
                        <b-form-input
                            v-model="password"
                            class="inputfield"
                            type="password"
                            :placeholder="$t('home.pw')"
                            @keydown.enter.native="loginTeacher(username, password)"
                        ></b-form-input>
                    </div>

                    <template slot="modal-footer">
                        <b-button size="sm" @click="loginTeacher(username, password)">
                            {{ $t('home.login') }}
                        </b-button>
                    </template>
                </b-modal>
                <b-modal id="modal-registration" @hidden="resetErrorMsgOnModalHide">
                    <p class="error">
                        {{ errorMsg }}
                    </p>
                    <div>
                        <b-form-input
                            v-model="username"
                            class="inputfield"
                            :placeholder="$t('home.name')"
                            @keydown.enter.native="registration(username, password, repeatedpw)"
                        ></b-form-input>
                        <b-form-input
                            v-model="password"
                            class="inputfield"
                            type="password"
                            :placeholder="$t('home.pw')"
                            @keydown.enter.native="registration(username, password, repeatedpw)"
                        ></b-form-input>
                        <b-form-input
                            v-model="repeatedpw"
                            class="inputfield"
                            type="password"
                            :placeholder="$t('home.repeatedpw')"
                            @keydown.enter.native="registration(username, password, repeatedpw)"
                        ></b-form-input>
                    </div>
                    <template slot="modal-footer">
                        <b-button size="sm" @click="registration(username, password, repeatedpw)">
                            {{ $t('home.register') }}
                        </b-button>
                    </template>
                </b-modal>
            </template>

            <template v-else-if="type === 'student'">
                <b-button v-b-modal.modal-joinCourse class="btn btn-lg btn-block">{{ buttonName }}</b-button>
                <b-modal
                    id="modal-joinCourse"
                    :ok-title="$t('home.join')"
                    :cancel-title="$t('home.cancel')"
                    @hidden="resetErrorMsgOnModalHide"
                >
                    <p class="error">
                        {{ errorMsg }}
                    </p>
                    <div>
                        <b-form-input
                            v-model="courseId"
                            class="inputfield"
                            :placeholder="$t('home.courseId')"
                            @keydown.enter.native="enterCourse(courseId)"
                        ></b-form-input>
                    </div>
                    <template slot="modal-footer">
                        <b-button size="sm" @click="enterCourse(courseId)">
                            {{ $t('home.join') }}
                        </b-button>
                    </template>
                </b-modal>
            </template>

            <router-link v-else :to="path">
                <b-button tag="button" class="btn btn-lg btn-block btn-secondary">{{ buttonName }}</b-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CourseController from '@/controller/CourseController';
import UserGroup from '@/dataModel/UserGroup';
import UserController from '@/controller/UserController';
import User from '@/dataModel/User';
import Course from '@/dataModel/Course';

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
    private loginTeacher(username: string, password: string): void {
        if (!username) {
            this.errorMsg = this.$t('home.errorUser') as string;
            return;
        }
        if (!password) {
            this.errorMsg = this.$t('home.errorPw') as string;
            return;
        }
        this.path = '/startPageTeacher';

        this.userController.login(username, password).then(success => {
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

        this.userController
            .register(username, password)
            .then(_ => {
                alert(this.$t('home.successRegistration') as string);
                this.$router.push(this.path);
            })
            .catch(error => {
                switch (error.status) {
                    case 400:
                        this.errorMsg = this.$t('apiError.register400') as string;
                        break;
                    case 500:
                        this.errorMsg = this.$t('apiError.server500') as string;
                        break;
                    default:
                        this.errorMsg = this.$t('apiError.defaultMsg') as string;
                        break;
                }
            });
    }

    private enterCourse(courseId: string): void {
        if (!courseId) {
            this.errorMsg = this.$t('home.errorCourseId') as string;
            return;
        }
        this.courseController
            .getWithAlias(courseId)
            .then((course: Course) => {
                if (this.userController.getCurrentUserGroup() !== UserGroup.Teacher) {
                    this.userController.switchUserGroup(UserGroup.Student);
                }
                this.$router.push(this.path + courseId);
            })
            .catch(error => {
                switch (error.status) {
                    case 404:
                        alert(this.$t('apiError.course404') as string);
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

    private resetErrorMsgOnModalHide(): void {
        this.errorMsg = '';
    }
}
</script>

<style scoped lang="scss">
.inputfield {
    margin-bottom: 5px;
}

.error {
    color: darkred;
}
</style>
