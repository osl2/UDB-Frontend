import UserGroup from "@/dataModel/UserGroup";
<template>
  <div class="card mb-4 box-shadow">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <ul class="list-unstyled mt-3 mb-4">
        {{ description }}
      </ul>
      <!--This section determines the content of the bottom of the panel
              teacher: two modal buttons, one for login with two input fields and one for registration with 3input fields
              student: A modal button to enter a course-id-->
      <template v-if="type === 'teacher'">
        <b-button class="btn btn-lg" v-b-modal.modal-login> Anmelden</b-button>
        <b-modal id="modal-login">
          <p class=error>
            {{errormsg}}
          </p>
          <div>
            <b-form-input class="inputfield" v-model="username" placeholder="Nutzername"></b-form-input>
          </div>
          <div>
            <b-form-input class="inputfield" v-model="password" type="password" placeholder="Passwort"></b-form-input>
          </div>

          <template slot="modal-footer">
            <b-button size="sm" @click="loginteacher(username, password)">
              Anmelden
            </b-button>
          </template>
        </b-modal>

        <b-button class="btn btn-lg" v-b-modal.modal-registration>Registrieren</b-button>
        <b-modal id="modal-registration">
          <div>
            <b-form-input class="inputfield" v-model="username" placeholder="Nutzername"></b-form-input>
          </div>
          <div>
            <b-form-input class="inputfield" v-model="password" type="password" placeholder="Passwort"></b-form-input>
          </div>
          <div>
            <b-form-input class="inputfield" v-model="repeatedpw" type="password"
                          placeholder="Passwort wiederholen"></b-form-input>
          </div>
          <template slot="modal-footer">
            <b-button size="sm" @click="registration(username, password, repeatedpw)">
              Registrieren
            </b-button>
          </template>
        </b-modal>
      </template>

      <template v-else-if="type === 'student'">
        <b-button class="btn btn-lg btn-block" v-b-modal.modal-joinCourse>{{buttonName}}</b-button>
        <b-modal id="modal-joinCourse" ok-title="Beitreten" cancel-title="Abbrechen">
          <div>
            <b-form-input class="inputfield" v-model="courseId" placeholder="Kurs-ID"></b-form-input>
          </div>
          <template slot="modal-footer">
            <b-button size="sm" @click="enterCourse(courseId)">
              Beitreten
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
  import {userState} from "@/globalData/UserState";

  @Component
  export default class StartPagePanel extends Vue {

    private errormsg: string = '';
    @Prop() private title!: string;
    @Prop() private description!: string;
    @Prop() private buttonName!: string;
    @Prop() private path!: string;
    @Prop() private type!: string;
    private username: string = '';
    private password: string = '';
    private repeatedpw: string = '';
    private courseId: string = '';
    private courseController: CourseController = new CourseController(this.$store.getters.api);
    private userController: UserController = new UserController(this.$store.getters.api);


    // methods
    private loginteacher(username: string, password: string, mmsg: string): void {
      /* if(username == null){
          this.errormsg = 'Gib einen Nutzernamen ein';
          return;
      }
      if(password == null){
          this.errormsg = "Gib ein Passwort ein";
          return;
      }
        */

      this.userController.login(username, password).then((success) => {
        if (success) {
          this.$router.push(this.path);
        } else {
          this.errormsg = "Anmeldung fehlgeschlagen";
          return;
        }
      });
      //
    }

    private registration(username: string, password: string, repeatedpw: string): void {
      /*
      if (username.length === null) {
          this.errormsg = "Gib einen Nutzernamen ein";
          return;
      }
      if (password.length === null || repeatedpw.length === null) {
          this.errormsg = "Gib ein passwort ein";
          return;
      }
      if (password !== repeatedpw) {
          this.errormsg = "Die Passwörter stimmen nicht überein";
          return;
      }
      */

      this.userController.register(username, password);
      this.$router.push(this.path);
    }

    private enterCourse(courseId: string): void {
      /*if(courseId === null){
          this.errormsg = "gib eine KursId ein";
      }

       */
      userState.user.userGroup = UserGroup.Student;
      this.$router.push(this.path + courseId);
    }

    private checkCourseEntry(courseId: string): boolean {
      if (this.courseController.one === undefined) {
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
