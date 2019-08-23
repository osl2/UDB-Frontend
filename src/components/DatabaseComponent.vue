<template>
    <div class="top20">
        <b-alert v-if="errorMsg !== ''" v-model="errorMsg" variant="danger" dismissible>{{ errorMsg }}</b-alert>

        <div :id="elementId" class="card" :class="cursorClickable">
            <div
                v-if="!database || !database.content"
                :database:sync="database"
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
                        <font-awesome-icon icon="upload" :style="{ color: 'rgba(159,162,168,0.57)' }" size="4x" />
                    </div>
                    <div class="col-sm-6 ">
                        <p class="text-muted">{{ $t('database.dropDatabase') }}</p>
                    </div>
                    <input :id="elementId + 'dbFile'" type="file" @change="changeHandler" />
                </div>
            </div>
            <div v-else class="card-body" :database:sync="database">
                <div
                    v-if="tableMetaData.length > 0"
                    class="d-flex flex-row flex-nowrap"
                    :tableMetaData:sync="tableMetaData"
                >
                    <DatabaseTable
                        v-for="tableMeta in tableMetaData"
                        :key="tableMeta.tableName"
                        :table-name="tableMeta.tableName"
                        :columns="tableMeta.columns"
                    ></DatabaseTable>
                </div>
                <div v-else class="d-flex flex-row flex-nowrap" :tableMetaData:sync="tableMetaData">
                    <p class="text-muted">{{ $t('database.emptyDatabaseMsg') }}</p>
                </div>
            </div>
        </div>

        <div v-if="showExportImport">
            <div v-if="!database || !database.content" :database:sync="database">
                {{ $t('database.noDBYetCreateOne') }}
                <a href="#" @click="createEmptyDatabase">{{ $t('database.createEmptyDB') }}</a>
                {{ $t('database.orStartWith') }}
                <a href="#" @click="createExampleDatabase">{{ $t('database.createExampleDB') }}</a>
                .
            </div>
            <div v-if="database && database.content" :database:sync="database">
                <a href="#" @click="downloadDatabase">{{ $t('database.downloadDB') }}</a>
                {{ $t('database.or') }}
                <a href="#" @click="reset">{{ $t('database.reset') }}</a>
                .
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/**
 * This component should make possible to load, save and display table structure of the database
 */
import { Prop, Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Database from '@/dataModel/Database';
import DatabaseTable from '@/components/DatabaseTable.vue';
import TableMetaData from '@/dataModel/TableDataModel';
import SQLExecutor from '@/controller/SQLExecutor';
import DatabaseController from '@/controller/DatabaseController';
import LocalStorageController from '@/controller/LocalStorageController';

const CREATE_TABLE_SQL = `
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
const STORAGE_DB_KEY_NAME = 'SandBox-DB';

@Component({
    components: { DatabaseTable },
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
    @Prop() private loadSandboxLocalStorageDb!: boolean;

    private databaseController: DatabaseController = this.$store.getters.databaseController;
    private localStorageController: LocalStorageController = this.$store.getters.localStorageController;

    public clickHandler() {
        document.getElementById(this.elementId + 'dbFile')!.click();
    }

    public loadMetaData() {
        this.tableMetaData = [];
        this.sqlExecutor
            .executeQuery(this.databaseNumber, "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;", 0)
            .then(results => {
                for (const result of results.result.values) {
                    const tableNames = result as string[];
                    for (const tableName of tableNames) {
                        this.sqlExecutor
                            .executeQuery(this.databaseNumber, 'PRAGMA table_info(' + tableName + ');', 0)
                            .then(columnsResults => {
                                const columns: string[] = [];
                                if (columnsResults.result.values) {
                                    columnsResults.result.values.forEach((row: any) => {
                                        const columnName = row[1] as string;
                                        const columnType = row[2] as string;
                                        columns.push(columnName + ': ' + columnType);
                                    });
                                }
                                this.tableMetaData.push(new TableMetaData(tableName, columns));
                            });
                    }
                }
            });
    }

    public updated() {
        this.$emit('databaseExists', this.database && this.database.content);
    }

    public created() {
        if (this.loadSandboxLocalStorageDb) {
            const db: Database | undefined = this.localStorageController.get(STORAGE_DB_KEY_NAME);
            if (db) {
                this.postInit(Promise.resolve(Database.fromJSON(db)));
            }
        }
    }

    public replaceStorage() {
        this.database.content = this.sqlExecutor.latestSnapshot(this.databaseNumber);
        this.localStorageController.set(STORAGE_DB_KEY_NAME, this.database.toJSON());
    }

    public postInit(db: Promise<Database>, replaceStorage: boolean = false): Promise<void> {
        return db
            .then(database => {
                this.database = database;
                return this.sqlExecutor.open(database);
            })
            .then((dbIndex: number) => {
                this.databaseNumber = dbIndex;
                if (replaceStorage) {
                    this.replaceStorage();
                }
                this.loadMetaData();
                this.removeBackgroundColor();
            })
            .catch(e => {
                this.errorMsg = e.message;
                this.reset();
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
        this.postInit(db, true);
    }

    private createExampleDatabase() {
        const db = this.databaseController.createEmptyDatabase('angestellte');
        this.postInit(db).then(_ => {
            this.sqlExecutor.executeQuery(this.databaseNumber, CREATE_TABLE_SQL, 0);
            this.loadMetaData();
            this.replaceStorage();
        });
    }

    private downloadDatabase() {
        this.databaseController.exportObject(this.database);
    }

    private initDatabase(file: File) {
        this.errorMsg = '';
        const db = this.databaseController.importObject(file);
        this.postInit(db, true);
    }

    private reset() {
        this.database = new Database('', '', null);
        this.tableMetaData = [];
        this.sqlExecutor.close(this.databaseNumber);
        this.localStorageController.set(STORAGE_DB_KEY_NAME, undefined);
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

input[type='file'] {
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
