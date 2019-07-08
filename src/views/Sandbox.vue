<template>
    <SandboxQuery></SandboxQuery>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import SandboxQuery from '@/components/SandboxQuery.vue';

    @Component({
        components: {
            SandboxQuery,
        }
    })

    export default class Sandbox extends Vue {
    }
</script>

<style scoped>

</style>
