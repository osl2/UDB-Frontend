import SQLService from '@/services/SQLService';
import { SqlJs } from 'sql.js/module';
import Database from '@/dataModel/Database';
import QueryResult from '@/dataModel/QueryResult';
import ResultSet from '@/dataModel/ResultSet';

export default class SQLExecutor implements SQLService {
    public databaseSnapshots!: Map<number, SqlJs.Database[]>;
    public sqlJs: Promise<SqlJs.SqlJsStatic>;

    constructor() {
        this.databaseSnapshots = new Map();
        this.sqlJs = initSqlJs();
    }

    public executeQuery(database: number, query: string, step: number): Promise<QueryResult> {
        return this.sqlJs.then((SQL: SqlJs.SqlJsStatic) => {
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
    public snapshot(database: number, step: number): Promise<Uint8Array> {
        return this.sqlJs.then((SQL: SqlJs.SqlJsStatic) => {
            return this.databaseSnapshots.get(database)![step].export();
        });
    }
    public close(database: number): Promise<Uint8Array> {
        return this.sqlJs.then((SQL: SqlJs.SqlJsStatic) => {
            const dbArray = this.databaseSnapshots.get(database)!;
            const retVal = dbArray[dbArray.length].export();
            dbArray.forEach((element) => {
                element.close();
            });
            this.databaseSnapshots.delete(database);
            return retVal;
        });
    }
}
