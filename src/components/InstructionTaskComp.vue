<template>
        <div>
            <h3>{{$t('taskComp.instruction')}}</h3>
            <div class="taskContainer">
                {{this.currentSubtask.instruction}}
            </div>
        </div>

</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
    props: ['currentSubtask'],
});
</script>

<style scoped>
    .taskContainer {
        border: 1px lightgray solid;
        margin: 10px 0px 20px 0px;
        padding: 5px 0px 5px 10px;
    }
</style>
