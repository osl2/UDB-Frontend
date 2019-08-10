<template>
  <div class="top20">
    <b-alert v-model="errorMsg" v-if="errorMsg !== ''" variant="danger" dismissible>{{errorMsg}}</b-alert>

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
          <input :id="elementId+'dbFile'" type="file" @change="changeHandler">
        </div>
      </div>
      <div v-else="database.content" class="card-body" :database:sync="database">

        <div v-if="tableMetaData.length > 0" class="d-flex flex-row flex-nowrap" :tableMetaData:sync="tableMetaData">
          <DatabaseTable :tableName="tableMeta.tableName" :columns="tableMeta.columns"
                         v-for="tableMeta in tableMetaData" :key="tableMeta.tableName"></DatabaseTable>

        </div>
        <div v-else class="d-flex flex-row flex-nowrap" :tableMetaData:sync="tableMetaData">
          <p class="text-muted">Datenbank enthält noch keine Tabellen</p>

        </div>

      </div>
    </div>

    <div v-if="showExportImport">
      <div v-if="!database || !database.content" :database:sync="database">

        Noch keine Datenbank zur Hand? Dann erstelle eine <a href="#" @click="createEmptyDatabase">leere
        Datenbank</a>
        oder starte mit einem <a href="#" @click="createExampleDatabase">Beispiel Datenbank</a>.


      </div>
      <div v-if="database && database.content" :database:sync="database">

        <a href="#" @click="downloadDatabase">Datenbank herunterladen</a> oder <a href="#"
                                                                                  @click="reset">Zurücksetzen</a>.


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


  @Component({
    components: {DatabaseTable},
  })
  export default class DatabaseComponent extends Vue {

    get cursorClickable() {
      return !this.database || !this.database.content ? 'cursorClickable' : '';
    }

    public database: Database = new Database('', '', null);
    public sqlExecutor: SQLExecutor = this.$store.getters.sqlExecutor;
    public databaseNumber: number = 0;

    public tableMetaData: TableMetaData[] = [];
    private errorMsg: string = '';

    @Prop() private elementId!: string;

    @Prop() private showExportImport!: boolean;

    private databaseController = new DatabaseController(this.$store.getters.api);


    public clickHandler() {
      document.getElementById(this.elementId + 'dbFile')!.click();
    }

    public loadMetaData() {
      this.tableMetaData = [];
      const results = this.sqlExecutor.executeQuery(this.databaseNumber,
        'SELECT name FROM sqlite_master WHERE type = \'table\' ORDER BY name;', 0);
      for (const result of results.result.values) {
        // its no me, its on maintainers of sql.js or typescript module generation
        // the imported module says ValueType = number | string | Uint8Array;
        // but debugging gives an string[]. Therefore, we need to make this unclean typecasts
        const tableNames = result as unknown as string[];
        for (const tableName of tableNames) {
          const columnsResults = this.sqlExecutor.executeQuery(
            this.databaseNumber,
            'PRAGMA table_info(' + tableName + ');',
            0);
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

    public updated() {
      this.$emit('databaseExists', this.database.content !== null);
    }

    public postInit(db: Promise<Database>) {
      db.then((database) => {
        this.database = database;
        this.sqlExecutor.open(database).then((dbIndex: number) => {
          this.databaseNumber = dbIndex;
          this.loadMetaData();
        }).catch((e) => {
          this.errorMsg = e.message;
          this.reset();
        });
        this.removeBackgroundColor();
      });
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
      const db = this.databaseController.createEmptyDatabase('meineDatenbank');
      this.postInit(db);
    }

    private createExampleDatabase() {
      const db = this.databaseController.createEmptyDatabase('angestellte');
      // TODO: these constant need to be moved somewhere else, TBD
      const createTableSQL = `
      DROP TABLE IF EXISTS angestellte;
CREATE TABLE angestellte( id          integer,  name    text,
                          job text,     anzahl_angestellte integer,
                          einstellungsdatum    date,     gehalt  integer);

  INSERT INTO angestellte VALUES (1,'JOHNSON','ADMIN',6,'1990-12-17',18000);
  INSERT INTO angestellte VALUES (2,'HARDING','MANAGER',9,'1998-02-02',52000);
  INSERT INTO angestellte VALUES (3,'TAFT','SALES I',2,'1996-01-02',25000);
  INSERT INTO angestellte VALUES (4,'HOOVER','SALES I',2,'1990-04-02',27000);
  INSERT INTO angestellte VALUES (5,'LINCOLN','TECH',6,'1994-06-23',22500);
  INSERT INTO angestellte VALUES (6,'GARFIELD','MANAGER',9,'1993-05-01',54000);
  INSERT INTO angestellte VALUES (7,'POLK','TECH',6,'1997-09-22',25000);
  INSERT INTO angestellte VALUES (8,'GRANT','ENGINEER',10,'1997-03-30',32000);
  INSERT INTO angestellte VALUES (9,'JACKSON','CEO',NULL,'1990-01-01',75000);
  INSERT INTO angestellte VALUES (10,'FILLMORE','MANAGER',9,'1994-08-09',56000);
  INSERT INTO angestellte VALUES (11,'ADAMS','ENGINEER',10,'1996-03-15',34000);
  INSERT INTO angestellte VALUES (12,'WASHINGTON','ADMIN',6,'1998-04-16',18000);
  INSERT INTO angestellte VALUES (13,'MONROE','ENGINEER',10,'2000-12-03',30000);
  INSERT INTO angestellte VALUES (14,'ROOSEVELT','CPA',9,'1995-10-12',35000);
      `;

      db.then((database) => {
        this.database = database;
        this.sqlExecutor.open(database).then((dbIndex: number) => {
          this.databaseNumber = dbIndex;
          this.sqlExecutor.executeQuery(this.databaseNumber, createTableSQL, 0);
          this.loadMetaData();
        }).catch((e) => {
          this.errorMsg = e.message;
          this.reset();
        });
        this.removeBackgroundColor();
      });


    }

    private downloadDatabase() {
      this.databaseController.exportObject(this.database);
    }


    private initDatabase(file: File) {
      this.errorMsg = '';
      const db = this.databaseController.importObject(file);
      this.postInit(db);
    }


    private reset() {
      this.database = new Database('', '', null);
      this.tableMetaData = [];
      this.sqlExecutor.close(this.databaseNumber);
      this.$emit('reset');
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
