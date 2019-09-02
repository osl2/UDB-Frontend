<template>
    <div class="subtask">
        <div class="subtask-drag-handle">
            <font-awesome-icon icon="arrows-alt-v"></font-awesome-icon>
        </div>
        <div class="subtask-index">
            {{ subIndex }}
        </div>
        <div v-if="subtask.type === 3" class="subtask-content">
            <!-- INSTRUCTION SUBTASK -->
            <b-button v-b-toggle="'subtask-' + subtask.id" squared block variant="secondary">
                {{ $t('subtaskCreation.typeInstruction') }}
                <font-awesome-icon icon="angle-down"></font-awesome-icon>
            </b-button>
            <b-collapse :id="'subtask-' + subtask.id">
                <b-form-textarea
                    v-model="subtask.instruction"
                    :placeholder="$t('subtaskCreation.instruction')"
                ></b-form-textarea>
            </b-collapse>
        </div>
        <div v-else-if="subtask.type === 2" class="subtask-content">
            <!-- PLAINTEXT SUBTASK -->
            <!-- displays options to create or update a subtask of the type PlainTextTask.
            it has an area to input the task instructions,
            a radio to choose whether a teachersolution should exists.
            if a teacher solution should exist it also has:
            an area to input the teacher solution, can be a simple text or a regex
            a radio to choose whether a student can compare its solution to the teacher solution-->
            <b-button v-b-toggle="'subtask-' + subtask.id" squared block variant="secondary">
                {{ $t('subtaskCreation.typePlainText') }}
                <font-awesome-icon icon="angle-down"></font-awesome-icon>
            </b-button>
            <b-collapse :id="'subtask-' + subtask.id">
                <SubtaskEditText v-model="subtask"></SubtaskEditText>
            </b-collapse>
        </div>
        <div v-else-if="subtask.type === 1" class="subtask-content">
            <!-- MULTIPLE CHOICE SUBTASK -->
            <!-- displays options to create or update a subtask of the type MultipleChoiceTask.
           includes an area to input the task instructions,
           an area to input all possible answers for the multiple choice task
           a radio to choose whether a teachersolution should exists
           if a teacher solution should exist it also has:
           a display with all possible answers where the teacher can select the correct answers
           a radio to choose whether a student can compare its solution to the teacher solution-->
            <b-button v-b-toggle="'subtask-' + subtask.id" squared block variant="secondary">
                {{ $t('subtaskCreation.typeMultipleChoice') }}
                <font-awesome-icon icon="angle-down"></font-awesome-icon>
            </b-button>
            <b-collapse :id="'subtask-' + subtask.id">
                <SubtaskEditMC v-model="subtask"></SubtaskEditMC>
            </b-collapse>
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
        <div v-else-if="subtask.type === 0" class="subtask-content">
            <b-button v-b-toggle="'subtask-' + subtask.id" squared block variant="secondary">
                {{ $t('subtaskCreation.typeSql') }}
                <font-awesome-icon icon="angle-down"></font-awesome-icon>
            </b-button>
            <b-collapse :id="'subtask-' + subtask.id">
                <SubtaskEditSql
                    v-model="subtask"
                    database="database"
                    :result-bus="resultBus"
                    @executeQuery="executeQuery"
                ></SubtaskEditSql>
            </b-collapse>
        </div>
        <div>
            <b-button squared variant="danger" @click="deleteSubtask">
                <font-awesome-icon icon="trash"></font-awesome-icon>
            </b-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InstructionTask from '@/dataModel/InstructionTask';
import Subtask from '@/dataModel/Subtask';
import SubtaskController from '@/controller/SubtaskController';
import { Component, Prop } from 'vue-property-decorator';
import SQLExecutor from '@/controller/SQLExecutor';
import SubtaskEditSql from '@/components/SubtaskEditSql.vue';
import Database from '@/dataModel/Database';
import SubtaskEditMC from '@/components/SubtaskEditMC.vue';
import SubtaskEditText from '@/components/SubtaskEditText.vue';

@Component({
    components: {
        SubtaskEditSql,
        SubtaskEditMC,
        SubtaskEditText,
    },
})
export default class SubtaskEdit extends Vue {
    @Prop() private initialSubtask!: Subtask;
    @Prop() private eventBus!: Vue; // bus to receive save()-command
    @Prop() private resultBus!: Vue; // bus to send result of sql query to sql-subtask-component
    @Prop() private index!: number;
    @Prop() private database!: Database;

    private subtask = new InstructionTask('', 'Error');

    private subtaskController: SubtaskController = this.$store.getters.subtaskController;
    private sqlExecutor: SQLExecutor = this.$store.getters.sqlExecutor;

    get subIndex() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        return alphabet.charAt(this.index % alphabet.length) + ')';
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

    public saveSubtask() {
        Vue.nextTick(() => {
            this.subtaskController
                .save(this.subtask)
                .then()
                .catch(error => {
                    switch (error.status) {
                        case 500:
                            alert(this.$t('apiError.server500') as string);
                            break;
                        default:
                            alert(this.$t('apiError.defaultMsg') as string);
                            break;
                    }
                });
        });
    }

    public executeQuery(query: string) {
        this.$emit('executeQuery', query, this.subtask.id);
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
.subtask {
    background-color: white;
    box-shadow: 3px 3px 9px 0 rgba(140, 140, 140, 0.37);
    display: flex;
    border-top: black solid 1px;
}
.subtask-drag-handle {
    background-color: lightgray;
    padding: 6px 12px;
}
.subtask-index {
    background-color: #6c757d;
    color: white;
    padding: 6px 12px;
    max-height: 38px;
}
.subtask-content {
    flex-grow: 1;
}
</style>
