export default interface ResultSet {
    status: number;
    message: string;
    columns: string[];
    values: ValueType[][];
}

type ValueType = number | string | Uint8Array;
