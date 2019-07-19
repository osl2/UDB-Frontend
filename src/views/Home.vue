<template>
    <div class="home container">

        <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <!--<img src="../assets/logo.png" class="img-fluid" alt="Responsive image">-->
            <h1 v-html="$t('home.logo')"></h1>
            <h2>{{ $t('home.slogan') }}</h2>
        </div>

        <StartPage></StartPage>

        <!-- footer language switcher -->

        <div class="lang-changer float-right">
            <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">{{ $t('home.language') }}</span>
                </div>
                <select id="langInput" v-model="$i18n.locale" class="form-control">
                    <option v-for="(lang, i) in languages" :key="`Lang${i}`" :value="lang.lang">{{ lang.desc }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import StartPage from '@/components/StartPage.vue'; // @ is an alias to /src

  @Component({
    components: {StartPage},
  })
  export default class Home extends Vue {
    public name: string = 'lang-changer';

    public data() {
      return {
        languages: [
          {
            lang: 'de',
            desc: this.$t('home.langGerman'),
          },
          {
            lang: 'en',
            desc: this.$t('home.langEnglish'),
          },
        ],
      };
    }
  }
</script>
