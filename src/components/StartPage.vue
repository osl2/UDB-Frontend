<template>
    <div class="startpage">


        <div class="card-deck mb-3 text-center">
            <StartPagePanel title="test" path="/sandbox" description="desc" buttonName="Go"></StartPagePanel>
            <StartPagePanel title="test" path="/sandbox" description="desc" buttonName="Go"></StartPagePanel>
            <StartPagePanel title="test" path="/sandbox" description="desc" buttonName="Go"></StartPagePanel>


        </div>
    </div>
</template>

<script type="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import StartPagePanel from '@/components/StartPagePanel.vue';

  @Component({
    components: {StartPagePanel},
  })
  export default class StartPage extends Vue {
  }
</script>

<style scoped>

</style>

