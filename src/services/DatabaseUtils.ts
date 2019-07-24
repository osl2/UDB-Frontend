import {SqlJs} from 'sql.js/module';
import Database from '@/dataModel/Database';
import initSqlJs from 'sql.js';


/**
 * This class offers utility methods to work with Sql.js Databases
 */
export default class DatabaseUtils {

  /**
   * This converts the file to [[Database]] object.
   * @param file provided by the end users, through file upload
   * @return a promise of Database object
   */
  public static readFromFile(file: File): Promise<Database> {
    return initSqlJs(config).then((sqlJs: SqlJs.SqlJsStatic) => {
      return this.convertFileToSqlDb(file, sqlJs);
    }).then((sqlJsDb: SqlJs.Database) => {
      return new Database('', file.name, sqlJsDb);
    });


  }
  /**
   * This creates an database object with content is empty (no tables) but valid database.
   * @param name the name of the database
   */
  public static createEmptyDatabase(name: string): Promise<Database> {
    return initSqlJs(config).then((SQL: SqlJs.SqlJsStatic) => {
      const db = new SQL.Database();
      const dbIntern = new Database('', name, db);
      return dbIntern;
    });
  }

  /**
   * If this method is executed from the browser, then a file is downloaded.
   * This appends an <a> link element on body and then clicks it.
   * The href of this link holds the blob of the database.
   * After the click happened the element is removed again.
   * The name of the file is the same as [[database.name]] with the extension .db
   * @param database internal database object
   */
  public static downloadDatabase(database: Database) {
    initSqlJs(config).then((SQL: SqlJs.SqlJsStatic) => {

      const blob = new Blob([database.content!.export()]);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = window.URL.createObjectURL(blob);
      a.download = database.name + '.db';
      a.onclick = () => {
        setTimeout(() => {
          window.URL.revokeObjectURL(a.href);
        }, 1500);
      };
      a.click();
      // ensure that the link is again removed since it wont be needed any more
      a.parentNode!.removeChild(a);
    });
  }

  /**
   * This converts a file to [[SqlJs.Database]]
   * @param file
   * @param sqlJs
   */
  private static convertFileToSqlDb(file: File, sqlJs: SqlJs.SqlJsStatic): Promise<SqlJs.Database> {
    const fileReader = new FileReader();

    const promise: Promise<SqlJs.Database> = new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      fileReader.onload = () => {
        const uInts = new Uint8Array(fileReader.result as ArrayBuffer);
        const sqlJsDb = new sqlJs.Database(uInts);
        resolve(sqlJsDb);
      };
      fileReader.readAsArrayBuffer(file);
    });
    return promise;

  }

}
/**
 * This config is needed to parse database files in sql.js. This is the web assembly (wasm) binary of SQLLite.
 * Since yarn or nmp could not bind this file from dependencies, we have to provide it in public folder.
 * There is also a bug reported in sql.js
 * https://github.com/kripken/sql.js/issues/282
 */
const config = {
  locateFile: (filename: string) => `/static/wasm/${filename}`,
};
