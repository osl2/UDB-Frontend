<template>
    <div>
        <div class="taskHeader">
            <h2>{{task.name}}</h2>
            <h3>{{$t('taskSolve.subtask')}} {{subtaskIndex+1}} {{$t('taskSolve.of')}} {{numberOfSubtasks}}</h3>
        </div>
        <div class="containerDatabase">
            <h3>{{$t('taskSolve.dbOverview')}}</h3>
            <DatabaseComponent :elementId="task.id" ref="databaseComponent"></DatabaseComponent>
        </div>
        <!--Loads the component that matches the type of the current Subtask -->
        <div v-if="typeOfSubtask()===1">
            <SqlTaskComp :currentSubtask="currentSubtask"
                         :solutions="solutions"
                         @save="saveSubtask"
                         @compare="$emit('compare', subtaskSolution)"
            >
            </SqlTaskComp>
        </div>
        <div v-else-if="typeOfSubtask()===2">
            <McTask :currentSubtask="currentSubtask"
                    :solutions="solutions"
                    @save="saveSubtask"
                    @compare="$emit('compare', subtaskSolution)"
            >
            </McTask>
        </div>
        <div v-else-if="typeOfSubtask()===3">
            <TextTask :currentSubtask="currentSubtask"
                      :solutions="solutions"
                      @save="saveSubtask"
                      @compare="$emit('compare', subtaskSolution)"
            >
            </TextTask>
        </div>
        <div v-else>
            <InstructionTaskComp :currentSubtask="currentSubtask"></InstructionTaskComp>
        </div>

        <!-- Buttons to navigate through one task-->
        <div>
            <b-button @click="$emit('prevSubtask')">{{$t('taskSolve.prevSubtask')}}</b-button>
            <b-button @click="$emit('nextSubtask')">{{$t('taskSolve.nextSubtask')}}</b-button>
        </div>
        <div class="clear"></div>

        <div>
            <b-button @click="$emit('switchback')">{{$t('taskSolve.toOverview')}}</b-button>

            <b-button class="btn" @click="$emit('reset')">{{$t('taskSolve.resetTask')}}</b-button>
        </div>
    </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
  import DatabaseComponent from "@/components/DatabaseComponent.vue";
  import SqlTaskComp from '@/components/SqlTaskComp.vue';
  import McTask from '@/components/McTask.vue';
  import TextTask from '@/components/TextTask.vue';
  import SubtaskTypes from "@/dataModel/SubtaskTypes";
  import Solution from "@/dataModel/Solution";
  import Task from "@/dataModel/Task";
  import Subtask from "@/dataModel/Subtask";
  import Database from "@/dataModel/Database";
  import InstructionTaskComp from "@/components/InstructionTaskComp.vue";


  @Component({
  components: {
    SqlTaskComp,
    McTask,
    TextTask,
    InstructionTaskComp,
    DatabaseComponent,
  },
  })
export default class TaskSolve extends Vue {

    @Prop() private task!: Task;
    @Prop() private currentSubtask!: Subtask;
    @Prop() private solutions!: Map<string, Solution>;
    @Prop() private subtaskIndex!: number;
    @Prop() private numberOfSubtasks!: number;
    @Prop() private database!: Database;


    @Watch('database')
    public onDatabaseChange(value: Database, oldValue: Database) {
      if ((value !== oldValue)) {
        this.initDatabase();
        return;
      }
    }

      /*
       * Calls the methods save in StudentWorksheet.vue
       */
   public saveSubtask(solution: Solution): void {
        this.$emit('save', this.currentSubtask.id, solution);
      }

      /*
       * opens the database provided through props
       */
      public initDatabase() {
          const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
          dbComponent.postInit(Promise.resolve(this.database));
      }

    private typeOfSubtask(): number {
          if (this.currentSubtask.type === SubtaskTypes.Sql) {
              return 1;
          } else if (this.currentSubtask.type === SubtaskTypes.MultipleChoice) {
              return 2;
          } else if (this.currentSubtask.type === SubtaskTypes.PlainText) {
              return 3;
          } else { // Instruction Task
              return 4;
          }

      }



}
</script>

<style scoped>
    .taskHeader {
        padding-top: 15px;
        padding-bottom: 15px;
        margin-bottom: 35px;
        text-align: center;
        background-color: #17a2b8;
        color: white;
    }
    .containerDatabase {
        margin-bottom: 20px;
    }

</style>
