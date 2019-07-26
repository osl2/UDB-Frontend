import DataModel from '@/dataModel/DataModel';

export default interface ExportImport<T extends DataModel> {
    export(object: T): Uint8Array;
    import(object: Uint8Array): T;
}
