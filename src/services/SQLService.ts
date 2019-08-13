import QueryResult from '@/dataModel/QueryResult';
import Database from '@/dataModel/Database';

export default interface SQLService {
  executeQuery(database: number, query: string, step: number): QueryResult;
  open(database: Database): Promise<number>;
  snapshot(database: number, step: number): Uint8Array | null;
  latestSnapshot(database: number): Uint8Array | null;
  close(database: number): Uint8Array;
}
