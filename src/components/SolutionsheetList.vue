<template>
    <div class="container-fluid bg-secondary mb-5 pt-3 pb-3 pl-0">
        <div class="d-flex flex-row flex-nowrap">
            <b-card
                v-for="worksheet in visibleWorksheets"
                :key="worksheet.id"
                bg-variant="light"
                class="card ml-3 col col-2 p-0"
            >
                <b-card-title>{{ $t('courseViewStudent.solutionsheetText') }} {{ worksheet.name }}</b-card-title>
                <b-button
                    v-if="isStudentsViewActive"
                    slot="footer"
                    class="bg-info"
                    @click="$emit('generateSolutionsheet', worksheet)"
                >
                    {{ $t('courseViewStudent.showSolutionsheetButton') }}
                </b-button>
                <b-card-text v-if="!isStudentsViewActive && worksheet.isSolutionOnline" slot="footer">
                    {{ $t('solutionsheetList.solutionsheetOnline') }}
                </b-card-text>
                <b-card-text v-if="!isStudentsViewActive && !worksheet.isSolutionOnline" slot="footer">
                    {{ $t('solutionsheetList.solutionsheetOffline') }}
                </b-card-text>
            </b-card>
            <!--Empty Div is needed to fix slider behaviour!-->
            <div class="ml-3"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Worksheet from '@/dataModel/Worksheet';

@Component
export default class SolutionsheetList extends Vue {
    @Prop() private worksheets!: Worksheet[];
    @Prop() private isStudentsViewActive!: boolean;

    showWorksheet(sheet: Worksheet): boolean {
        if (this.isStudentsViewActive) {
            return sheet.isSolutionOnline;
        } else {
            return true;
        }
    }

    get visibleWorksheets(): Worksheet[] {
        return this.worksheets.filter(worksheet => this.showWorksheet(worksheet));
    }
}
</script>

<style scoped>
.container-fluid {
    overflow-x: auto;
    display: flex;
}

/deep/ .card {
    text-align: left;
    min-width: 15rem;
    height: 100%;
}

/deep/ .card-footer {
    text-align: center;
}

/deep/ .card-title {
    overflow-y: fragments;
}
</style>
