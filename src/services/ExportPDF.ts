import DataModel from '@/dataModel/DataModel';
import ExportImport from './ExportImport';

export default interface ExportPDF<T extends DataModel> extends ExportImport<T> {
    exportPDF(object: T): Uint8Array;
}
