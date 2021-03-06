import SQLService from '@/services/SQLService';
import { SqlJs } from 'sql.js/module';
import Database from '@/dataModel/Database';
import QueryResult from '@/dataModel/QueryResult';
import { ResultSet, ValueType } from '@/dataModel/ResultSet';
import initSqlJs from 'sql.js';

export default class SQLExecutor implements SQLService {
    public databaseSnapshots!: Map<number, SqlJs.Database[]>;
    public sqlJs: Promise<SqlJs.SqlJsStatic>;

    constructor() {
        this.databaseSnapshots = new Map();
        this.sqlJs = initSqlJs(config);
    }

    public executeQuery(database: number, query: string, step: number): Promise<QueryResult> {
        const resultSet: ResultSet = {
            status: 0,
            message: '',
            columns: [],
            values: [[]],
        };
        const sqlDb = this.databaseSnapshots.get(database)![step];

        const queryResultSqlDb = new Promise<SqlJs.QueryResults[]>((resolve, reject) => {
            try {
                resolve(sqlDb.exec(query));
            } catch (e) {
                reject(e);
            }
        });
        return this.dbResultTimed(15000, queryResultSqlDb, 'Query took longer that 15 sec').then(results => {
            if (results.length > 0) {
                if (results[0].columns.length > 0) {
                    resultSet.columns = results[0].columns;
                }
                if (results[0].values.length > 0) {
                    resultSet.values = results[0].values as ValueType[][];
                }
            }
            return {
                query,
                result: resultSet,
            };
        });
    }

    public open(database: Database): Promise<number> {
        return this.sqlJs.then((SQL: SqlJs.SqlJsStatic) => {
            let dbIndex = Math.random();
            while (this.databaseSnapshots.has(dbIndex)) {
                dbIndex = Math.random();
            }
            this.databaseSnapshots.set(dbIndex, [new SQL.Database(database.content)]);
            return dbIndex;
        });
    }

    public snapshot(database: number, step: number): Uint8Array | null {
        const databases: SqlJs.Database[] = this.databaseSnapshots.get(database)!;
        if (databases) {
            return databases[step].export();
        } else {
            return null;
        }
    }

    public latestSnapshot(database: number): Uint8Array | null {
        const databases: SqlJs.Database[] = this.databaseSnapshots.get(database)!;
        if (databases) {
            return databases[databases.length - 1].export();
        } else {
            return null;
        }
    }

    /**
     * Return the last snapshot of the database with [[dbNumber]] and closes all other snapshots and removes from memory
     * @param dbNumber the index of the database
     * @return the last snapshot of the database
     */
    public close(dbNumber: number): Uint8Array {
        const dbArray = this.databaseSnapshots.get(dbNumber)!;
        if (!dbArray) {
            throw new Error('Database with ' + dbNumber + ' does not exist');
        }
        const retVal = dbArray[dbArray.length - 1].export();
        dbArray.forEach(element => {
            element.close();
        });
        this.databaseSnapshots.delete(dbNumber);
        return retVal;
    }

    private dbResultTimed<T>(duration: number, promise: Promise<T>, rejectReason: string): Promise<T> {
        // Create a promise that rejects in <ms> milliseconds
        const timeout = new Promise<T>((resolve, reject) => {
            const id = setTimeout(() => {
                clearTimeout(id);
                reject(new Error(rejectReason));
            }, duration);
        });

        // Returns a race between our timeout and the passed in promise
        return Promise.race<T>([promise, timeout]);
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
