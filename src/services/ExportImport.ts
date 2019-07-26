import DataModel from '@/dataModel/DataModel';

export default interface ExportImport<T extends DataModel> {
    exportObject(object: T): Uint8Array;
    importObject(object: Uint8Array): T;
}
