<template>
    <div id="upowdb-main-container" class="container">
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
}
</script>

<style lang="scss">
.lang-changer {
    margin-top: 20px;
}
</style>
