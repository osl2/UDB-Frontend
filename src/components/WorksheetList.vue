<template>
    <div class="container-fluid bg-secondary mb-2">
        <div class="d-flex flex-row flex-nowrap">
                <b-card
                        v-for="worksheet in worksheets"
                        bg-variant="light"
                        class="card"
                        v-show="showWorksheet(worksheet)"
                        >
                    <b-card-title>
                        {{worksheet.name}}
                    </b-card-title>
                    <b-button
                            class="bg-info"
                            slot="footer"
                            @click="$emit('loadWorksheet', worksheet)"
                            v-show="isStudentsViewActive"
                    >{{$t('courseViewStudent.solveWorksheetButton')}}
                    </b-button>
                    <b-card-text slot="footer"
                                 v-show="!isStudentsViewActive"
                                 v-if="worksheet.isOnline"
                                 >{{$t('worksheetList.worksheetOnline')}}
                    </b-card-text>
                    <b-card-text slot="footer"
                                 v-show="!isStudentsViewActive"
                                 v-else
                    > {{$t('worksheetList.worksheetOffline')}}
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
      showWorksheet: function(sheet: Worksheet): boolean {
        if(this.isStudentsViewActive) {
          return sheet.isOnline;
        } else {
          return true;
        }
      }
  }
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
        min-height: 10rem;
        max-width: 12rem;
        max-height: 10rem;
        margin: 10px 20px 10px 10px;
    }
</style>
