/**
 * TableMetaData is a class that stores the name of a table as well as the names of its columns. It is used to make a
 * visual representation of a table and therefore the database it belongs to easier.
 */

export default class TableMetaData {
  private _tableName: string;
  private _columns: string[];

  constructor(tableName: string, columns: any[]) {
    this._tableName = tableName;
    this._columns = columns;
  }

  get tableName(): string {
    return this._tableName;
  }

  set tableName(value: string) {
    this._tableName = value;
  }

  get columns(): string[] {
    return this._columns;
  }

  set columns(value: string[]) {
    this._columns = value;
  }

}
