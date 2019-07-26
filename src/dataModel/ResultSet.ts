export default interface ResultSet {
    status: number;
    message: string;
    columns: string[];
    values: string[][];
}
