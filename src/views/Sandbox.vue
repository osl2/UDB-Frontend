<template>
    <div>
        <DatabaseComponent elementId="sandbox-dropzone-db" ref="databaseComponent"></DatabaseComponent>
        <div class="switchButton">
            <b-button v-on:click="switchComponent"
                      v-if="isPointAndClickActive">
                {{$t('sandbox.switchToPlainSQL')}}
            </b-button>
            <b-button v-on:click="switchComponent"
                      v-else>
                {{$t('sandbox.switchToPointAndClick')}}
            </b-button>
        </div>
        <div class="clear">
            <component class="sqlComponent"
                       :is="dynamicComponent"
                       @executeQuery="executeQuery"
            ></component>
        </div>
        <div>
            <p v-show="gotFirstQueryExecuted">
                {{$t('sandbox.resultText')}}({{lastQueryExecuted}}):
            </p>
            <QueryResult :queryResult="queryResult"
                         v-show="gotFirstQueryExecuted"
            ></QueryResult>
        </div>
        <Test></Test>
    </div>
</template>


<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import Query from '@/components/Query.vue';
import QueryResult from '@/components/QueryResult.vue';
import PointAndClick from '@/components/PointAndClick.vue';
import DatabaseComponent from '@/components/DatabaseComponent.vue';

@Component({
  components: {
    Query,
    QueryResult,
    PointAndClick,
    DatabaseComponent,
  },
})

export default class Sandbox extends Vue {

  // Data
  public isPointAndClickActive: boolean = false;
  public gotFirstQueryExecuted: boolean = false;
  public lastQueryExecuted: string = '';
  // TODO Array nicht hard coden
  public queryResult: object[] = [
    {Name: 'Schmidt', Vorname: 'Anna', Alter: 50},
    {Name: 'Müller', Vorname: 'Herbert', Alter: 29},
  ];

  // Methods

  private executeQuery(query: string) {

    const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
    try {
      this.queryResult = dbComponent.$data.database.content.exec(query);
    } catch(error) {
      alert(error.message);
      return;
    }
    this.gotFirstQueryExecuted = true;
    this.lastQueryExecuted = query;

  }
  private switchComponent() {
    this.isPointAndClickActive = !this.isPointAndClickActive;
  }


    // Computed Properties
  private get dynamicComponent() {
      if (this.isPointAndClickActive) {
        return PointAndClick;
      } else {
        return Query;
      }
    }


}
</script>

<style scoped>
    .container {
        width: 80%;
        margin: auto;
    }

    .switchButton {
        float: right;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .sqlComponent {
        position: relative;
        margin-bottom: 15px;
    }


</style>
<!-- TODO auslagern in globales CSS sheet -->
<style>
    .clear {
        clear: both;
    }
</style>
