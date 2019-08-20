<template>
    <div class="container-fluid bg-secondary mb-5 pt-3 pb-3 pl-0">
        <div class="d-flex flex-row flex-nowrap">
            <b-card
                    v-for="worksheet in worksheets"
                    :key="worksheet.id"
                    bg-variant="light"
                    class="card ml-3 col col-2 p-0"
                    v-if="showWorksheet(worksheet)"
            >
                <b-card-title>
                    {{$t('courseViewStudent.solutionsheetText')}} {{worksheet.name}}
                </b-card-title>
                <b-button
                        class="bg-info"
                        slot="footer"
                        @click="$emit('generateSolutionsheet', worksheet)"
                        v-if="isStudentsViewActive"
                >{{$t('courseViewStudent.showSolutionsheetButton')}}
                </b-button>
                <b-card-text slot="footer"
                             v-if="!isStudentsViewActive && worksheet.isSolutionOnline"
                >{{$t('solutionsheetList.solutionsheetOnline')}}
                </b-card-text>
                <b-card-text slot="footer"
                             v-if="!isStudentsViewActive && !worksheet.isSolutionOnline"
                >{{$t('solutionsheetList.solutionsheetOffline')}}
                </b-card-text>
            </b-card>
            <!--Empty Div is needed to fix slider behaviour!-->
            <div class="ml-3"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Worksheet from '@/dataModel/Worksheet';

export default Vue.extend({
    props: ['worksheets', 'isStudentsViewActive'],
    methods: {
        showWorksheet(sheet: Worksheet): boolean {
            if (this.isStudentsViewActive) {
                return sheet.isOnline;
            } else {
                return true;
            }
        },
    },
});
</script>

<style scoped>
    .container-fluid {
        overflow-x: auto;
        display: flex;
    }

    /deep/.card {
        text-align: left;
        min-width: 15rem;
    }

    /deep/.card-footer {
        text-align: center;
    }

    /deep/.card-title {
        overflow-y: fragments;
    }
</style>
