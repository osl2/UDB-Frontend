<template>
    <div class="top20">
        <div :id="elementId" class="card"


             :class="cursorClickable">

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

                        <p class="text-muted">Lege ein Datenbank Datei hier ab oder klicke um eine Datei
                            auszufwählen</p>
                        <p class="text-muted">Falls Du noch keine Datenbank Datei hast, dann erstelle hier ein
                            leeres.</p>
                    </div>
                    <input :id="elementId+'dbFile'" type="file" name="image" @change="changeHandler">
                </div>
            </div>
            <div v-else="database.content" class="card-body" :database:sync="database">
                <div class="row" v-for="tableMeta in tableMetaData">
                    <DatabaseTable :tableName="tableMeta.tableName" :columns="tableMeta.columns"></DatabaseTable>
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
  import DatabaseUtils from '@/services/DatabaseUtils';
  import DatabaseTable from '@/components/DatabaseTable.vue';
  import {SqlJs} from 'sql.js/module';
  import TableMetaData from '@/dataModel/TableDataModel';
  import QueryResults = SqlJs.QueryResults;


  @Component({
    components: {DatabaseTable},
  })
  export default class DatabaseComponent extends Vue {

    public database: Database = new Database('', '', null);

    @Prop() private elementId!: string;
    @Prop() private activateUpload!: boolean;
    @Prop() private activateDownload!: boolean;

    get cursorClickable() {
      return !this.database || !this.database.content ? 'cursorClickable' : '';
    }


    get tableMetaData(): TableMetaData[] {
      // TODO: mixing too much business logic with component view logic. Move later to appropriate service or controller
      const sqlDb = this.database.content as SqlJs.Database;
      const results: QueryResults[] = sqlDb.exec('SELECT name FROM sqlite_master where type = \'table\';');
      const tableMetaData: TableMetaData[] = [];
      for (const result of results) {
        // its no me, its on maintainers of sql.js or typescript module generation
        // the imported module says ValueType = number | string | Uint8Array;
        // but debugging gives an string[]. Therefore, we need to make this unclean typecasts
        const tableName = result.values[0] as unknown as string[];
        const columnsResults = sqlDb.exec('PRAGMA table_info(' + tableName[0] + ');');
        const columns: string[] = [];
        if (columnsResults[0]) {
          columnsResults[0].values.forEach((row: any) => {
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
      DatabaseUtils.readFromFile(file).then((db: Database) => this.database = db);
      this.removeBackgroundColor();
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
</style>
