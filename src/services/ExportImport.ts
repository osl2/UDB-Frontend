import DataModel from '@/dataModel/DataModel';

export default interface ExportImport<T extends DataModel> {
    exportObject(object: T): void;
    importObject(file: File): T;
}
