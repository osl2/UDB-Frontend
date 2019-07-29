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
                    <b-button class="btn btn-lg" v-b-modal.modal-login> Anmelden </b-button>
                    <b-modal id="modal-login" >
                        <p class = error>
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
                            <b-form-input class="inputfield" v-model="repeatedpw" type="password" placeholder="Passwort wiederholen"></b-form-input>
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
                    <b-button tag="button" class="btn btn-lg btn-block btn-secondary"  >{{buttonName}}</b-button>
                </router-link>
            </div>
        </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import router from '@/router';

@Component
export default class StartPagePanel extends Vue {
  // set default to false
  private sucessfull: boolean = true;
  private errormsg: string = '';
  @Prop() private title!: string;
  @Prop() private description!: string;
  @Prop() private buttonName!: string;
  @Prop() private path!: string;
  @Prop() private type!: string;


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
      // login methode einfügen

      if (this.sucessfull) {
          this.$router.push(this.path);
      } else {
          this.errormsg = "something went wrong"; // error vom server
      }

      }
  private registration(username: string, password: string, repeatedpw: string): void {
      /*if (username.length === null){
          this.errormsg = "Gib einen Nutzernamen ein";
          return;
      }
      if (password.length === null|| repeatedpw.length === null) {
          this.errormsg = "Gib ein passwort ein";
          return
      }
      if (password !== repeatedpw) {
          this.errormsg = "Die Passwörter stimmen nicht überein";
          return
      }
      // registrerung methode hier einfügen
      */
      if (this.sucessfull) {
          this.$router.push(this.path);
      } else {
          this.errormsg = "something went wrong"; // nur in genauer - hängt von serverantwort ab
      }


  }
  private enterCourse(courseId: string): void {
      /*if(courseId === null){
          this.errormsg = "gib eine KursId ein";
      }
      //hier kursbeitritt methode einfügen
       */
      if (this.sucessfull) {
          this.$router.push(this.path + courseId);
      } else {
          this.errormsg = "something went wrong"; // wieder serverabhängig
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
    .inputfield{
        margin-bottom: 5px;
    }

    .error {
        color: darkred;
    }

</style>
