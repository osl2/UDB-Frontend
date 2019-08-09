<template>
    <div>
        <!-- selects the subtask type -->
        <b-form-select v-model="tasktype" :options="typeOptions"></b-form-select>

        <!-- displays options to creat a subtask of the type instruction task.
            it has an area to input the task instruction-->

        <div v-if="tasktype === 'inst'">
            <b-form-input v-model="taskInstruction" placeholder="Aufgabentext hier eingeben"></b-form-input>
        </div>


        <!-- displays options to create a subtask of the type PlainTextTask.
        it has an area to input the task instructions,
        a radio to choose whether a teachersolution should exists.
        if a teacher solution should exist it also has:
        an area to input the teacher solution, can be a simple text or a regex
        a radio to choose whether a student can compare its solution to the teacher solution-->

        <div v-else-if="tasktype === 'text'">
            <b-form-input v-model="taskInstruction" placeholder="Aufgabentext hier eingeben"></b-form-input>
            <b-form-group label="Musterlösung vorhanden">
                <b-form-radio v-model="solutionprovided" :value="true">ja</b-form-radio>
                <b-form-radio v-model="solutionprovided" :value="false">nein</b-form-radio>
            </b-form-group>

            <div v-if="solutionprovided">
                <b-form-input v-model="solution" placeholder="Lösung hier eingeben"></b-form-input>

                <b-form-group label="Musterlösung freigegeben">
                    <b-form-radio v-model="solutionveryfiable" :value="true">ja</b-form-radio>
                    <b-form-radio v-model="solutionveryfiable" :value="false">nein</b-form-radio>
                </b-form-group>
            </div>
        </div>

        <!-- displays options to create a subtask of the type MultipleChoiceTask.
       includes an area to input the task instructions,
       an area to input all possible answers for the multiple choice task
       a radio to choose whether a teachersolution should exists
       if a teacher solution should exist it also has:
       a display with all possible answers where the teacher can select the correct answers
       a radio to choose whether a student can compare its solution to the teacher solution-->

        <div v-else-if="tasktype === 'mc'">
            <b-form-input v-model="taskInstruction" placeholder="Aufgabentext hier eingeben"></b-form-input>
            <b-form-input v-model="answerOption" placeholder="Antwortmöglichkeit hier eingeben"></b-form-input>
            <b-button @click="addAnswerOption"> Antwort hinzufügen </b-button>

            <div>
                Antwortmöglichkeiten: {{answerOptionsText}} {{selected}}
            </div>

            <b-form-group label="Musterlösung vorhanden">
                <b-form-radio v-model="solutionprovided" :value="true">ja</b-form-radio>
                <b-form-radio v-model="solutionprovided" :value="false">nein</b-form-radio>
            </b-form-group>

            <div v-if="solutionprovided">
                Wähle die richtigen Antwortmöglichkeiten aus.
                <b-form-group>
                    <b-form-checkbox-group
                            v-model="selected"
                            :options="answerOptions"
                            stacked
                    ></b-form-checkbox-group>
                </b-form-group>


                <b-form-group label="Musterlösung freigegeben">
                    <b-form-radio v-model="solutionveryfiable" :value="true">ja</b-form-radio>
                    <b-form-radio v-model="solutionveryfiable" :value="false">nein</b-form-radio>
                </b-form-group>
            </div>
        </div>

        <!-- displays options to create a subtask of the type SqlTask.
               includes an area to input the task instructions
                a radio to choose which kind of sql statements can be used (no restrictions
                    or statements that can only select from, but not alter, the database )
               a radio to choose whether the Point and Click feature can be used to solve the task
               a radio to choose whether a teachersolution should exists
               if a teacher solution should exist it also has:
               an area to input the teacher solution
               a radio to choose whether a student can compare its solution to the teacher solution
               a radio to choose if the row oder of the student solution matters when it's compared
                    to the teacher solution-->

        <div v-else-if="tasktype === 'sql'">
            <b-form-input v-model="taskInstruction" placeholder="Aufgabentext hier eingeben"></b-form-input>

            <b-form-group label="Welche sql Befehle dürfen verwendet werden?">
                <b-form-radio v-model="allowedSqlStatements"  :value="NoRestriction">keine Einschränkungen</b-form-radio>
                <b-form-radio v-model="allowedSqlStatements"  :value="SelectStatements">Select Befehle</b-form-radio>
            </b-form-group>

            <b-form-group label="Ist das Point and Click Feature Nutzbar?">
                <b-form-radio v-model="isPointAndClickActive" :value="true">ja</b-form-radio>
                <b-form-radio v-model="isPointAndClickActive"  :value="false">nein</b-form-radio>
            </b-form-group>

            <b-form-group label="Musterlösung vorhanden">
                <b-form-radio v-model="solutionprovided" :value="true">ja</b-form-radio>
                <b-form-radio v-model="solutionprovided" :value="false">nein</b-form-radio>
            </b-form-group>

            <div v-if="solutionprovided">
                <b-form-input v-model="solution" placeholder="Lösung hier eingeben"></b-form-input>

                <b-form-group label="Musterlösung zum Vergleichen freigegeben">
                    <b-form-radio v-model="solutionveryfiable" :value="true">ja</b-form-radio>
                    <b-form-radio v-model="solutionveryfiable" :value="false">nein</b-form-radio>
                </b-form-group>

                <b-form-group v-if="solutionveryfiable" label="Ist die Reihenfolge der Reihen beim Vergleichen wichtig?">
                    <b-form-radio v-model="doesRowOrderMatter"  :value="true">ja</b-form-radio>
                    <b-form-radio v-model="doesRowOrderMatter"  :value="false">nein</b-form-radio>
                </b-form-group>
            </div>

        </div>

        <!--Adds the subtask to a task -->
        <b-button @click="saveSubtask"> Teilaufgabe speichern</b-button>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend ({

        data() {
            return {
                allowedSqlStatements: 'NoRestriction',
                selected: [],
                tasktype: null,
                taskInstruction: '',
                isPointAndClickActive: false,
                doesRowOrderMatter: false,
                solutionprovided: false,
                answerOption: '' as string,
                answerOptions: [] as object[],
                answerOptionsText: [] as string[],
                index : 0,
                solution: '',
                solutionveryfiable: false,
                typeOptions: [
                    {value: null, text: 'Wähle die Art der Teilaufgabe aus'},
                    {value: 'inst', text: 'Erklärender Text, keine Bearbeitung für Schüler'},
                    {value: 'text', text: 'Freitext Aufgabe'},
                    {value: 'mc', text: 'Multiple-Choice Aufgabe'},
                    {value: 'sql', text: 'Sql Aufgabe'},
                ],
            };
        },
        methods: {

            /**
             * method used in the creation of a multiple choice task
             * adds the last entered answer of a multiple choice task to its array of all possible answers
             */
            addAnswerOption() {
                if (this.answerOption === '') {
                    alert("Bitte trage eine Antwortmöglichkeit ein.");
                    return;
                }
                this.answerOptions.push({text: this.answerOption, value: this.index});
                this.answerOptionsText.push(this.answerOption);
                this.answerOption = '';
                this.index ++;

            },


            saveSubtask() {
                alert("muss noch implementiert werden");
            },
        },


    });
</script>

<style scoped>

</style>

