<template>
  <div class="top20">
    <b-alert v-model="errorMsg" v-if="errorMsg != ''" variant="danger" dismissible>{{errorMsg}}</b-alert>

    <div :id="elementId" class="card" :class="cursorClickable">

      <div v-if="!database || !database.content" :database:sync="database"
           class="card-body"
           @dragover.prevent
           @drop="dropHandler"
           @click="clickHandler"
           @dragover="setBackgroundColor"
           @dragenter="setBackgroundColor"
           @dragleave="removeBackgroundColor"
      >
        <div class="row justify-content-center">
          <div class="col-sm-2">
            <font-awesome-icon icon="upload" :style="{color: 'rgba(159,162,168,0.57)' } " size="4x"/>
          </div>
          <div class="col-sm-6 ">

            <p class="text-muted">{{$t('database.dropDatabase')}}</p>
          </div>
          <input :id="elementId+'dbFile'" type="file" name="image" @change="changeHandler">
        </div>
      </div>
      <div v-else="database.content" class="card-body" :database:sync="database">

        <div class="d-flex flex-row flex-nowrap" :tableMetaData:sync="tableMetaData">
          <DatabaseTable :tableName="tableMeta.tableName" :columns="tableMeta.columns"
                         v-for="tableMeta in tableMetaData"></DatabaseTable>

        </div>

      </div>
    </div>

    <div v-if="!database || !database.content" :database:sync="database">

      Noch keine Datenbank zur Hand? Dann erstelle eine <a href="#" @click="createEmptyDatabase">leere
      Datenbank</a>
      oder starte mit einem <a href="#" @click="createExampleDatabase">Beipsiel Datenbank</a>.


    </div>
    <div v-if="database && database.content" :database:sync="database">

      <a href="#" @click="downloadDatabase">Datenbank herunterladen</a> oder <a href="#" @click="reset">Zurücksetzen</a>.


    </div>

  </div>
</template>

<script lang="ts">
  /**
   * This component should make possible to load, save and display table structure of the database
   */
  import {Prop, Vue} from 'vue-property-decorator';
  import Component from 'vue-class-component';
  import Database from '@/dataModel/Database';
  import DatabaseTable from '@/components/DatabaseTable.vue';
  import TableMetaData from '@/dataModel/TableDataModel';
  import SQLExecutor from "@/controller/SQLExecutor";
  import DatabaseController from "@/controller/DatabaseController";


  @Component({
    components: {DatabaseTable},
  })
  export default class DatabaseComponent extends Vue {

    public database: Database = new Database('', '', null);

    public tableMetaData: TableMetaData[] = [];
    private errorMsg: string = '';

    @Prop() private elementId!: string;
    private isSomethingUploaded: boolean = false;

    get cursorClickable() {
      return !this.database || !this.database.content ? 'cursorClickable' : '';
    }

    private sqlExecutor = new SQLExecutor();
    private databaseController = new DatabaseController(this.$store.getters.api);
    private databaseNumber: number = 0;

    public clickHandler(event: MouseEvent) {
      document.getElementById(this.elementId + 'dbFile')!.click();
    }


    private dropHandler(event: DragEvent): void {
      const files = event.dataTransfer!.files;
      this.initDatabase(files[0]);
      event.stopPropagation();
      event.preventDefault();
    }

    private setBackgroundColor(): void {
      document.getElementById(this.elementId)!.style.backgroundColor = '#DDDDDD';
    }

    private removeBackgroundColor(): void {
      document.getElementById(this.elementId)!.style.backgroundColor = '';
    }

    private changeHandler(event: Event) {
      // we need to tell typescript and tslint checker that we are working with file input HTMLInputElement
      // for this there are no standards yet
      const target = event.target as (HTMLInputElement & Event);
      const files = target!.files!;
      this.initDatabase(files[0]);
    }

    private createEmptyDatabase() {
    }

    private createExampleDatabase() {

    }

    private downloadDatabase() {
      this.databaseController.exportObject(this.database);
    }


    private initDatabase(file: File) {
      const db = this.databaseController.importObject(file);
      db.then(database => {
        this.database = database;
        this.sqlExecutor.open(database).then((dbIndex: number) => {
          this.databaseNumber = dbIndex;
          this.loadMetaData();
        });
        this.isSomethingUploaded = true;
        this.removeBackgroundColor();
      });

    }

    private loadMetaData() {
      const results = this.sqlExecutor.executeQuery(this.databaseNumber,
        'SELECT name FROM sqlite_master WHERE type = \'table\' ORDER BY name;', 0);
      for (const result of results.result.values) {
        // its no me, its on maintainers of sql.js or typescript module generation
        // the imported module says ValueType = number | string | Uint8Array;
        // but debugging gives an string[]. Therefore, we need to make this unclean typecasts
        const tableNames = result as unknown as string[];
        for (const tableName of tableNames) {
          const columnsResults = this.sqlExecutor.executeQuery(this.databaseNumber, 'PRAGMA table_info(' + tableName + ');', 0);
          const columns: string[] = [];
          if (columnsResults.result.values) {
            columnsResults.result.values.forEach((row: any) => {
              const columnName = row[1] as string;
              const columnType = row[2] as string;
              columns.push(columnName + ': ' + columnType);
            });
          }
          this.tableMetaData.push(new TableMetaData(tableName, columns));
        }
      }
    }

    private reset() {
      this.database = new Database('', '', null);
    }

  }
</script>

<style scoped lang="scss">
  .top20 {
    margin-top: 3%;
  }

  .card-body {
    overflow-x: auto;
  }


  input[type="file"] {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

  .cursorClickable {
    cursor: pointer;
  }

  .card-body {
    overflow-x: auto;
  }
</style>
