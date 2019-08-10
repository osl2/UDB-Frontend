<template>
  <div class="container-fluid">
    <b-list-group>
      <b-list-group-item
          v-for="database in databases"
          :key="database.id"
          bg-variant="light"
          class="card"
      >
        {{database.name}}
        <b-button class="bg-info" @click="$emit('deleteDatabase', database)">
          {{$t('buttonText.delete')}}
        </b-button>
      </b-list-group-item>
    </b-list-group>
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
