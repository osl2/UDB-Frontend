<template>
    <div class="container-fluid bg-secondary mb-5 pt-3 pb-3 pl-0">
        <div class="d-flex flex-row flex-nowrap">
            <b-card v-if="areWorksheetsEmpty"
                    bg-variant="light"
                    class="card ml-3 col col-2 p-0"
            >
                <b-card-title>{{$t('worksheetList.noSheets')}}</b-card-title>
                <b-button slot="footer"
                          @click="$emit('loadWorksheets')"
                >
                    {{$t('worksheetList.loadNew')}}
                </b-button>
            </b-card>

            <b-card
                    v-for="worksheet in worksheets"
                    :key="worksheet.id"
                    bg-variant="light"
                    class="card ml-3 col col-2 p-0"
                    v-if="showWorksheet(worksheet)"
            >
                <b-card-title>
                    {{worksheet.name}}
                </b-card-title>
                <b-checkbox v-if="!isStudentsViewActive"
                            class="custom-switch"
                            v-on:change="updateWorksheetOnline(worksheet)"
                            v-model="worksheet.isOnline"
                >{{$t('worksheetList.worksheetOnline')}}
                </b-checkbox>
                <div v-if="isStudentsViewActive" class="btn-toolbar justify-content-center" slot="footer">
                    <b-button class="bg-info"
                              @click="$emit('openWorksheet', worksheet, false)"
                    >{{$t('courseViewStudent.solveWorksheetButton')}}
                    </b-button>
                </div>
                <div v-if="!isStudentsViewActive" class="btn-toolbar justify-content-center" slot="footer">
                    <b-button class="bg-danger mr-3"
                              @click="$emit('deleteWorksheet', worksheet)"
                    >{{$t('worksheetList.delete')}}
                    </b-button>
                    <b-button class="bg-info"
                              @click="$emit('openWorksheet', worksheet)"
                    >{{$t('worksheetList.edit')}}
                    </b-button>
                </div>
            </b-card>

            <b-card
                    class="card ml-3 col col-2 p-0"
                    v-if="hasUserWritePermission && !isStudentsViewActive"
            >
                <b-card-title>
                    {{$t('worksheetList.newSheet')}}
                </b-card-title>
                <b-card-body>
                    <b-form-input v-model="name" :placeholder="$t('worksheetList.name')"></b-form-input>
                </b-card-body>
                <b-button
                        class="bg-info"
                        slot="footer"
                        @click="$emit('createWorksheet', name)"
                >{{$t('worksheetList.add')}}
                </b-button>
            </b-card>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Worksheet from '@/dataModel/Worksheet';

    @Component({})
    export default class WorksheetList extends Vue {
        private errorMsg: string = '';
        @Prop() private worksheets!: Worksheet[];
        @Prop() private isStudentsViewActive!: boolean;
        @Prop() private hasUserWritePermission!: boolean;
        private name: string = '';

        public showWorksheet(sheet: Worksheet): boolean {
            if (this.isStudentsViewActive) {
                return sheet.isOnline;
            } else {
                return true;
            }
        }

        public updateWorksheetOnline(sheet: Worksheet): void {
            // we need to wait for v-model of worksheet.isOnline to catch up
            Vue.nextTick(() => {
                this.$emit('updateWorksheet', sheet);
            });
        }

        get areWorksheetsEmpty(): boolean {
            if (this.isStudentsViewActive) {
                return this.worksheets.every((worksheet: Worksheet) => !worksheet.isOnline);
            } else {
                return this.worksheets.length === 0;
            }
        }
    }
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
