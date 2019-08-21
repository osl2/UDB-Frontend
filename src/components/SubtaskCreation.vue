import SubtaskTypes from "@/dataModel/SubtaskTypes";
<template>
    <div>
        <!--Minimized variant, showing only the type of the subtask
             to make the site less cluttered when creating or editing several subtasks -->
        <div>
            <b-card>
                <div v-if="subtask.type === 3" class="border-dark">
                    <!-- displays options to create or update a subtask of the type instruction task.
                         it has an area to input the task instruction-->
                    <p>{{$t('subtaskCreation.typeInstruction')}}
                    <b-button @click="changeSize()">{{$t('subtaskCreation.maximize')}}</b-button></p>

                    <div v-if="showfull">
                        <b-form-input v-model="subtask.instruction" :placeholder="$t('subtaskCreation.instruction')"></b-form-input>
                    </div>
                </div>
                <div v-else-if="subtask.type === 2" class="border-dark">
                    <!-- displays options to create or update a subtask of the type PlainTextTask.
                        it has an area to input the task instructions,
                        a radio to choose whether a teachersolution should exists.
                        if a teacher solution should exist it also has:
                        an area to input the teacher solution, can be a simple text or a regex
                        a radio to choose whether a student can compare its solution to the teacher solution-->
                    <p>{{$t('subtaskCreation.typePlainText')}}
                    <b-button @click="changeSize()">{{$t('subtaskCreation.maximize')}}</b-button></p>

                    <div v-if="showfull">
                        <b-form-input v-model="subtask.instruction" :placeholder="$t('subtaskCreation.instruction')"></b-form-input>
                        <b-form-group :label="$t('subtaskCreation.verifiable')">
                            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                        </b-form-group>

                        <div v-if="subtask.isSolutionVeryfiable">
                            <b-form-input v-model="subtask.solution.text" :placeholder="$t('subtaskCreation.solution')"></b-form-input>

                            <b-form-group :label="$t('subtaskCreation.visible')">
                                <b-form-radio v-model="subtask.isSolutionVisible" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                                <b-form-radio v-model="subtask.isSolutionVisible" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                            </b-form-group>
                        </div>
                    </div>
                </div>
                <div v-else-if="subtask.type === 1" class="border-dark p-2">
                    <!-- displays options to create or update a subtask of the type MultipleChoiceTask.
                       includes an area to input the task instructions,
                       an area to input all possible answers for the multiple choice task
                       a radio to choose whether a teachersolution should exists
                       if a teacher solution should exist it also has:
                       a display with all possible answers where the teacher can select the correct answers
                       a radio to choose whether a student can compare its solution to the teacher solution-->
                    <p>{{$t('subtaskCreation.typeMultipleChoice')}}
                    <b-button @click="changeSize()">{{$t('subtaskCreation.maximize')}}</b-button></p>

                    <div v-if="showfull">
                        <b-form-input v-model="subtask.instruction" :placeholder="$t('subtaskCreation.instruction')"></b-form-input>
                        <b-form-input v-model="answerOption" :placeholder="$t('subtaskCreation.answerOption')"></b-form-input>
                        <b-button @click="addAnswerOption(true)">{{$t('subtaskCreation.addAnswer')}} </b-button>

                        <div>
                            <p v-for="answerOption in answerOptions" class="bg-secondary text-light p-1 m-1 w-50">
                                {{answerOption.text}}
                                <b-button @click="removeAnswerOption(answerOption.index)" class="bg-light text-dark">x</b-button>
                            </p>
                        </div>

                        <b-form-group :label="$t('subtaskCreation.verifiable')">
                            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                        </b-form-group>

                        <div v-if="subtask.isSolutionVeryfiable">
                            {{$t('subtaskCreation.rightAnswers')}}
                            <b-form-group>
                                <b-form-checkbox-group
                                        v-model="selected"
                                        :options="answerOptions"
                                        stacked
                                ></b-form-checkbox-group>
                            </b-form-group>


                            <b-form-group :label="$t('subtaskCreation.solution')">
                                <b-form-radio v-model="subtask.isSolutionVisible" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                                <b-form-radio v-model="subtask.isSolutionVisible" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                            </b-form-group>
                        </div>
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
                <div v-else-if="subtask.type === 0"  class="border-dark p-2">
                    <p>{{$t('subtaskCreation.typeSql')}}
                    <b-button @click="changeSize">{{$t('subtaskCreation.maximize')}}</b-button></p>

                    <div v-if="showfull">
                        <b-form-input v-model="subtask.instruction" :placeholder="$t('subtaskCreation.instruction')"></b-form-input>

                        <b-form-group :label="$t('subtaskCreation.allowedSql')">
                            <b-form-radio v-model="subtask.allowedSqlStatements" :value='0'
                            >{{$t('subtaskCreation.noRestriction')}}</b-form-radio>
                            <b-form-radio v-model="subtask.allowedSqlStatements" :value="1"
                            >{{$t('subtaskCreation.select')}}</b-form-radio>
                        </b-form-group>

                        <b-form-group :label="$t('subtaskCreation.PandC')">
                            <b-form-radio v-model="subtask.isPointAndClickAllowed" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                            <b-form-radio v-model="subtask.isPointAndClickAllowed"  :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                        </b-form-group>

                        <b-form-group :label="$t('subtaskCreation.verifiable')">
                            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                            <b-form-radio v-model="subtask.isSolutionVeryfiable" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                        </b-form-group>

                        <div v-if="subtask.isSolutionVeryfiable">
                            <b-form-input v-model="subtask.solution.querySolution" :placeholder="$t('subtaskCreation.solution')"></b-form-input>

                            <b-form-group :label="$t('subtaskCreation.solution')">
                                <b-form-radio v-model="subtask.isSolutionVisible" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                                <b-form-radio v-model="subtask.isSolutionVisible" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                            </b-form-group>

                            <b-form-group v-if="subtask.isSolutionVisible" :label="$t('subtaskCreation.rowOrder')">
                                <b-form-radio v-model="subtask.doesRowOrderMatter" :value="true">{{$t('subtaskCreation.yes')}}</b-form-radio>
                                <b-form-radio v-model="subtask.doesRowOrderMatter" :value="false">{{$t('subtaskCreation.no')}}</b-form-radio>
                            </b-form-group>
                        </div>
                    </div>
                </div>
                <div>
                    <b-button @click="saveSubtask" class="bg-info">{{$t('subtaskCreation.save')}}</b-button>
                    <b-button @click="deleteSubtask" class="bg-danger"> {{$t('subtaskCreation.delete')}}</b-button>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import InstructionTask from "@/dataModel/InstructionTask";
  import Subtask from '@/dataModel/Subtask';
  import AllowedSqlStatements from "@/dataModel/AllowedSqlStatements";
  import {ResultSet} from "@/dataModel/ResultSet";
  import SubtaskTypes from '@/dataModel/SubtaskTypes';
  import SubtaskController from "@/controller/SubtaskController";
  import {Component, Prop} from "vue-property-decorator";
  import SQLExecutor from "@/controller/SQLExecutor";
  import MultipleChoiceTask from "@/dataModel/MultipleChoiceTask";
  import MultipleChoiceSolution from "@/dataModel/MultipleChoiceSolution";

  @Component({

})
export default class SubtaskCreation extends Vue {

