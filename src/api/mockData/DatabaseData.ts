import Database from "@/dataModel/Database";
import UUIDGenerator from "@/api/mockData/UUIDGenerator";
import Course from "@/dataModel/Course";

export default class DatabaseData {

  public databaseDataMap: Map<string, Database> = new Map<string, Database>();

  public createDatabase(database: Database) {
    database.id = UUIDGenerator.uuid();
    this.databaseDataMap.set(database.id, database);
  }

  public getDatabase(databaseId: string): Database {
    if (this.databaseDataMap.has(databaseId)) {
      return this.databaseDataMap.get(databaseId)!;
    } else {
      throw new Error("Database does not exist " + databaseId);
    }
  }
  public updateDatabase(db: Database) {
    this.databaseDataMap.set(db.id, db);
  }

  public getAll(): Database[] {
    const result: Database[] = [];
    this.databaseDataMap.forEach((value, key) => {
      result.push(value);
    });
    return result;
  }

  public removeDatabase(databaseId: string) {
    this.databaseDataMap.delete(databaseId);
  }


}
