<template>
  <div>
    <DatabaseComponent elementId="sandbox-dropzone-db" ref="databaseComponent"
                       @databaseExists="eventDbExists" @reset="reset"></DatabaseComponent>
    <div v-if="databaseExists" :databaseExists:sync="databaseExists">
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
      <div id="queryRes"></div>
      <div v-if="queryResult">
        <p>
          {{$t('sandbox.resultText')}}({{queryResult.query}}):
        </p>
        <QueryResultComp :columns="queryResult.result.columns" :rows="queryResult.result.values"
        ></QueryResultComp>
      </div>


    </div>
  </div>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Query from '@/components/Query.vue';
import QueryResultComp from '@/components/QueryResult.vue';
import PointAndClick from '@/components/PointAndClick.vue';
import DatabaseComponent from '@/components/DatabaseComponent.vue';
import QueryResult from '@/dataModel/QueryResult';


@Component({
  components: {
    Query,
    QueryResultComp,
    PointAndClick,
    DatabaseComponent,
  },
})

export default class Sandbox extends Vue {

  /*
   private created() {
    if (this.database) {
      this.databaseExists = true;
    } else {
      this.databaseExists = false;
    }
  }
   private updated(){
      this.created();
  }
   */
  get database() {

    const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
    if (dbComponent) {
      return dbComponent.$data.database;
    } else {
      return null;
    }
  }


  // Computed Properties
  private get dynamicComponent() {
    if (this.isPointAndClickActive) {
      return PointAndClick;
    } else {
      return Query;
    }
  }

  // Data
  public isPointAndClickActive: boolean = false;
  public queryResult: QueryResult | null = null;
  private databaseExists: boolean = false;

  // Methods

  private executeQuery(query: string) {

    const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
    try {
      const dbNumber = dbComponent.$data.databaseNumber;
      this.queryResult = dbComponent.$data.sqlExecutor.executeQuery(dbNumber, query, 0);
      const top = document.getElementById('queryRes')!.offsetTop; // Getting Y of target element
      window.scrollTo(0, top + 200);
      dbComponent.loadMetaData();
    } catch (error) {
      alert(error.message);
      return;
    }

  }

  private eventDbExists(val: boolean) {
    this.databaseExists = val;
  }

  private reset() {
    this.queryResult = null;

  }

  private switchComponent() {
    this.isPointAndClickActive = !this.isPointAndClickActive;
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
