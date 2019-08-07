
import SQLService from '@/services/SQLService';
import { SqlJs } from 'sql.js/module';
import Database from '@/dataModel/Database';
import QueryResult from '@/dataModel/QueryResult';
import ResultSet from '@/dataModel/ResultSet';
import initSqlJs from 'sql.js';

export default class SQLExecutor implements SQLService {
    public databaseSnapshots!: Map<number, SqlJs.Database[]>;
    public sqlJs!: SqlJs.SqlJsStatic;

    constructor() {
        this.databaseSnapshots = new Map();
        initSqlJs(config).then((SQL: SqlJs.SqlJsStatic) => {this.sqlJs = SQL})
          .catch((error) => {alert(error)}); // Promise catch bessser abfangen
    }

    public executeQuery(database: number, query: string, step: number): QueryResult {
        const sqlDb = this.databaseSnapshots.get(database)![step];
        const results: SqlJs.QueryResults[] = sqlDb.exec(query);
        const resultSet: ResultSet = {
            status: 0,
            message: "",
            columns: results[0].columns,
            values: [[]],
        };
        results.forEach((element) => {
            resultSet.values.push(element.values);
        });
        return {
            query,
            result: resultSet,
        };
    }

    public open(database: Database): number {
        let dbIndex = Math.random();
        while (this.databaseSnapshots.has(dbIndex)) {
            dbIndex = Math.random();
        }
        this.databaseSnapshots.set(dbIndex, [new this.sqlJs.Database(database.content)]);
        return dbIndex;
    }

    public snapshot(database: number, step: number): Uint8Array {
        return this.databaseSnapshots.get(database)![step].export();
    }

    public close(database: number): Uint8Array {
        const dbArray = this.databaseSnapshots.get(database)!;
        const retVal = dbArray[dbArray.length].export();
        dbArray.forEach((element) => {
            element.close();
        });
        this.databaseSnapshots.delete(database);
        return retVal;
    }

    /**
     * This Method exports the current Database State without closing it.
     * This is needed if someone wants to
     */
    public exportCurrentDatabaseState(database: number) : Uint8Array {
        const dbArray = this.databaseSnapshots.get(database)!;
        const uInts = dbArray[dbArray.length].export();
        return uInts;
    }
}
/**
 * This config is needed to parse database files in sql.js. This is the web assembly (wasm) binary of SQLLite.
 * Since yarn or nmp could not bind this file from dependencies, we have to provide it in public folder.
 * There is also a bug reported in sql.js
 * https://github.com/kripken/sql.js/issues/282
 */
const config = {
    locateFile: (filename: string) => `/static/wasm/${filename}`,
};

