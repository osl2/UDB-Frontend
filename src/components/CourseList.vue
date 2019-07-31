<template>
    <div class="container-fluid mb-2">
        <div class="d-flex flex-row flex-nowrap">
            <b-card
                    v-for="course in courses"
                    bg-variant="light"
                    class="card"
            >
                <b-card-title>
                    {{course.name}}
                </b-card-title>
                <b-button
                        class="bg-info"
                        slot="footer"
                        @click="$emit('loadCourse', course)"
                >Kurs öffnen
                </b-button>
            </b-card>
            <b-card>
                <b-card-body>
                    <b-form-input v-model="name" placeholder="Name"></b-form-input>
                    <b-form-input v-model="description" placeholder="Beschreibung"></b-form-input>
                </b-card-body>
                <b-button
                        class="bg-info"
                        slot="footer"
                        @click="$emit('addCourse', name, description)"
                >Neuer Kurs
                </b-button>
            </b-card>
        </div>
    </div>
    
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['courses'],
});
</script>

<style scoped>
    .container-fluid {
        overflow-x: auto;
        display: flex;
        background-color: lightgray;
    }
    .card {
        text-align: center;
        min-width: 12rem;
        min-height: 10rem;
        max-width: 12rem;
        max-height: 10rem;
        margin: 10px 20px 10px 10px;
    }

</style>