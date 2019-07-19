<template>
    <Query></Query>
</template>

<script lang="ts">

  import {Component, Vue} from 'vue-property-decorator';
  import Query from '@/components/Query.vue';

  @Component({
    components: {
      Query,
    },
  })

  export default class Sandbox extends Vue {
  }
</script>

<style scoped>

</style>
