<template>
    <div class="startpage">
        <div class="card-deck mb-3 text-center">
            <StartPagePanel
                :title="$t('sandbox.titleStartPage')"
                path="/sandbox"
                :description="$t('home.descriptionTextFreeMode')"
                :button-name="$t('home.enter')"
            ></StartPagePanel>
            <StartPagePanel
                :title="$t('teacher.titleStartPage')"
                type="teacher"
                path="/startPageTeacher"
                :description="$t('home.descriptionTextTeacher')"
                button-name="Anmelden"
            ></StartPagePanel>
            <StartPagePanel
                :title="$t('course.titleStartPage')"
                type="student"
                path="/courseView/"
                :description="$t('home.descriptionTextCourse')"
                :button-name="$t('home.enterCourse')"
            ></StartPagePanel>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import StartPagePanel from '@/components/StartPagePanel.vue';

@Component({
    components: { StartPagePanel },
})
export default class StartPage extends Vue {}
</script>

<style scoped></style>
