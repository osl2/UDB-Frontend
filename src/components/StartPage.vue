<template>
    <div class="startpage">
        <div class="card-deck mb-3 text-center">
            <StartPagePanel :title="$t('sandbox.titleStartPage')" path="/sandbox"
                            :description="$t('home.descriptionTextFreeMode')" buttonName="Go"></StartPagePanel>
            <StartPagePanel title="Lehrerbereich" type="teacher"  path="/startPageTeacher"
                            :description="$t('home.descriptionTextTeacher')" buttonName="Anmelden"></StartPagePanel>
            <StartPagePanel title="Kursbereich" type="student" path="/courseView/"
                            :description="$t('home.descriptionTextCourse')"
                            buttonName="Kurs beitreten"></StartPagePanel>
        </div>
    </div>
</template>

<script lang="ts">
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

