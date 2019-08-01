<template>
    <b-button class="help-btn" v-b-modal.modal-help>
        <b-img rounded="true" src="../../public/img/questionmark.png"></b-img>
    </b-button>
    <b-modal id="modal-help" busy="true" >
        <p>{{this.helpmsg}}</p>
    </b-modal>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
export default class extends Vue {
    @Prop() private helpmsg!: string;
}
</script>

<style scoped>
    .help-btn{
        width: 5px;
        height: 5px;

    }

</style>
