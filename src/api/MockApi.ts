import Course from "@/dataModel/Course";
import Database from "@/dataModel/Database";
import Subtask from "@/dataModel/Subtask";
import Task from "@/dataModel/Task";
import Worksheet from '@/dataModel/Worksheet';
import TeacherData from "@/api/mockData/TeacherData";
import {
  CreateCourseRequest,
  CreateDatabaseRequest,
  DefaultApi,
  DeleteCourseRequest,
  DeleteDatabaseRequest,
  GetCourseRequest,
  GetDatabaseRequest,
  GetSubtaskRequest,
  GetTaskRequest,
  GetWorksheetRequest,
  UpdateCourseRequest,
  UpdateDatabaseRequest,
} from "@/api/DefaultApi";
import CourseData from "@/api/mockData/CourseData";
import DatabaseData from "@/api/mockData/DatabaseData";

/**
 * A mock api for testing the views without the server.
 * For now, the data is set in 'src/mockData/TeacherData.tss'
 */
export class MockApi extends DefaultApi {

  private teacherData: TeacherData = new TeacherData();
  private courseData: CourseData = new CourseData();
  private databaseData: DatabaseData = new DatabaseData();

  public async getCourse(requestParameters: GetCourseRequest): Promise<Course> {
    const course = this.courseData.getCourse(requestParameters.courseId);
    return Promise.resolve(course);
  }

  public async updateCourse(requestParameters: UpdateCourseRequest): Promise<void> {
    await this.courseData.updateCourse(requestParameters.course);
  }

  public async createCourse(courseRequest: CreateCourseRequest): Promise<string> {
    this.courseData.createCourse(courseRequest.course);
    return Promise.resolve(courseRequest.course.id);
  }

  public async getCourses(): Promise<Course[]> {
    return Promise.resolve(this.courseData.getAll());
  }

  public async deleteCourse(requestParameters: DeleteCourseRequest): Promise<void> {
    await this.courseData.removeCourse(requestParameters.courseId);
  }

  public async getDatabases(): Promise<Database[]> {
    return Promise.resolve(this.databaseData.getAll());
  }

  public async getDatabase(requestParameters: GetDatabaseRequest): Promise<Database> {
    return Promise.resolve(this.databaseData.getDatabase(requestParameters.databaseId));
  }

  public async deleteDatabase(requestParameters: DeleteDatabaseRequest): Promise<void> {
    await this.databaseData.removeDatabase(requestParameters.databaseId);
  }

  public async createDatabase(dbRequest: CreateDatabaseRequest): Promise<string> {
    this.databaseData.createDatabase(dbRequest.database);
    return Promise.resolve(dbRequest.database.id);
  }

  public async updateDatabase(requestParameters: UpdateDatabaseRequest): Promise<void> {
    await this.databaseData.updateDatabase(requestParameters.database);
  }

  public async getSubtasks(): Promise<Subtask[]> {
    return new Promise<Subtask[]>((resolve) => {
      resolve(this.teacherData.getAllSubtasks());
    });
  }


  public async getWorksheet(requestParameters: GetWorksheetRequest): Promise<Worksheet> {
    return new Promise<Worksheet>((resolve) => {
      resolve(this.teacherData.getWorksheetByID(requestParameters.worksheetId));
    });
  }

  public async getTask(requestParameters: GetTaskRequest): Promise<Task> {
    return new Promise<Task>((resolve) => {
      resolve(this.teacherData.getTaskByID(requestParameters.taskId));
    });
  }

  public async getSubtask(requestParameters: GetSubtaskRequest): Promise<Subtask> {
    return new Promise<Subtask>((resolve) => {
      resolve(this.teacherData.getSubtaskByID(requestParameters.subtaskId));
    });
  }
}
