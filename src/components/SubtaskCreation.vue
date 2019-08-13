<template>
    <div>
        <!--Div is never shown as the subtask type doesn't need to be displayed here but a use of subtask is needed
         for the variables to be set. v-show always loads even if it's not displayed-->
        <div v-show="false">
            {{subtask.type}}
        </div>
        {{subtask}}
        <!--Minimized variant, showing only the type of the subtask
         to make the site less cluttered when creating or editing several subtasks -->
    <div v-if="!showfull">
        <b-card>
            <div v-if="this.tasktype ==='inst'" class="bg-secondary text-light">
                {{$t('subtaskCreation.typeInstruction')}}

            </div>
            <div v-else-if="this.tasktype ==='text'" class="bg-secondary text-light">
                {{$t('subtaskCreation.typePlainText')}}

            </div>
            <div v-else-if="this.tasktype ==='mc'" class="bg-secondary text-light">
                {{$t('subtaskCreation.typeMultipleChoice')}}

            </div>
            <div v-else-if="this.tasktype ==='sql'" class="bg-secondary text-light">
                {{$t('subtaskCreation.typeSql')}}

            </div>
            <b-button @click="changeSize">  {{$t('subtaskCreation.maximize')}}</b-button>
        </b-card>
    </div>

    <div v-else-if="showfull">
        <!-- selects the subtask type -->
        <b-form-select v-model="tasktype" :options="typeOptions"></b-form-select>

        <!-- displays options to create or update a subtask of the type instruction task.
            it has an area to input the task instruction-->

        <div v-if="tasktype === 'inst'">
            <b-form-input v-model="subtask.instruction" :placeholder="$t('subtaskCreation.instruction')"></b-form-input>
        </div>


        <!-- displays options to create or update a subtask of the type PlainTextTask.
        it has an area to input the task instructions,
        a radio to choose whether a teachersolution should exists.
        if a teacher solution should exist it also has:
        an area to input the teacher solution, can be a simple text or a regex
        a radio to choose whether a student can compare its solution to the teacher solution-->

        <div v-else-if="tasktype === 'text'">
            <b-form-input v-model="taskInstruction" :placeholder="$t('subtaskCreation.instruction')"></b-form-input>
            <b-form-group :label="$t('subtaskCreation.verifiable')">
                <b-form-radio v-model="solutionverifiable" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                <b-form-radio v-model="solutionverifiable" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
            </b-form-group>

            <div v-if="solutionverifiable">
                <b-form-input v-model="solution" :placeholder="$t('subtaskCreation.solution')"></b-form-input>

                <b-form-group :label="$t('subtaskCreation.visible')">
                    <b-form-radio v-model="solutionvisible" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                    <b-form-radio v-model="solutionvisible" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                </b-form-group>
            </div>
        </div>

        <!-- displays options to create or update a subtask of the type MultipleChoiceTask.
       includes an area to input the task instructions,
       an area to input all possible answers for the multiple choice task
       a radio to choose whether a teachersolution should exists
       if a teacher solution should exist it also has:
       a display with all possible answers where the teacher can select the correct answers
       a radio to choose whether a student can compare its solution to the teacher solution-->

        <div v-else-if="tasktype === 'mc'">
            <b-form-input v-model="taskInstruction" :placeholder="$t('subtaskCreation.instruction')"></b-form-input>
            <b-form-input v-model="answerOption" :placeholder="$t('subtaskCreation.answerOption')"></b-form-input>
            <b-button @click="addAnswerOption(true)">{{$t('subtaskCreation.addAnswer')}} </b-button>

            <div>
                Antwortmöglichkeiten: {{answerOptionsText}}
            </div>

            <b-form-group :label="$t('subtaskCreation.verifiable')">
                <b-form-radio v-model="solutionverifiable" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                <b-form-radio v-model="solutionverifiable" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
            </b-form-group>

            <div v-if="solutionverifiable">
                {{$t('subtaskCreation.rightAnswers')}}
                <b-form-group>
                    <b-form-checkbox-group
                            v-model="selected"
                            :options="answerOptions"
                            stacked
                    ></b-form-checkbox-group>
                </b-form-group>


                <b-form-group :label="$t('subtaskCreation.solution')">
                    <b-form-radio v-model="solutionvisible" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                    <b-form-radio v-model="solutionvisible" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                </b-form-group>
            </div>
        </div>

        <!-- displays options to create or update a subtask of the type SqlTask.
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
            <b-form-input v-model="taskInstruction" :placeholder="$t('subtaskCreation.instruction')"></b-form-input>

            <b-form-group :label="$t('subtaskCreation.allowedSql')">
                <b-form-radio v-model="allowedSqlStatements"  :value='AllowedSqlStatements.NoRestriction'
                >{{$t('subtaskCreation.noRestriction')}}</b-form-radio>
                <b-form-radio v-model="allowedSqlStatements"  :value="AllowedSqlStatements.SelectStatements"
                >{{$t('subtaskCreation.select')}}</b-form-radio>
            </b-form-group>

            <b-form-group :label="$t('subtaskCreation.PandC')">
                <b-form-radio v-model="isPointAndClickAllowed" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                <b-form-radio v-model="isPointAndClickAllowed"  :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
            </b-form-group>

            <b-form-group :label="$t('subtaskCreation.verifiable')">
                <b-form-radio v-model="solutionverifiable" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                <b-form-radio v-model="solutionverifiable" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
            </b-form-group>

            <div v-if="solutionverifiable">
                <b-form-input v-model="solution" :placeholder="$t('subtaskCreation.solution')"></b-form-input>

                <b-form-group :label="$t('subtaskCreation.solution')">
                    <b-form-radio v-model="solutionvisible" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                    <b-form-radio v-model="solutionvisible" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                </b-form-group>

                <b-form-group v-if="solutionvisible" :label="$t('subtaskCreation.rowOrder')">
                    <b-form-radio v-model="doesRowOrderMatter"  :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                    <b-form-radio v-model="doesRowOrderMatter"  :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                </b-form-group>
            </div>

        </div>

        <b-button @click="saveSubtask">{{$t('subtaskCreation.save')}}</b-button>
        <b-button @click="deleteSubtask"> {{$t('subtaskCreation.delete')}}</b-button>
        <b-button @click="changeSize">{{$t('subtaskCreation.minimize')}}</b-button>

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
import {ResultSet} from "@/dataModel/ResultSet";
import SubtaskTypes from '@/dataModel/SubtaskTypes';
import SubtaskController from "@/controller/SubtaskController";
import {Prop, Component} from "vue-property-decorator";
import SQLExecutor from "@/controller/SQLExecutor";

