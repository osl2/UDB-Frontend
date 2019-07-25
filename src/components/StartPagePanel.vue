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
                    <b-button class="btn btn-lg" v-b-modal.modal-1> Anmelden </b-button>
                    <b-modal id="modal-1" >
                        <div>
                            <b-form-input class="inputfield" v-model="text" placeholder="Nutzername"></b-form-input>
                        </div>
                        <div>
                            <b-form-input class="inputfield" v-model="loginPassword" type="password" placeholder="Passwort"></b-form-input>
                        </div>
                    </b-modal>
                    <b-button class="btn btn-lg" v-b-modal.modal-2>Registrieren</b-button>
                    <b-modal id="modal-2" ok-title="Registrieren" cancel-title="Abbrechen" >
                        <div>
                            <b-form-input class="inputfield" v-model="text" placeholder="Nutzername"></b-form-input>
                        </div>
                        <div>
                            <b-form-input class="inputfield" v-model="text" type="password" placeholder="Passwort"></b-form-input>
                        </div>
                        <div>
                            <b-form-input class="inputfield" v-model="text" type="password" placeholder="Passwort wiederholen"></b-form-input>
                        </div>
                    </b-modal>
                </template>

                <template v-else-if="type === 'student'">
                    <b-button class="btn btn-lg btn-block" v-b-modal.modal-3>{{buttonName}}</b-button>
                    <b-modal id="modal-3" ok-title="Beitreten" cancel-title="Abbrechen">
                        <div>
                            <b-form-input class="inputfield" v-model="courseId" placeholder="Kurs-ID"></b-form-input>
                        </div>
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

  @Component
  export default class StartPagePanel extends Vue {
    @Prop() private title!: string;
    @Prop() private description!: string;
    @Prop() private buttonName!: string;
    @Prop() private path!: string;
    @Prop() private type!: string;


  }
</script>

<style scoped lang="scss">
    .bottom-btn {
        position: absolute;
        alignment: center;
        bottom: 17px;
    }
    .btn{
        margin-right: 10px;
    }
    .inputfield{
        margin-bottom: 5px;
    }

</style>
