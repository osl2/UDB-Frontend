<template>
    <div class="container-fluid bg-secondary mb-2">
        <div class="d-flex flex-row flex-nowrap">
                <b-card
                        v-for="worksheet in worksheets"
                        :key="worksheet.id"
                        bg-variant="light"
                        class="card"
                        v-show="showWorksheet(worksheet)"
                >
                    <b-card-title>
                        {{$t('courseViewStudent.solutionsheetText')}} {{worksheet.name}}
                    </b-card-title>
                    <b-button
                            class="bg-info"
                            slot="footer"
                            @click="$emit('generateSolutionsheet', worksheet)"
                            v-show="isStudentsViewActive"
                    >{{$t('courseViewStudent.showSolutionsheetButton')}}
                    </b-button>
                    <b-card-text slot="footer"
                                 v-show="!isStudentsViewActive"
                                 v-if="worksheet.isOnline"
                    >{{$t('solutionsheetList.solutionsheetOnline')}}
                    </b-card-text>
                    <b-card-text slot="footer"
                                 v-show="!isStudentsViewActive"
                                 v-else
                    > {{$t('solutionsheetList.solutionsheetOffline')}}
                    </b-card-text>
                </b-card>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Worksheet from "@/dataModel/Worksheet";
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
    .card {
        text-align: center;
        min-width: 12rem;
        min-height: 11rem;
        max-width: 12rem;
        max-height: 11rem;
        margin: 10px 20px 10px 10px;
    }
</style>
