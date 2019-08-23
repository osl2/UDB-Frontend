import { ResultSet } from './ResultSet';

export default interface QueryResult {
    query: string;
    result: ResultSet;
}
