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

  database1 = new Database("nuief", "Schule", new Uint8Array());
  database2 = new Database("gdghrt", "Mitarbeiter", new Uint8Array());
  database3 = new Database("fhkrwe", "Musik", new Uint8Array());
  worksheet1 = new Worksheet('123', 'Blatt 01', [], true, true);
  worksheet2 = new Worksheet('456', 'Blatt 02', [], true, false);
  worksheet3 = new Worksheet('456', 'Blatt 03', [], true, true);
  worksheet4 = new Worksheet('456', 'Blatt 04', [], true, false);
  course1 = new Course("1234", "Klasse 7a", "SJ 18/19", [this.worksheet1]);
  course2 = new Course("345", "Klasse 8a", "SJ 18/19", [this.worksheet2, this.worksheet3]);
  course3 = new Course("rte", "Klasse 9b", "SJ 18/19", [this.worksheet4]);





  musicDb = new Database('db1T1', 'Musik', new Uint8Array()); // TODO CONTENT DER DATENBANK ERGÄNZEN
  humanDb = new Database('db2T1', 'Menschen', new Uint8Array()); // TODO CONTENT DER DATENBANK ERGÄNZEN

  // Task 1

  // Eigentlich wird hier die Lsg des Schülers gespeichert und die Lsg des Lehrers wird nur auf dem Server gespeichert.
  // Dies wird noch geändert.
  sqlSolution1aW1 = new SqlSolution('select * from Alben', [], [[]]);
  sqlTask1aW1 = new SqlTask('sqlTask1aT1', this.sqlSolution1aW1,
    'Lasse Dir die Tabelle Alben mit allen Einträgen anzeigen.', true,
    true, false);
  sqlTask1bW1 = new SqlTask('sqlTask1bT1', undefined,
    'Lasse Dir die Titel der Alben ausgeben, die mehr als 11 Titel besitzen.', false,
    true, false);
  task1W1 = new Task('task1T1', this.musicDb, [this.sqlTask1aW1, this.sqlTask1bW1]);

  // Task 2

  multipleChoiceSolution2aW1 = new MultipleChoiceSolution([1, 3]);
  multipleChoiceTask2aW1 = new MultipleChoiceTask('multipleChoiceTask2aT1', this.multipleChoiceSolution2aW1,
    'Welche der folgenden Befehle sind korrekte SQL-Befehle (Mehrfachnennung möglich)?', true,
    ['select * from Menschen', 'select * where Alter > 4', 'select Name from Menschen where Alter > 56']);
  instructionTask2bW1 = new InstructionTask('instructionTask2bT1',
    'Hier steht ein informativer Text für Schüler');
  task2W1 = new Task('task2T1', this.humanDb, [this.multipleChoiceTask2aW1, this.instructionTask2bW1]);


  // Worksheet 1

  worksheet1T1 = new Worksheet('worksheet1T1', 'Aufgabenblatt 1', [this.task1W1, this.task2W1],
    true, true);

  // Course 1
  course1T1 = new Course('course1T1', 'Klasse 7a', 'Schuljahr 18/19',
    [this.worksheet1T1]);

  // Arrays
  databaseArray = [this.musicDb, this.humanDb, this.database1, this.database2, this.database3];
  subTaskArray = [this.sqlTask1aW1, this.sqlTask1bW1, this.multipleChoiceTask2aW1, this.instructionTask2bW1];
  taskArray = [this.task1W1, this.task2W1];
  worksheetArray = [this.worksheet1T1, this.worksheet1, this.worksheet2, this.worksheet3, this.worksheet4];
  courseArray = [this.course1T1, this.course1, this.course2, this.course3];




  getCourseByID(id: string): Course {
    for(let course of this.courseArray) {
      if (course.id === id) {
        return course;
      }
    }
    throw new Error("Kein passender Kurs gefunden");
  }

  getAllCourses(): Course[] {
    return this.courseArray;
  }

  getAllDatabases(): Database[] {
    return this.databaseArray;
  }
}
