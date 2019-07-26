<template>
    <div class="container-fluid mb-2">
        <div class="d-flex flex-row flex-nowrap">
            <b-card
                    v-for="database in databases"
                    bg-variant="light"
                    class="card"
            >
                <b-card-title>
                    {{database.name}}
                </b-card-title>
                <b-button
                        class="bg-info"
                        slot="footer"
                        @click="$emit('showDatabase', database)"
                >Datenbank anzeigen
                </b-button>
            </b-card>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['databases'],
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