@Component({

})
export default class SubtaskCreation extends Vue {
    /*
     subtask: either null (if a subtask is created) or a subtask if an existing subtask is edited
     subindex: indicates the index of the subtask in context of the task it belongs to
     dbId: the Id of the database assigned to the task, It's needed to create a solution for a sql subtask
     */
    @Prop() private dbId!: string;
    @Prop() private initialSubtask!: Subtask;

    private subtask = this.initialSubtask;

            // variables needed for the user interface or all tasks
    private showfull: boolean = true;
    private index: number = 0;
    private taskType: string = '';
    private typeOptions = [
                {value: '', text: this.$t('subtaskCreation.chooseType') as string},
                {value: 'inst', text: this.$t('subtaskCreation.typeInstructionExtra') as string},
                {value: 'text', text: this.$t('subtaskCreation.typePlainText') as string},
                {value: 'mc', text: this.$t('subtaskCreation.typeMultipleChoice') as string},
                {value: 'sql', text: this.$t('subtaskCreation.typeSql') as string},
            ];
    private subtaskController: SubtaskController = this.$store.getters.subtaskController;

            // variables needed for a subtask with a solution
    private solutionverifyable: boolean = false;
    private solutionvisible: boolean = false;

            // variables needed for a sql subtask or plaintexttask
    private queryResult: ResultSet = null as unknown as ResultSet;
    private sqlExecutor: SQLExecutor = this.$store.getters.sqlExecutor;
    private allowedSqlStatements: AllowedSqlStatements = AllowedSqlStatements.NoRestriction;
    private isPointAndClickAllowed: boolean = false;
    private doesRowOrderMatter: boolean = false;
    private solution: string = '';

            // variables specifically for a multiple choice subtask
    private selected: number[] = [];
    private answerOption: string =  '';
    private answerOptions: object[] = [];
    private answerOptionsText: string[]  = [];

    /*
     the created method does nothing if an empty subtask(Instruction task without id or instruction)
     is passed to the component. otherwise it updates the variables of
     the component to match the task it has been passed
     */
    public created() {
        this.subtaskController = this.$store.getters.subtaskController;
        this.subtask = this.initialSubtask;
    }


        /*
         method used in the creation of a multiple choice task
         adds the last entered answer of a multiple choice task to its array of all possible answers
         withText: determines whether answerOptionsText is updated as well. It needs to be updaten when a new
                      answer option is added but not when loading an existing subtask
         */
    public addAnswerOption(withText: boolean) {
            if (this.answerOption === '') {
                alert(this.$t('subtaskCreation.alertAnswerOption') as string);
                return;
            }
            this.answerOptions.push({text: this.answerOption, value: this.index});
            if (withText) {
                this.answerOptionsText.push(this.answerOption);
            }
            this.answerOption = '';
            this.index ++;

    }

    public saveSubtask() {
        this.subtaskController.save(this.subtask);
    }

        /*
         changes the value of the showfull variable. the method is used to minimize or maximize the subtask
         */
    public changeSize() {
        this.showfull = !this.showfull;
    }


        /*
        sends a request to delete the subtask to the server and emits the delete function to the task
        to delete the reference of the subtask
         */
    public deleteSubtask() {
        if (confirm(this.$t('subtaskCreation.alertDelete') as string)) {
            this.subtaskController.remove(this.subtask);
        }

    }
}
</script>

<style scoped>

</style>

