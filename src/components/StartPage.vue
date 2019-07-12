<template>
    <div class="startpage">
        <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">u<sup>DB</sup></h1>
            <p class="lead">Lernplattform für Datenbanken </p>
        </div>

        <div class="container">
            <div class="card-deck mb-3 text-center">
                <div class="card mb-4 box-shadow">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-normal">{{ $t("standbox.titleStartpage") }}</h4>
                    </div>
                    <div class="card-body">

                        <ul class="list-unstyled mt-3 mb-4">
                            <li>Ein Datenbank hochladen</li>
                            <li>Queries ausführen</li>
                            <li>etc</li>
                            <li>etc</li>
                        </ul>
                        <button type="button" class="btn btn-lg btn-block btn-primary">Go</button>
                    </div>
                </div>
                <div class="card mb-4 box-shadow">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-normal">Lehrer Bereich</h4>
                    </div>
                    <div class="card-body">

                        <ul class="list-unstyled mt-3 mb-4">
                            <li>Ein Datenbank hochladen</li>
                            <li>Queries ausführen</li>
                            <li>etc</li>
                            <li>etc</li>
                        </ul>
                        <button type="button" class="btn btn-lg btn-block btn-primary">Einloggen</button>
                    </div>
                </div>
                <div class="card mb-4 box-shadow">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-normal">Kurs beitretten</h4>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>Ein Datenbank hochladen</li>
                            <li>Queries ausführen</li>
                            <li>etc</li>
                            <li>etc</li>
                        </ul>
                        <button type="button" class="btn btn-lg btn-block btn-primary">Go</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class StartPage extends Vue {
  }
</script>

<style scoped>

</style>
