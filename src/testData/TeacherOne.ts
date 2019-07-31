import Course from '@/dataModel/Course';
import Database from '@/dataModel/Database';
import Worksheet from '@/dataModel/Worksheet';
import Task from '@/dataModel/Task';
import PlainTextTask from '@/dataModel/PlainTextTask';
import PlainTextSolution from '@/dataModel/PlainTextSolution';
import MultipleChoiceTask from '@/dataModel/MultipleChoiceTask';
import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';
import SqlTask from '@/dataModel/SqlTask';
import SqlSolution from '@/dataModel/SqlSolution';
import InstructionTask from '@/dataModel/InstructionTask';


export default class TeacherOne {

  // dummyDaten

  public database1 = new Database("nuief", "Schule", new Uint8Array());
  public database2 = new Database("gdghrt", "Mitarbeiter", new Uint8Array());
  public database3 = new Database("fhkrwe", "Musik", new Uint8Array());
  public worksheet1 = new Worksheet('123', 'Blatt 01', [], true, true);
  public worksheet2 = new Worksheet('456', 'Blatt 02', [], false, false);
  public worksheet3 = new Worksheet('678', 'Blatt 03', [], true, true);
  public worksheet4 = new Worksheet('93847', 'Blatt 04', [], true, false);
  public course1 = new Course("1234", "Klasse 7a", "SJ 18/19", [this.worksheet1.id]);
  public course2 = new Course("345", "Klasse 8a", "SJ 18/19", [this.worksheet2.id, this.worksheet3.id]);
  public course3 = new Course("rte", "Klasse 9b", "SJ 18/19", [this.worksheet4.id]);





  public musicDb = new Database('db1T1', 'Musik', new Uint8Array()); // TODO CONTENT DER DATENBANK ERGÄNZEN
  public humanDb = new Database('db2T1', 'Menschen', new Uint8Array()); // TODO CONTENT DER DATENBANK ERGÄNZEN

  // Task 1

  // Eigentlich wird hier die Lsg des Schülers gespeichert und die Lsg des Lehrers wird nur auf dem Server gespeichert.
  // Dies wird noch geändert.
  public sqlSolution1aW1 = new SqlSolution('select * from Alben', [], [[]]);
  public sqlTask1aW1 = new SqlTask('sqlTask1aT1', this.sqlSolution1aW1,
    'Lasse Dir die Tabelle Alben mit allen Einträgen anzeigen.', true,
    true, false);
  public sqlTask1bW1 = new SqlTask('sqlTask1bT1', undefined,
    'Lasse Dir die Titel der Alben ausgeben, die mehr als 11 Titel besitzen.', false,
    true, false);
  public task1W1 = new Task('task1T1', 'Aufgabe 1',  this.musicDb.id, [this.sqlTask1aW1.id, this.sqlTask1bW1.id]);

  // Task 2

  public multipleChoiceSolution2aW1 = new MultipleChoiceSolution([1, 3]);
  public multipleChoiceTask2aW1 = new MultipleChoiceTask('multipleChoiceTask2aT1', this.multipleChoiceSolution2aW1,
    'Welche der folgenden Befehle sind korrekte SQL-Befehle (Mehrfachnennung möglich)?', true,
    ['select * from Menschen', 'select * where Alter > 4', 'select Name from Menschen where Alter > 56']);
  public instructionTask2bW1 = new InstructionTask('instructionTask2bT1',
    'Hier steht ein informativer Text für Schüler');
  public task2W1 = new Task('task2T1', 'Aufgabe 2',  this.humanDb.id,
    [this.multipleChoiceTask2aW1.id, this.instructionTask2bW1.id]);


  // Worksheet 1

  public worksheet1T1 = new Worksheet('worksheet1T1', 'Aufgabenblatt 1', [this.task1W1.id, this.task2W1.id],
    true, true);

  // Course 1
  public course1T1 = new Course('course1T1', 'Klasse 7a', 'Schuljahr 18/19',
    [this.worksheet1T1.id]);

  // Arrays
  public databaseArray = [this.musicDb, this.humanDb, this.database1, this.database2, this.database3];
  public subTaskArray = [this.sqlTask1aW1, this.sqlTask1bW1, this.multipleChoiceTask2aW1, this.instructionTask2bW1];
  public taskArray = [this.task1W1, this.task2W1];
  public worksheetArray = [this.worksheet1T1, this.worksheet1, this.worksheet2, this.worksheet3, this.worksheet4];
  public courseArray = [this.course1T1, this.course1, this.course2, this.course3];




  public getCourseByID(id: string): Course {
    for (const course of this.courseArray) {
      if (course.id === id) {
        return course;
      }
    }
    throw new Error("Kein passender Kurs gefunden");
  }
  public getWorksheetByID(id: string): Worksheet {
    for (const worksheet of this.worksheetArray) {
      if (worksheet.id === id) {
        return worksheet;
      }
    }
    throw new Error("Kein passender Kurs gefunden");
  }

  public getWorksheetsfromCourse(course: Course): Worksheet[] {
    let worksheets: Worksheet[] = [];
    for (const worksheetId of course.worksheetIds) {
      worksheets.push(this.getWorksheetByID(worksheetId));
    }
    return worksheets;
  }

  public getAllCourses(): Course[] {
    return this.courseArray;
  }

  public getAllDatabases(): Database[] {
    return this.databaseArray;
  }
}
