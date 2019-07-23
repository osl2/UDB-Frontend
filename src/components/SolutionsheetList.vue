<template>
    <div class="container-fluid bg-secondary mb-2">
        <div class="d-flex flex-row flex-nowrap">
                <b-card
                        v-for="worksheet in course.worksheets"
                        bg-variant="light"
                        class="card"
                        v-show="worksheet.isSolutionOnline"
                >
                    <b-card-title>
                        {{$t('courseViewStudent.solutionsheetText')}} {{worksheet.name}}
                    </b-card-title>
                    <b-button
                            class="bg-info"
                            slot="footer"
                            @click="$emit('generateSolutionsheet', worksheet)"
                    >{{$t('courseViewStudent.showSolutionsheetButton')}}
                    </b-button>
                </b-card>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
        props: ['course'],
    })
</script>

<style scoped>
    .container-fluid {
        overflow-x: auto;
        display: flex;
    }
    .card {
        text-align: center;
        min-width: 12rem;
        min-height: 11rem;
        max-width: 12rem;
        max-height: 11rem;
        margin: 10px 20px 10px 10px;
    }
</style>
