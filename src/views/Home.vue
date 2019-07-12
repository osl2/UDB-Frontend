<template>
    <div class="home">
        <StartPage></StartPage>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import StartPage from '@/components/StartPage.vue'; // @ is an alias to /src

  @Component({
    components: {
      StartPage,
    },
  })
  export default class Home extends Vue {
  }
</script>
