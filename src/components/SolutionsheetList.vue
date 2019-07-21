<template>
    <div class="list">
        <div class="scroll">
            <b-card-group>
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
                            slot="footer"
                            @click="$emit('generateSolutionsheet', worksheet)"
                    >{{$t('courseViewStudent.showSolutionsheetButton')}}
                    </b-button>
                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    export default Vue.extend({
        props: ['course'],
    })
</script>

<style scoped>
    .scroll {
        border: 1px lightgray solid;
        background: lightgray;
        height: 14rem;
        overflow: auto;
    }

    .card {
        text-align: center;
        min-width: 12rem;
        min-height: 12rem;
        max-width: 12rem;
        max-height: 12rem;
        margin: 10px 20px 10px 10px;

    }

    .btn {
        background-color: darkcyan;
    }
</style>
