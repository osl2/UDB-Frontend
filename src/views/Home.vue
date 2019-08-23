<template>
    <div>
        <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <!--<img src="../assets/logo.png" class="img-fluid" alt="Responsive image">-->
            <h1 v-html="$t('home.logo')"></h1>
            <h2>{{ $t('home.slogan') }}</h2>
        </div>

        <StartPage></StartPage>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import StartPage from '@/views/StartPage.vue'; // @ is an alias to /src

@Component({
    components: { StartPage },
})
export default class Home extends Vue {}
</script>
