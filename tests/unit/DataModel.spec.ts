import { expect } from 'chai';
import Course from '@/dataModel/Course.ts';
import InstructionTask from '@/dataModel/InstructionTask.ts';
import SubtaskTypes from '@/dataModel/SubtaskTypes';
import MultipleChoiceTask from '@/dataModel/MultipleChoiceTask';
import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';
import Database from '@/dataModel/Database';
import PlainTextSolution from '@/dataModel/PlainTextSolution';
import PlainTextTask from '@/dataModel/PlainTextTask';
import SqlSolution from '@/dataModel/SqlSolution';
import SqlTask from '@/dataModel/SqlTask';
import AllowedSqlStatements from '@/dataModel/AllowedSqlStatements';
import Task from '@/dataModel/Task';
import Worksheet from '@/dataModel/Worksheet';
import MultipleChoiceSolutionDiff from '@/dataModel/MultipleChoiceSolutionDiff';
import PlainTextSolutionDiff from '@/dataModel/PlainTextSolutionDiff';
import SqlSolutionDiff from '@/dataModel/SqlSolutionDiff';

/**
 * Hier werden alle fromJson und toJson Methoden des Datenmodells getestet
 **/

it('course should be the same after using both json methods, but missing the alias', () => {
    const course = new Course('1', 'name', 'description', 'alias', ['42', '1337']);
    const courseCompare = Course.fromJSON(course.toJSON());
    expect(courseCompare.alias).to.equal('');
    expect(courseCompare.id).to.equal('1');
    expect(courseCompare.name).to.equal('name');
    expect(courseCompare.description).to.equal('description');
    expect(courseCompare.worksheetIds).to.eql(['42', '1337']);
});
it('database should be the same after using both json methods', () => {
    const content = new Uint8Array(1);
    content[0] = 42;
    const databse = new Database('1', 'test', content);
    const dbCompare = Database.fromJSON(databse.toJSON());
    expect(dbCompare.id).to.equal('1');
    expect(dbCompare.name).to.equal('test');
    expect(dbCompare.content).to.eql(content);
});
it('InstructionTask should be the same after using both json methods', () => {
    const task = new InstructionTask('1', 'instruction');
    const taskCompare = InstructionTask.fromJSON(task.toJSON());
    expect(taskCompare.id).to.equal('1');
    expect(taskCompare.instruction).to.equal('instruction');
    expect(taskCompare.type).to.equal(SubtaskTypes.Instruction);
    expect(taskCompare.isSolutionVisible).to.equal(false);
    expect(taskCompare.isSolutionVeryfiable).to.equal(false);
});
it('MultipleChoiceTask should be the same after using both json methods', () => {
    const solution = new MultipleChoiceSolution([1, 2]);
    const task = new MultipleChoiceTask('1', solution, 'instruction', false, false, ['a', 'b', 'c']);
    const taskCompare = MultipleChoiceTask.fromJSON(task.toJSON());
    const solutionCompare = MultipleChoiceSolution.fromJSON(solution.toJSON);
    expect(taskCompare.id).to.equal('1');
    expect(taskCompare.instruction).to.equal('instruction');
    expect(taskCompare.type).to.equal(SubtaskTypes.MultipleChoice);
    expect(taskCompare.isSolutionVisible).to.equal(false);
    expect(taskCompare.isSolutionVeryfiable).to.equal(false);
    expect(taskCompare.answerOptions).to.eql(['a', 'b', 'c']);
    expect(solutionCompare.choices).to.eql([1, 2]);
});
it('MultipleChoiceSolutionDiff should return the right feedback message', () => {
    const solutiondiff = new MultipleChoiceSolutionDiff(false, [1, 2], [0]);
    expect(solutiondiff.getFeedbackString()).to.equal(
        'Die folgenden ausgewählten Antworten ' +
            'waren falsch: 2, 3. ' +
            'Die folgenden Antworten wären noch richtig gewesen: 1.'
    );
});
it('PlainTextTask should be the same after using both json methods', () => {
    const solution = new PlainTextSolution('solution');
    const task = new PlainTextTask('1', solution, 'instruction', false, false);
    const taskCompare = PlainTextTask.fromJSON(task.toJSON());
    const solutionCompare = PlainTextSolution.fromJSON(solution.toJSON);
    expect(taskCompare.id).to.equal('1');
    expect(taskCompare.instruction).to.equal('instruction');
    expect(taskCompare.type).to.equal(SubtaskTypes.PlainText);
    expect(taskCompare.isSolutionVisible).to.equal(false);
    expect(taskCompare.isSolutionVeryfiable).to.equal(false);
    expect(solutionCompare.text).to.equal('solution');
});
it('PlaintextSolutionDiff should return the correct feedback message', () => {
    const solutiondiff = new PlainTextSolutionDiff(false, 'This is the right answer');
    expect(solutiondiff.getFeedbackString()).to.equal(
        'Die folgende Antwort wurde von Deinem Lehrer erwartet: ' + 'This is the right answer'
    );
});
it('SqlTask should be the same after using both json methods', () => {
    const solution = new SqlSolution('query', ['columns'], [['value1', 'value2']]);
    const task = new SqlTask(
        '1',
        solution,
        'instruction',
        true,
        true,
        false,
        false,
        AllowedSqlStatements.NoRestriction
    );
    const taskCompare = SqlTask.fromJSON(task.toJSON());
    const solutionCompare = SqlSolution.fromJSON(solution.toJSON);
    expect(taskCompare.id).to.equal('1');
    expect(taskCompare.instruction).to.equal('instruction');
    expect(taskCompare.type).to.equal(SubtaskTypes.Sql);
    expect(taskCompare.isSolutionVisible).to.equal(false);
    expect(taskCompare.isSolutionVeryfiable).to.equal(true);
    expect(taskCompare.isPointAndClickAllowed).to.equal(true);
    expect(taskCompare.doesRowOrderMatter).to.equal(false);
    expect(solutionCompare.values).to.eql([['value1', 'value2']]);
});
it('SqlSolutionDiff should return the correct feedback message', () => {
    const solutiondiff = new SqlSolutionDiff(false, [['1', '2']], [['3']]);
    expect(solutiondiff.getFeedbackString()).to.eql(
        'Diese Ergebnisreihen waren fälschlicherweise bei Deiner' +
            ' Lösung mit dabei: \n1. Reihe: 1, 2 \nDiese Ergebnisreihen fehlen bei Deiner Lösung: \n1. Reihe: 3'
    );
});

it('Task should be the same after using both json methods', () => {
    const task = new Task('1', 'name', '1', ['1', '2']);
    const taskCompare = Task.fromJSON(task.toJSON());
    expect(taskCompare.id).to.equal('1');
    expect(taskCompare.name).to.equal('name');
    expect(taskCompare.databaseId).to.equal('1');
    expect(taskCompare.subtaskIds).to.eql(['1', '2']);
});

it('worksheet should be the same after using both json methods', () => {
    const worksheet = new Worksheet('1', 'name', ['1', '2'], true, true);
    const worksheetCompare = Worksheet.fromJSON(worksheet.toJSON());
    expect(worksheetCompare.id).to.equal('1');
    expect(worksheetCompare.name).to.equal('name');
    expect(worksheetCompare.taskIds).to.eql(['1', '2']);
    expect(worksheetCompare.isOnline).to.equal(true);
    expect(worksheetCompare.isSolutionOnline).to.equal(true);
});
