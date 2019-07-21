<template>
    <div class="container">
        <div>
            <h1>{{course.name}}</h1>
            <h2>{{course.description}}</h2>
        </div>
        <div>
            <WorksheetList
                    :course="course"
            ></WorksheetList>
        </div>
        <div @loadWorksheet="loadWorksheet">
            {{worksheetName}}
            {{isTestVisible}}
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import WorksheetList from '@/components/WorksheetList.vue';
    import SolutionsheetList from '@/components/SolutionsheetList.vue';
    import Course from '@/dataModel/Course.ts'
    import Worksheet from '@/dataModel/Worksheet.ts'

    // TODO entferne hardgecodete Worksheet Daten:
    let worksheet1 = new Worksheet('123', 'Blatt 01', [], true, true);
    let worksheet2 = new Worksheet('456', 'Blatt 02', [], true, false);
    let worksheet3 = new Worksheet('456', 'Blatt 03', [], true, false);
    let worksheet4 = new Worksheet('456', 'Blatt 04', [], true, false);

    export default Vue.extend({
        components: {
            WorksheetList,
            SolutionsheetList,
        },
        data() {
            return {
                course: null,
                isTestVisible: false,
                worksheetName: '',
            }
        },
        methods: {
            loadWorksheet: function(worksheetName: string) {
                this.isTestVisible = true;
                this.worksheetName = worksheetName;
            }
        },

        mounted: function() {
            this.course = new Course('abc', 'Klasse 7a', 'Schuljahr 19/20', [worksheet1, worksheet2, worksheet3, worksheet4]);
            },
    })
</script>

<style scoped>
    .container {
        width: 80%;
        margin: auto;
    }
</style>
