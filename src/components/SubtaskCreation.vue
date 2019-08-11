<template>
    <div>
        <!--Minimized variant, showing only the type of the subtask to make the site less cluttered when creating several subtasks -->
    <div v-if="!showfull">
        <b-card>
            <div v-if="this.tasktype ==='inst'" class="bg-secondary text-light">
                Erklärender Text
            </div>
            <div v-else-if="this.tasktype ==='text'" class="bg-secondary text-light">
                Freitext Aufgabe
            </div>
            <div v--else-if="this.tasktype ==='mc'" class="bg-secondary text-light">
               Multiple-Choice Aufgabe
            </div>
            <div v-else-if="this.tasktype ==='sql'" class="bg-secondary text-light">
                Sql Aufgabe
            </div>
            <b-button @click="changeSize"> Teilaufgabe minimieren</b-button>
        </b-card>
    </div>

    <div v-else-if="showfull">
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
                <b-form-radio v-model="solutionverifyable" :value="true">ja</b-form-radio>
                <b-form-radio v-model="solutionverifyable" :value="false">nein</b-form-radio>
            </b-form-group>

            <div v-if="solutionverifyable">
                <b-form-input v-model="solution" placeholder="Lösung hier eingeben"></b-form-input>

                <b-form-group label="Musterlösung freigegeben">
                    <b-form-radio v-model="solutionvisible" :value="true">ja</b-form-radio>
                    <b-form-radio v-model="solutionvisible" :value="false">nein</b-form-radio>
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
            <b-button @click="addAnswerOption(true)"> Antwort hinzufügen </b-button>

            <div>
                Antwortmöglichkeiten: {{answerOptionsText}} {{selected}}
            </div>

            <b-form-group label="Musterlösung vorhanden">
                <b-form-radio v-model="solutionverifyable" :value="true">ja</b-form-radio>
                <b-form-radio v-model="solutionverifyable" :value="false">nein</b-form-radio>
            </b-form-group>

            <div v-if="solutionverifyable">
                Wähle die richtigen Antwortmöglichkeiten aus.
                <b-form-group>
                    <b-form-checkbox-group
                            v-model="selected"
                            :options="answerOptions"
                            stacked
                    ></b-form-checkbox-group>
                </b-form-group>


                <b-form-group label="Musterlösung freigegeben">
                    <b-form-radio v-model="solutionvisible" :value="true">ja</b-form-radio>
                    <b-form-radio v-model="solutionvisible" :value="false">nein</b-form-radio>
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
                <b-form-radio v-model="allowedSqlStatements"  :value='AllowedSqlStatements.NoRestriction'>keine Einschränkungen</b-form-radio>
                <b-form-radio v-model="allowedSqlStatements"  :value="AllowedSqlStatements.SelectStatements">Select Befehle</b-form-radio>
            </b-form-group>

            <b-form-group label="Ist das Point and Click Feature Nutzbar?">
                <b-form-radio v-model="isPointAndClickAllowed" :value="true">ja</b-form-radio>
                <b-form-radio v-model="isPointAndClickAllowed"  :value="false">nein</b-form-radio>
            </b-form-group>

            <b-form-group label="Musterlösung vorhanden">
                <b-form-radio v-model="solutionverifyable" :value="true">ja</b-form-radio>
                <b-form-radio v-model="solutionverifyable" :value="false">nein</b-form-radio>
            </b-form-group>

            <div v-if="solutionverifyable">
                <b-form-input v-model="solution" placeholder="Lösung hier eingeben"></b-form-input>

                <b-form-group label="Musterlösung zum Vergleichen freigegeben">
                    <b-form-radio v-model="solutionvisible" :value="true">ja</b-form-radio>
                    <b-form-radio v-model="solutionvisible" :value="false">nein</b-form-radio>
                </b-form-group>

                <b-form-group v-if="solutionvisible" label="Ist die Reihenfolge der Reihen beim Vergleichen wichtig?">
                    <b-form-radio v-model="doesRowOrderMatter"  :value="true">ja</b-form-radio>
                    <b-form-radio v-model="doesRowOrderMatter"  :value="false">nein</b-form-radio>
                </b-form-group>
            </div>

        </div>
        <!--Adds the subtask to a task -->
        <b-button @click="saveSubtask"> Teilaufgabe speichern</b-button>
        <b-button @click="changeSize">Teilaufgabe minimueren</b-button>
    </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import InstructionTask from "@/dataModel/InstructionTask";
    import Subtask from '@/dataModel/Subtask';
    import PlainTextTask from "@/dataModel/PlainTextTask";
    import PlainTextSolution from "@/dataModel/PlainTextSolution";
    import MultipleChoiceTask from "@/dataModel/MultipleChoiceTask";
    import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';
    import SqlTask from "@/dataModel/SqlTask";
    import SqlSolution from '@/dataModel/SqlSolution';
    import AllowedSqlStatements from "@/dataModel/AllowedSqlStatements";
    import QueryResult from '@/dataModel/QueryResult';
    import {ResultSet} from "@/dataModel/ResultSet";
    import SubtaskTypes from '@/dataModel/SubtaskTypes';

    export default Vue.extend ({

        data() {
            return {
                //variables needed for the user interface or all tasks
                showfull: true,
                createdSubtask: Subtask,
                subtaskId:'',
                tasktype: null,
                taskInstruction: '',
                index : 0,
                typeOptions: [
                    {value: null, text: 'Wähle die Art der Teilaufgabe aus'},
                    {value: 'inst', text: 'Erklärender Text, keine Bearbeitung für Schüler'},
                    {value: 'text', text: 'Freitext Aufgabe'},
                    {value: 'mc', text: 'Multiple-Choice Aufgabe'},
                    {value: 'sql', text: 'Sql Aufgabe'},
                ],

                //variables needed for a subtask with a solution
                solutionverifyable: false,
                solutionvisible: false,

                // variables needed for a sql subtask or plaintexttask
                queryResult: null as unknown as ResultSet,
                sqlExecutor: this.$store.getters.sqlExecutor,
                allowedSqlStatements: AllowedSqlStatements.NoRestriction,
                isPointAndClickAllowed: false,
                doesRowOrderMatter: false,
                solution: '',
                //variables specifically for a multiple choice subtask
                selected: [],
                answerOption: '' as string,
                answerOptions: [] as object[],
                answerOptionsText: [] as string[],

            };
        },
        props: ['subtask', 'subindex', 'dbId'],

        created(){
            if(this.subtask === null){
                return
            }else{
                if(this.subtask.type === SubtaskTypes.Instruction){
                    this.subtaskId = this.subtask.id;
                    this.taskInstruction = this.subtask.instruction;

                }else if(this.subtask.type === SubtaskTypes.PlainText){
                    this.subtaskId = this.subtask.id;
                    this.taskInstruction = this.subtask.instruction;
                    this.solution = this.subtask.solution.text;
                    this.solutionverifyable = this.subtask.isSolutionVeryfiable;
                    this.solutionvisible = this.subtask.isSolutionVisible;

                }else if(this.subtask.type === SubtaskTypes.MultipleChoice){
                    this.subtaskId = this.subtask.id;
                    this.taskInstruction = this.subtask.instruction;
                    this.solutionverifyable = this.subtask.isSolutionVeryfiable;
                    this.solutionvisible = this.subtask.isSolutionVisible;
                    this.answerOptionsText = this.subtask.answerOptions;
                    for(var option in this.answerOptionsText){
                        this.answerOption = option;
                        this.addAnswerOption(false);
                    }
                    this.selected = this.subtask.solution.choices;
                }else if(this.subtask.type === SubtaskTypes.Sql){
                    this.subtaskId = this.subtask.id;
                    this.taskInstruction = this.subtask.instruction;
                    this.solutionverifyable = this.subtask.isSolutionVeryfiable;
                    this.solutionvisible = this.subtask.isSolutionVisible;
                    this.isPointAndClickAllowed = this.subtask.isPointAndClickAllowed;
                    this.doesRowOrderMatter = this.subtask.doesRowOrderMatter;
                    this.solution = this.subtask.solution.querySolution;
                }

            }

        },
        methods: {

            /**
             * method used in the creation of a multiple choice task
             * adds the last entered answer of a multiple choice task to its array of all possible answers
             */
            addAnswerOption(withText: boolean) {
                if (this.answerOption === '') {
                    alert("Bitte trage eine Antwortmöglichkeit ein.");
                    return;
                }
                this.answerOptions.push({text: this.answerOption, value: this.index});
                if(withText) {
                    this.answerOptionsText.push(this.answerOption);
                }
                this.answerOption = '';
                this.index ++;

            },
            changeSize(){
                this.showfull = !this.showfull;
            },

            /**
            saveSubtask() {
                if(this.tasktype === 'inst'){
                    this.createdSubtask = new InstructionTask(this.subtaskId,this.taskInstruction);
                }else if(this.tasktype === 'text'){
                    this.createdSubtask = new PlainTextTask(this.subtaskId,new PlainTextSolution(this.solution),this.taskInstruction,this.solutionverifyable,this.solutionvisible);
                }else if(this.tasktype === 'mc'){
                    this.createdSubtask = new MultipleChoiceTask(this.subtaskId,new MultipleChoiceSolution(this.selected),this.taskInstruction,this.solutionverifyable,this.solutionvisible, this.answerOptionsText);
                }else if(this.tasktype === 'sql'){
                    this.queryResult = this.sqlExecutor.executeQuery(this.dbId, this.solution, 0);
                    this.createdSubtask = new SqlTask(this.subtaskId,new SqlSolution(this.solution, this.queryResult.columns, this.queryResult.values), this.taskInstruction,this.solutionverifyable,this.isPointAndClickAllowed, this.doesRowOrderMatter,this.solutionvisible, this.allowedSqlStatements);
                }
                    this.$emit('save', this.subindex, this.createdSubtask);
                }
             **/
        },


    });
</script>

<style scoped>

</style>

