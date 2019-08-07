<template>
    <div class="top20">
        <div :id="elementId" class="card"


             :class="cursorClickable">

            <div v-if="!isSomethingUploaded" :database:sync="database"
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
                        <p class="text-muted">{{$t('database.createDatabase')}}</p>
                    </div>
                    <input :id="elementId+'dbFile'" type="file" name="image" @change="changeHandler">
                </div>
            </div>
            <div v-else-if="isSomethingUploaded" class="card-body" :database:sync="database">
                <div class="d-flex flex-row flex-nowrap">
                    <DatabaseTable :tableName="tableMeta.tableName" :columns="tableMeta.columns" v-for="tableMeta in tableMetaData"></DatabaseTable>
                </div>
            </div>
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
  import QueryResult from "@/dataModel/QueryResult";



  @Component({
    components: {DatabaseTable},
  })
  export default class DatabaseComponent extends Vue {

    public database: Database = new Database('', '', new Uint8Array());
    private isSomethingUploaded: boolean = false;

    private resultsForShowingDatabase: QueryResult =
      {query: '', result: {status: 0, message: "", columns: [], values: [[]],}};
    private columnResults: QueryResult =
      {query: '', result: {status: 0, message: "", columns: [], values: [[]],}};

    @Prop() private elementId!: string;
    @Prop() private activateUpload!: boolean;
    @Prop() private activateDownload!: boolean;

    get cursorClickable() {
      return !this.database || !this.database.content ? 'cursorClickable' : '';
    }
    private sqlExecutor = new SQLExecutor();
    private databaseController = new DatabaseController(this.$store.getters.api);
    private databaseNumber!: number;


    // Ich habe diese Methode sehr auseinander genommen, sie tut bestimmt nicht mehr, was sie mal sollte.
    // Das ganze scheitert aber schon viel früher (s. initDatabase-Methode)
    get tableMetaData(): TableMetaData[] {
      const tableMetaData: TableMetaData[] = [];
      for (const result of this.resultsForShowingDatabase.result.columns) {
        // its no me, its on maintainers of sql.js or typescript module generation
        // the imported module says ValueType = number | string | Uint8Array;
        // but debugging gives an string[]. Therefore, we need to make this unclean typecasts
        const tableName = result as unknown as string[];
        const columns: string[] = [];
        if (this.columnResults.result.values) {
          this.columnResults.result.values.forEach((row: any) => {
            const columnName = row[1] as string;
            const columnType = row[2] as string;
            columns.push(columnName + ': ' + columnType);
          });
        }
        tableMetaData.push(new TableMetaData(tableName[0], columns));
      }

      return tableMetaData;
    }

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

    private initDatabase(file: File) {
      this.database = this.databaseController.importObject(file);
      this.sqlExecutor.open(this.database).then((db:number) => {
        this.databaseNumber = db;
        this.loadMetaData();
      });
      this.isSomethingUploaded = true;
      this.removeBackgroundColor();
    }

    private loadMetaData(){
      this.sqlExecutor.executeQuery(this.databaseNumber,
        'SELECT name FROM sqlite_master WHERE type = \'table\' ORDER BY name;', 0).then((res: QueryResult) => {
        this.resultsForShowingDatabase = res;
        alert('ich werde ausgeführt');
        // von der ursprünglichen schleiche übernommen, müsste überarbeitet werden,
        // wird aber schon gar nicht mehr ausgeführt. (bekomme keinen Alert angezeigt)
        for (const result of res.result.columns) {
          // its no me, its on maintainers of sql.js or typescript module generation
          // the imported module says ValueType = number | string | Uint8Array;
          // but debugging gives an string[]. Therefore, we need to make this unclean typecasts
          const tableName = result as unknown as string[];
          this.sqlExecutor
            .executeQuery(this.databaseNumber,'PRAGMA table_info(' + tableName[0] + ');', 0).then((res: QueryResult) => {
            this.columnResults = res;
          });
        }
      });
    }

  }
</script>

<style scoped lang="scss">
    .top20 {
        margin-top: 3%;
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