    @Prop() private initialSubtask!: Subtask;
    @Prop() private eventBus!: Vue;

    private subtask = new InstructionTask("", "Error");

            // variables needed for the user interface or all tasks
    private showfull = true;
    private index: number = 0;
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

    get typeOptions() {
      return [
        {value: '', text: this.$t('subtaskCreation.chooseType') as string},
        {value: 'inst', text: this.$t('subtaskCreation.typeInstructionExtra') as string},
        {value: 'text', text: this.$t('subtaskCreation.typePlainText') as string},
        {value: 'mc', text: this.$t('subtaskCreation.typeMultipleChoice') as string},
        {value: 'sql', text: this.$t('subtaskCreation.typeSql') as string},
      ];
    }

    /*
     the created method sets the attribute subtask to the given initial subtask. It's a new attribute
     because Props are readonly
     */
    public created() {
      this.eventBus.$on('save', this.saveSubtask);
        this.subtaskController = this.$store.getters.subtaskController;
        this.subtask = this.initialSubtask;
    }

        /*
         method used in the creation of a multiple choice task
         adds the last entered answer of a multiple choice task to its array of all possible answers
         */
    public addAnswerOption(withText: boolean) {
            if (this.answerOption === '') {
                alert(this.$t('subtaskCreation.alertAnswerOption') as string);
                return;
            }
            this.answerOptions.push({text: this.answerOption, index: this.index});
            this.answerOption = '';
            this.index ++;
    }

    public removeAnswerOption(index: number) {
      this.answerOptions.filter((answerOption: any) => {
        return answerOption.index !== index;
      });
    }

    public saveSubtask() {
      Vue.nextTick(() => {
        if (this.subtask.type === SubtaskTypes.MultipleChoice) {
          (this.subtask as MultipleChoiceTask).answerOptions = this.answerOptions
            .map((answerOption: any) => answerOption.text);
          ((this.subtask as MultipleChoiceTask).solution as MultipleChoiceSolution).choices = this.selected;
        }
        this.subtaskController.save(this.subtask).then(()=> {
          this.$emit('updateSubtasks');
          // TODO Sprache auslagern
          alert("Speichern der Teilaufgabe erfolgreich")
          // TODO catchen
        }).catch(() => {});
      });
    }

    /*
     changes the value of the showfull variable. the method is used to minimize or maximize the subtask
     */
    public changeSize() {
        this.showfull = !this.showfull;
    }

    /*
     calls the method deleteTask in TeacherWorksheet.vue to send a delete request to the server and delete it in
     the data of the component.
     */
    public deleteSubtask() {
        if (confirm(this.$t('subtaskCreation.alertDelete') as string)) {
          this.$emit('delete', this.subtask);
        }

    }
}
</script>

<style scoped>

</style>

