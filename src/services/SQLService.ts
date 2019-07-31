import QueryResult from '@/dataModel/QueryResult';
import Database from '@/dataModel/Database';

export default interface SQLService {
  executeQuery(database: number, query: string, step: number): Promise<QueryResult>;
  open(database: Database): Promise<number>;
  snapshot(database: number, step: number): Promise<Uint8Array>;
  close(database: number): Promise<Uint8Array>;
}