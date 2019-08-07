import Course from "@/dataModel/Course";
import Database from "@/dataModel/Database";
import Subtask from "@/dataModel/Subtask";
import Task from "@/dataModel/Task";
import Worksheet from '@/dataModel/Worksheet';
import * as runtime from "@/api/BaseApi";
import TeacherOne from "@/testData/TeacherOne";

export interface CreateCourseRequest {
  course: Course;
}

export interface CreateDatabaseRequest {
  database: Database;
}

export interface CreateSubtaskRequest {
  taskId: string;
  subtask: Subtask;
}

export interface CreateTaskRequest {
  task: Task;
}

export interface CreateWorksheetRequest {
  worksheet: Worksheet;
}

export interface DeleteCourseRequest {
  courseId: string;
}

export interface DeleteDatabaseRequest {
  databaseId: string;
}

export interface DeleteSubtaskRequest {
  subtaskId: string;
}

export interface DeleteTaskRequest {
  taskId: string;
}

export interface DeleteWorksheetRequest {
  worksheetId: string;
}

export interface GetCourseRequest {
  courseId: string;
}

export interface GetDatabaseRequest {
  databaseId: string;
}

export interface GetSubtaskRequest {
  subtaskId: string;
}

export interface GetTaskRequest {
  taskId: string;
}

export interface GetWorksheetRequest {
  worksheetId: string;
}

export interface UpdateCourseRequest {
  courseId: string;
  course: Course;
}

export interface UpdateDatabaseRequest {
  databaseId: string;
  database: Database;
}

export interface UpdateTaskRequest {
  taskId: string;
  task: Task;
}

export interface UpdateWorksheetRequest {
  worksheetId: string;
  worksheet: Worksheet;
}

/**
 * A mock api for testing the views without the server.
 * For now, the data is set in 'src/testData/TeacherOne.ts'
 */
export class MockApi extends runtime.BaseAPI {

  private teacher: TeacherOne = new TeacherOne();

  /**
   * getAll()
   */

  public async getCourses(): Promise<Course[]> {
    return new Promise<Course[]>((resolve) => {
      resolve(this.teacher.getAllCourses());
    });
  }

  public async getDatabases(): Promise<Database[]> {
    return new Promise<Database[]>((resolve) => {
      resolve(this.teacher.getAllDatabases());
    });
  }

  /**
   * get by ID
   */

  public async getCourse(requestParameters: GetCourseRequest): Promise<Course> {
    return new Promise<Course>((resolve) => {
      resolve(this.teacher.getCourseByID(requestParameters.courseId));
    });
  }
  public async getWorksheet(requestParameters: GetWorksheetRequest): Promise<Worksheet> {
    return new Promise<Worksheet>((resolve) => {
      resolve(this.teacher.getWorksheetByID(requestParameters.worksheetId));
    });
  }
  public async getTask(requestParameters: GetTaskRequest): Promise<Task> {
    return new Promise<Task>((resolve) => {
      resolve(this.teacher.getTaskByID(requestParameters.taskId));
    });
  }
  public async getSubtask(requestParameters: GetSubtaskRequest): Promise<Subtask> {
    return new Promise<Subtask>((resolve) => {
      resolve(this.teacher.getSubtaskByID(requestParameters.subtaskId));
    });
  }
}
