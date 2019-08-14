import Course from "@/dataModel/Course";
import Database from "@/dataModel/Database";
import Subtask from "@/dataModel/Subtask";
import Task from "@/dataModel/Task";
import Worksheet from '@/dataModel/Worksheet';
import {
  CreateAccountRequest,
  CreateAliasRequest,
  CreateCourseRequest,
  CreateDatabaseRequest,
  CreateWorksheetRequest,
  DefaultApi,
  DeleteCourseRequest,
  DeleteDatabaseRequest,
  DeleteWorksheetRequest,
  GetCourseRequest,
  GetDatabaseRequest,
  GetWorksheetRequest,
  ObjectType,
  UpdateCourseRequest,
  UpdateDatabaseRequest,
  UpdateWorksheetRequest,
} from "@/api/DefaultApi";
import User from "@/dataModel/User";
import MockData from "@/api/mockData/MockData";

export interface Token {
  token: string;
}

/**
 * A mock api for testing the views without the server.
 * For now, the data is set in 'src/mockData'
 */
export class MockApi extends DefaultApi {

  private courseData = new MockData<Course>(Course.name);
  private databaseData = new MockData<Database>(Database.name);
  private accountData = new MockData<User>(User.name);
  private worksheetData = new MockData<Worksheet>(Worksheet.name);
  private taskData = new MockData<Task>(Task.name);
  private subtaskData = new MockData<Task>(Subtask.name);

  public async getCourse(requestParameters: GetCourseRequest): Promise<Course> {
    const course = this.courseData.get(requestParameters.courseId);
    return Promise.resolve(course);
  }

  public async updateCourse(requestParameters: UpdateCourseRequest): Promise<void> {
    await this.courseData.update(requestParameters.course);
  }

  public async createCourse(courseRequest: CreateCourseRequest): Promise<string> {
    this.courseData.create(courseRequest.course);
    return Promise.resolve(courseRequest.course.id);
  }


  public async getCourses(): Promise<Course[]> {
    return Promise.resolve(this.courseData.getAll());
  }

  public async deleteCourse(requestParameters: DeleteCourseRequest): Promise<void> {
    await this.courseData.remove(requestParameters.courseId);
  }

  public async getWorksheet(requestParameters: GetWorksheetRequest): Promise<Worksheet> {
    const course = this.worksheetData.get(requestParameters.worksheetId);
    return Promise.resolve(course);
  }

  public async updateWorksheet(requestParameters: UpdateWorksheetRequest): Promise<void> {
    await this.worksheetData.update(requestParameters.worksheet);
  }

  public async createWorksheet(worksheetRequest: CreateWorksheetRequest): Promise<string> {
    this.worksheetData.create(worksheetRequest.worksheet);
    return Promise.resolve(worksheetRequest.worksheet.id);
  }


  public async getWorksheets(): Promise<Worksheet[]> {
    return Promise.resolve(this.worksheetData.getAll());
  }

  public async deleteWorksheet(requestParameters: DeleteWorksheetRequest): Promise<void> {
    await this.worksheetData.remove(requestParameters.worksheetId);
  }

  public async createAlias(requestParameters: CreateAliasRequest): Promise<string> {
    if (requestParameters.objectType === ObjectType.COURSE) {
      const course = this.courseData.get(requestParameters.objectId);
      if (course) {
        return Promise.resolve(course.id);
      }

    }
    return Promise.reject("Kurs existiert nicht");
  }

  public async getDatabases(): Promise<Database[]> {
    return Promise.resolve(this.databaseData.getAll());
  }

  public async getDatabase(requestParameters: GetDatabaseRequest): Promise<Database> {
    return Promise.resolve(this.databaseData.get(requestParameters.databaseId));
  }

  public async deleteDatabase(requestParameters: DeleteDatabaseRequest): Promise<void> {
    await this.databaseData.remove(requestParameters.databaseId);
  }

  public async createDatabase(dbRequest: CreateDatabaseRequest): Promise<string> {
    this.databaseData.create(dbRequest.database);
    return Promise.resolve(dbRequest.database.id);
  }

  public async updateDatabase(requestParameters: UpdateDatabaseRequest): Promise<void> {
    await this.databaseData.update(requestParameters.database);
  }

  /**
   * Registration
   */
  public async createAccount(requestParameters: CreateAccountRequest): Promise<void> {
    await this.accountData.create(requestParameters.account);
  }


  public async login(): Promise<Token> {
    let user!: User;
    this.accountData.dataMap.forEach((value) => {
      if (value.name === this.configuration.username) {

        if (value.password === this.configuration.password) {
          user = value;
        }
      }
    });
    if (user) {
      return await { token: 'dummyToken' };
    } else {
      return Promise.reject("User does not exist");
    }
  }
}
