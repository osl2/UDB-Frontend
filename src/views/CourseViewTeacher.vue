<template>
    <div>
        <div>
            <Navbar></Navbar>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Navbar from '@/components/Navbar.vue';
    import CourseList from "@/components/CourseList.vue";
    import DatabaseList from "@/components/DatabaseList.vue";

    export default Vue.extend({
        components: {
          Navbar,
          CourseList,
          DatabaseList,
        }
    })
</script>

<style scoped>

</style>