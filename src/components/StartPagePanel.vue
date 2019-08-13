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
            <b-form-input class="inputfield" v-model="username" :placeholder= "$t('home.name')"></b-form-input>
          </div>
          <div>
            <b-form-input class="inputfield" v-model="password" type="password" :placeholder="$t('home.pw')"></b-form-input>
          </div>

          <template slot="modal-footer">
            <b-button size="sm" @click="loginTeacher(username, password)">
              $t('home.login')}}
            </b-button>
          </template>
        </b-modal>

        <b-button v-if='!loggedIn' class="btn btn-lg" v-b-modal.modal-registration>{{ $t('home.register') }}</b-button>
        <b-modal id="modal-registration">
          <p class=error>
            {{errorMsg}}
          </p>
          <div>
            <b-form-input class="inputfield" v-model="username" :placeholder=" $t('home.name')"></b-form-input>
          </div>
          <div>
            <b-form-input class="inputfield" v-model="password" type="password" :placeholder= "$t('home.pw')"></b-form-input>
          </div>
          <div>
            <b-form-input class="inputfield" v-model="repeatedpw" type="password"
                          :placeholder= "$t('home.repeatedpw')"></b-form-input>
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
            <b-form-input class="inputfield" v-model="courseId" :placeholder="$t('home.courseId')"></b-form-input>
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
        this.errorMsg = 'Gib einen Nutzernamen ein';
        return;
      }
      if (!password) {
        this.errorMsg = "Gib ein Passwort ein";
        return;
      }
      this.path = "/startPageTeacher";

      this.userController.login(username, password).then((success) => {
        if (success) {
          this.$router.push(this.path);
        } else {
          this.errorMsg = "Anmeldung fehlgeschlagen";
          return;
        }
      });
    }

    private registration(username: string, password: string, repeatedpw: string): void {

      if (!username) {
        this.errorMsg = "Gib einen Nutzernamen ein";
        return;
      }
      if (!password || !repeatedpw) {
        this.errorMsg = "Gib beide Passwörter ein";
        return;
      }
      if (password !== repeatedpw) {
        this.errorMsg = "Die Passwörter stimmen nicht überein";
        return;
      }


      this.userController.register(username, password);
      this.$router.push(this.path);
    }

    private enterCourse(courseId: string): void {
      if (!courseId) {
        this.errorMsg = "gib eine KursId ein";
      }
      this.userController.userState!.userGroup = UserGroup.Student;
      this.$router.push(this.path + courseId);
    }

    private checkCourseEntry(courseId: string): boolean {
      if (this.courseController.get(courseId) === undefined) {
        alert('Laden des Kurses ist fehlgeschlagen: Es wurde kein Kurs mit der eingegebenen ID gefunden. ' +
          'Bitte versuche es erneut.');
        return false;
      }
      // if a logged in teacher uses the course entry point the current user should not get set to UserGroup.Student
      if (this.userController.getCurrentUserGroup() === UserGroup.Teacher) {
        return true;
      }
      this.userController.switchUserGroup(UserGroup.Student);
      return true;
    }

    private checkRegistration(username: string, password: string): boolean {
      alert('TODO: serverseitige Registrierungsmethode aufrufen.');
      this.userController.switchUserGroup(UserGroup.Teacher);
      return true;
    }

    private created() {
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
