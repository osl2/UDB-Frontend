<template>
    <div class="startpage">
        <div class="card-deck mb-3 text-center">
            <StartPagePanel :title="$t('sandbox.titleStartPage')" path="/sandbox" description="desc" buttonName="Go"></StartPagePanel>
            <StartPagePanel title="Lehrerbereich" type="teacher"  path="/startPageTeacher" description="desc" buttonName="Anmelden"></StartPagePanel>
            <StartPagePanel title="Kursbereich" type="student" path="/courseView/courseId" description="desc" buttonName="Kurs beitreten"></StartPagePanel>
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

