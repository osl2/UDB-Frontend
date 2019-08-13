<template>
    <div class="startpage">
        <div class="card-deck mb-3 text-center">
            <StartPagePanel :title="$t('sandbox.titleStartPage')" path="/sandbox"
                            :description="$t('home.descriptionTextFreeMode')" :buttonName="$t('home.enter')"></StartPagePanel>
            <StartPagePanel :title="$t('teacher.titleStartPage')" type="teacher"  path="/startPageTeacher"
                            :description="$t('home.descriptionTextTeacher')" buttonName="Anmelden"></StartPagePanel>
            <StartPagePanel :title="$t('course.titleStartPage')" type="student" path="/courseView/"
                            :description="$t('home.descriptionTextCourse')"
                            :buttonName="$t('home.enterCourse')"></StartPagePanel>
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

