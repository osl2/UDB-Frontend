/**
 * The ResultSet Class saves the result of a sql statement.
 */
export interface ResultSet {
    status: number;
    message: string;
    columns: string[];
    values: ValueType[][];
}

export type ValueType = number | string | Uint8Array | null;
