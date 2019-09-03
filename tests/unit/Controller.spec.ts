import WorksheetController from '@/controller/WorksheetController';
import TaskController from '@/controller/TaskController';
import Worksheet from '@/dataModel/Worksheet';
import PlainTextSolution from '@/dataModel/PlainTextSolution';
import { DefaultApi } from '@/api/DefaultApi';
import sinon from 'sinon';
import Task from '@/dataModel/Task';
import SubtaskController from '@/controller/SubtaskController';
import Subtask from '@/dataModel/Subtask';
import PlainTextTask from '@/dataModel/PlainTextTask';
import DatabaseController from '@/controller/DatabaseController';
import Database from '@/dataModel/Database';
import CourseController from '@/controller/CourseController';
import Course from '@/dataModel/Course';
import UserController from '@/controller/UserController';

it('WorksheetController should call correct Api methods', () => {
    const worksheetController: WorksheetController = new WorksheetController(new DefaultApi());
    const worksheet: Worksheet = new Worksheet('1', 'name', ['1'], true, true);
    const course = new Course('1', 'name', 'description', 'alias', ['1']);

    var spyAll = sinon.spy(worksheetController.api, 'getWorksheets');
    var spyGet = sinon.spy(worksheetController.api, 'getWorksheet');
    var spyCreate = sinon.spy(worksheetController.api, 'createWorksheet');
    var spySave = sinon.spy(worksheetController.api, 'updateWorksheet');
    var spyRemove = sinon.spy(worksheetController.api, 'deleteWorksheet');

    worksheetController.getAll();
    worksheetController.get('1');
    worksheetController.create(worksheet);
    worksheetController.save(worksheet);
    worksheetController.remove(worksheet);
    worksheetController.getChildren(course);

    sinon.assert.calledOnce(spyAll);
    sinon.assert.calledTwice(spyGet);
    sinon.assert.calledOnce(spyCreate);
    sinon.assert.calledOnce(spySave);
    sinon.assert.calledOnce(spyRemove);
});
it('TaskController should call correct Api methods', () => {
    const taskController: TaskController = new TaskController(new DefaultApi());
    const worksheet: Worksheet = new Worksheet('1', 'name', ['1'], true, true);
    const task: Task = new Task('1', 'name', '1', ['1']);

    var spyAll = sinon.spy(taskController.api, 'getTasks');
    var spyGet = sinon.spy(taskController.api, 'getTask');
    var spyCreate = sinon.spy(taskController.api, 'createTask');
    var spySave = sinon.spy(taskController.api, 'updateTask');
    var spyRemove = sinon.spy(taskController.api, 'deleteTask');

    taskController.getAll();
    taskController.get('1');
    taskController.create(task);
    taskController.save(task);
    taskController.remove(task);
    taskController.getChildren(worksheet);

    sinon.assert.calledOnce(spyAll);
    sinon.assert.calledTwice(spyGet);
    sinon.assert.calledOnce(spyCreate);
    sinon.assert.calledOnce(spySave);
    sinon.assert.calledOnce(spyRemove);
});
it('SubtaskController should call correct Api methods', () => {
    const subtaskController: SubtaskController = new SubtaskController(new DefaultApi());
    const task: Task = new Task('1', 'name', '1', ['1']);
    const subtask: Subtask = new PlainTextTask('1', new PlainTextSolution('text'), 'instruction', true, true);

    var spyAll = sinon.spy(subtaskController.api, 'getSubtasks');
    var spyGet = sinon.spy(subtaskController.api, 'getSubtask');
    var spyCreate = sinon.spy(subtaskController.api, 'createSubtask');
    var spySave = sinon.spy(subtaskController.api, 'updateSubtask');
    var spyRemove = sinon.spy(subtaskController.api, 'deleteSubtask');
    var spyComp = sinon.spy(subtaskController.api, 'verifySubtaskSolution');

    subtaskController.getAll();
    subtaskController.get('1');
    subtaskController.create(subtask);
    subtaskController.save(subtask);
    subtaskController.remove(subtask);
    subtaskController.compareSolution(subtask);
    subtaskController.getChildren(task);

    sinon.assert.calledOnce(spyAll);
    sinon.assert.calledTwice(spyGet);
    sinon.assert.calledOnce(spyCreate);
    sinon.assert.calledOnce(spySave);
    sinon.assert.calledOnce(spyRemove);
    sinon.assert.calledOnce(spyComp);
});
it('DatabaseController should call correct Api methods', () => {
    const databaseController: DatabaseController = new DatabaseController(new DefaultApi());
    const content = new Uint8Array(1);
    content[0] = 42;
    const database: Database = new Database('1', 'name', content);

    var spyAll = sinon.spy(databaseController.api, 'getDatabases');
    var spyGet = sinon.spy(databaseController.api, 'getDatabase');
    var spyCreate = sinon.spy(databaseController.api, 'createDatabase');
    var spySave = sinon.spy(databaseController.api, 'updateDatabase');
    var spyRemove = sinon.spy(databaseController.api, 'deleteDatabase');

    databaseController.getAll();
    databaseController.get('1');
    databaseController.create(database);
    databaseController.save(database);
    databaseController.remove(database);

    sinon.assert.calledOnce(spyAll);
    sinon.assert.calledOnce(spyGet);
    sinon.assert.calledOnce(spyCreate);
    sinon.assert.calledOnce(spySave);
    sinon.assert.calledOnce(spyRemove);
});
it('CourseController should call correct Api methods', () => {
    const courseController: CourseController = new CourseController(new DefaultApi());
    const course = new Course('1', 'name', 'description', 'alias', ['1']);

    var spyAll = sinon.spy(courseController.api, 'getCourses');
    var spyGet = sinon.spy(courseController.api, 'getCourse');
    var spyCreate = sinon.spy(courseController.api, 'createCourse');
    var spySave = sinon.spy(courseController.api, 'updateCourse');
    var spyRemove = sinon.spy(courseController.api, 'deleteCourse');
    var spyAlias = sinon.spy(courseController.api, 'getUUID');

    courseController.getAll();
    courseController.get('1');
    courseController.create(course);
    courseController.save(course);
    courseController.remove(course);
    courseController.getWithAlias('alias');

    sinon.assert.calledOnce(spyAll);
    sinon.assert.calledOnce(spyGet);
    sinon.assert.calledOnce(spyCreate);
    sinon.assert.calledOnce(spySave);
    sinon.assert.calledOnce(spyRemove);
    sinon.assert.calledOnce(spyAlias);
});
