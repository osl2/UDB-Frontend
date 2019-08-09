<template>
    <div>
        <h2>
            <b-button v-b-popover.hover="'Hier die Hilfetexte einfügen!'" class="helpBtn bg-info ">
                <b-bagde pill variant="info">?</b-bagde>
            </b-button>
        </h2>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

export default class HelpButton extends Vue {
    public helpmsg: string = 'test';
}
</script>

<style scoped>
    .helpBtn{
        border-radius: 25px;

    }

</style>
