<template>
    <div id="upowdb-main-container" class="container">
        <div v-if="this.$router.currentRoute.name !== 'home'" class="backButton btn-lg">
            <b-btn href="#" @click="goBack">
                {{ $t('home.back') }}
            </b-btn>
        </div>
        <router-view />
        <!-- footer language switcher -->

        <div class="lang-changer float-right">
            <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                    <span id="inputGroup-sizing-sm" class="input-group-text">{{ $t('home.language') }}</span>
                </div>
                <select id="langInput" v-model="$i18n.locale" class="form-control">
                    <option v-for="(lang, i) in languages" :key="`Lang${i}`" :value="lang.lang">{{ lang.desc }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
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

    private goBack() {
        this.$router.go(-1);
    }
}
</script>

<style lang="scss">
.lang-changer {
    margin-top: 20px;
}
.backButton {
    position: absolute;
    top: 40px;
    left: 40px;
    z-index: 99;
}
</style>
