/**
 * dbsquared
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: jan.christian@gruenhage.xyz
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import Course, {
    CourseFromJSON,
    CourseToJSON
} from "@/dataModel/Course";
import Database, {
    DatabaseFromJSON,
    DatabaseToJSON
} from "@/dataModel/Database";
import Task, {
    TaskFromJSON,
    TaskToJSON
} from "@/dataModel/Task";
import Worksheet, {
    WorksheetFromJSON,
    WorksheetToJSON,
} from '@/dataModel/Worksheet';
import * as runtime from "@/api/BaseApi";

export interface CreateCourseRequest {
    course: Course;
}

export interface CreateDatabaseRequest {
    database: Database;
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
 * no description
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Creates a new instance of a `Course`.
     * Create a Course
     */
    async createCourseRaw(requestParameters: CreateCourseRequest): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.course === null || requestParameters.course === undefined) {
            throw new runtime.RequiredError('course','Required parameter requestParameters.course was null or undefined when calling createCourse.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/courses`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CourseToJSON(requestParameters.course),
        });

        return new runtime.TextApiResponse(response);
    }

    /**
     * Creates a new instance of a `Course`.
     * Create a Course
     */
    async createCourse(requestParameters: CreateCourseRequest): Promise<string> {
        const response = await this.createCourseRaw(requestParameters);
        return await response.value();
    }

    /**
     * Creates a new instance of a `Database`.
     * Create a Database
     */
    async createDatabaseRaw(requestParameters: CreateDatabaseRequest): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.database === null || requestParameters.database === undefined) {
            throw new runtime.RequiredError('database','Required parameter requestParameters.database was null or undefined when calling createDatabase.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/databases`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DatabaseToJSON(requestParameters.database),
        });

        return new runtime.TextApiResponse(response);
    }

    /**
     * Creates a new instance of a `Database`.
     * Create a Database
     */
    async createDatabase(requestParameters: CreateDatabaseRequest): Promise<string> {
        const response = await this.createDatabaseRaw(requestParameters);
        return await response.value();
    }

    /**
     * Creates a new instance of a `Task`.
     * Create a Task
     */
    async createTaskRaw(requestParameters: CreateTaskRequest): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.task === null || requestParameters.task === undefined) {
            throw new runtime.RequiredError('task','Required parameter requestParameters.task was null or undefined when calling createTask.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tasks`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TaskToJSON(requestParameters.task),
        });

        return new runtime.TextApiResponse(response);
    }

    /**
     * Creates a new instance of a `Task`.
     * Create a Task
     */
    async createTask(requestParameters: CreateTaskRequest): Promise<string> {
        const response = await this.createTaskRaw(requestParameters);
        return await response.value();
    }

    /**
     * Creates a new instance of a `Worksheet`.
     * Create a Worksheet
     */
    async createWorksheetRaw(requestParameters: CreateWorksheetRequest): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.worksheet === null || requestParameters.worksheet === undefined) {
            throw new runtime.RequiredError('worksheet','Required parameter requestParameters.worksheet was null or undefined when calling createWorksheet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/worksheets`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: WorksheetToJSON(requestParameters.worksheet),
        });

        return new runtime.TextApiResponse(response);
    }

    /**
     * Creates a new instance of a `Worksheet`.
     * Create a Worksheet
     */
    async createWorksheet(requestParameters: CreateWorksheetRequest): Promise<string> {
        const response = await this.createWorksheetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Account Deletion
     */
    async deleteAccountRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/account`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Account Deletion
     */
    async deleteAccount(): Promise<void> {
        await this.deleteAccountRaw();
    }

    /**
     * Deletes an existing `Course`.
     * Delete a Course
     */
    async deleteCourseRaw(requestParameters: DeleteCourseRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.courseId === null || requestParameters.courseId === undefined) {
            throw new runtime.RequiredError('courseId','Required parameter requestParameters.courseId was null or undefined when calling deleteCourse.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/courses/{courseId}`.replace(`{${"courseId"}}`, encodeURIComponent(String(requestParameters.courseId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes an existing `Course`.
     * Delete a Course
     */
    async deleteCourse(requestParameters: DeleteCourseRequest): Promise<void> {
        await this.deleteCourseRaw(requestParameters);
    }

    /**
     * Deletes an existing `Database`.
     * Delete a Database
     */
    async deleteDatabaseRaw(requestParameters: DeleteDatabaseRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.databaseId === null || requestParameters.databaseId === undefined) {
            throw new runtime.RequiredError('databaseId','Required parameter requestParameters.databaseId was null or undefined when calling deleteDatabase.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/databases/{databaseId}`.replace(`{${"databaseId"}}`, encodeURIComponent(String(requestParameters.databaseId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes an existing `Database`.
     * Delete a Database
     */
    async deleteDatabase(requestParameters: DeleteDatabaseRequest): Promise<void> {
        await this.deleteDatabaseRaw(requestParameters);
    }

    /**
     * Deletes an existing `Subtask`.
     * Delete a Subtask
     */
    async deleteSubtaskRaw(requestParameters: DeleteSubtaskRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.subtaskId === null || requestParameters.subtaskId === undefined) {
            throw new runtime.RequiredError('subtaskId','Required parameter requestParameters.subtaskId was null or undefined when calling deleteSubtask.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/subtasks/{subtaskId}`.replace(`{${"subtaskId"}}`, encodeURIComponent(String(requestParameters.subtaskId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes an existing `Subtask`.
     * Delete a Subtask
     */
    async deleteSubtask(requestParameters: DeleteSubtaskRequest): Promise<void> {
        await this.deleteSubtaskRaw(requestParameters);
    }

    /**
     * Deletes an existing `Task`.
     * Delete a Task
     */
    async deleteTaskRaw(requestParameters: DeleteTaskRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.taskId === null || requestParameters.taskId === undefined) {
            throw new runtime.RequiredError('taskId','Required parameter requestParameters.taskId was null or undefined when calling deleteTask.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tasks/{taskId}`.replace(`{${"taskId"}}`, encodeURIComponent(String(requestParameters.taskId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes an existing `Task`.
     * Delete a Task
     */
    async deleteTask(requestParameters: DeleteTaskRequest): Promise<void> {
        await this.deleteTaskRaw(requestParameters);
    }

    /**
     * Deletes an existing `Worksheet`.
     * Delete a Worksheet
     */
    async deleteWorksheetRaw(requestParameters: DeleteWorksheetRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.worksheetId === null || requestParameters.worksheetId === undefined) {
            throw new runtime.RequiredError('worksheetId','Required parameter requestParameters.worksheetId was null or undefined when calling deleteWorksheet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/worksheets/{worksheetId}`.replace(`{${"worksheetId"}}`, encodeURIComponent(String(requestParameters.worksheetId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes an existing `Worksheet`.
     * Delete a Worksheet
     */
    async deleteWorksheet(requestParameters: DeleteWorksheetRequest): Promise<void> {
        await this.deleteWorksheetRaw(requestParameters);
    }

    /**
     * Gets the details of a single instance of a `Course`.
     * Get a Course
     */
    async getCourseRaw(requestParameters: GetCourseRequest): Promise<runtime.ApiResponse<Course>> {
        if (requestParameters.courseId === null || requestParameters.courseId === undefined) {
            throw new runtime.RequiredError('courseId','Required parameter requestParameters.courseId was null or undefined when calling getCourse.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/courses/{courseId}`.replace(`{${"courseId"}}`, encodeURIComponent(String(requestParameters.courseId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CourseFromJSON(jsonValue));
    }

    /**
     * Gets the details of a single instance of a `Course`.
     * Get a Course
     */
    async getCourse(requestParameters: GetCourseRequest): Promise<Course> {
        const response = await this.getCourseRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets a list of all `Course` entities.
     * List All Courses
     */
    async getCoursesRaw(): Promise<runtime.ApiResponse<Array<Course>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/courses`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CourseFromJSON));
    }

    /**
     * Gets a list of all `Course` entities.
     * List All Courses
     */
    async getCourses(): Promise<Array<Course>> {
        const response = await this.getCoursesRaw();
        return await response.value();
    }

    /**
     * Gets the details of a single instance of a `Database`.
     * Get a Database
     */
    async getDatabaseRaw(requestParameters: GetDatabaseRequest): Promise<runtime.ApiResponse<Database>> {
        if (requestParameters.databaseId === null || requestParameters.databaseId === undefined) {
            throw new runtime.RequiredError('databaseId','Required parameter requestParameters.databaseId was null or undefined when calling getDatabase.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/databases/{databaseId}`.replace(`{${"databaseId"}}`, encodeURIComponent(String(requestParameters.databaseId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DatabaseFromJSON(jsonValue));
    }

    /**
     * Gets the details of a single instance of a `Database`.
     * Get a Database
     */
    async getDatabase(requestParameters: GetDatabaseRequest): Promise<Database> {
        const response = await this.getDatabaseRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets a list of all `Database` entities.
     * List All Databases
     */
    async getDatabasesRaw(): Promise<runtime.ApiResponse<Array<Database>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/databases`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(DatabaseFromJSON));
    }

    /**
     * Gets a list of all `Database` entities.
     * List All Databases
     */
    async getDatabases(): Promise<Array<Database>> {
        const response = await this.getDatabasesRaw();
        return await response.value();
    }

    /**
     * Gets the details of a single instance of a `Task`.
     * Get a Task
     */
    async getTaskRaw(requestParameters: GetTaskRequest): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters.taskId === null || requestParameters.taskId === undefined) {
            throw new runtime.RequiredError('taskId','Required parameter requestParameters.taskId was null or undefined when calling getTask.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tasks/{taskId}`.replace(`{${"taskId"}}`, encodeURIComponent(String(requestParameters.taskId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
    }

    /**
     * Gets the details of a single instance of a `Task`.
     * Get a Task
     */
    async getTask(requestParameters: GetTaskRequest): Promise<Task> {
        const response = await this.getTaskRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets the details of a single instance of a `Worksheet`.
     * Get a Worksheet
     */
    async getWorksheetRaw(requestParameters: GetWorksheetRequest): Promise<runtime.ApiResponse<Worksheet>> {
        if (requestParameters.worksheetId === null || requestParameters.worksheetId === undefined) {
            throw new runtime.RequiredError('worksheetId','Required parameter requestParameters.worksheetId was null or undefined when calling getWorksheet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/worksheets/{worksheetId}`.replace(`{${"worksheetId"}}`, encodeURIComponent(String(requestParameters.worksheetId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => WorksheetFromJSON(jsonValue));
    }

    /**
     * Gets the details of a single instance of a `Worksheet`.
     * Get a Worksheet
     */
    async getWorksheet(requestParameters: GetWorksheetRequest): Promise<Worksheet> {
        const response = await this.getWorksheetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets a list of all `Task` entities.
     * List All tasks
     */
    async gettasksRaw(): Promise<runtime.ApiResponse<Array<Task>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tasks`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TaskFromJSON));
    }

    /**
     * Gets a list of all `Task` entities.
     * List All tasks
     */
    async gettasks(): Promise<Array<Task>> {
        const response = await this.gettasksRaw();
        return await response.value();
    }

    /**
     * Gets a list of all `Worksheet` entities.
     * List All worksheets
     */
    async getworksheetsRaw(): Promise<runtime.ApiResponse<Array<Worksheet>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/worksheets`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(WorksheetFromJSON));
    }

    /**
     * Gets a list of all `Worksheet` entities.
     * List All worksheets
     */
    async getworksheets(): Promise<Array<Worksheet>> {
        const response = await this.getworksheetsRaw();
        return await response.value();
    }

    /**
     * Updates an existing `Course`.
     * Update a Course
     */
    async updateCourseRaw(requestParameters: UpdateCourseRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.courseId === null || requestParameters.courseId === undefined) {
            throw new runtime.RequiredError('courseId','Required parameter requestParameters.courseId was null or undefined when calling updateCourse.');
        }

        if (requestParameters.course === null || requestParameters.course === undefined) {
            throw new runtime.RequiredError('course','Required parameter requestParameters.course was null or undefined when calling updateCourse.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/courses/{courseId}`.replace(`{${"courseId"}}`, encodeURIComponent(String(requestParameters.courseId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CourseToJSON(requestParameters.course),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates an existing `Course`.
     * Update a Course
     */
    async updateCourse(requestParameters: UpdateCourseRequest): Promise<void> {
        await this.updateCourseRaw(requestParameters);
    }

    /**
     * Updates an existing `Database`.
     * Update a Database
     */
    async updateDatabaseRaw(requestParameters: UpdateDatabaseRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.databaseId === null || requestParameters.databaseId === undefined) {
            throw new runtime.RequiredError('databaseId','Required parameter requestParameters.databaseId was null or undefined when calling updateDatabase.');
        }

        if (requestParameters.database === null || requestParameters.database === undefined) {
            throw new runtime.RequiredError('database','Required parameter requestParameters.database was null or undefined when calling updateDatabase.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/databases/{databaseId}`.replace(`{${"databaseId"}}`, encodeURIComponent(String(requestParameters.databaseId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: DatabaseToJSON(requestParameters.database),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates an existing `Database`.
     * Update a Database
     */
    async updateDatabase(requestParameters: UpdateDatabaseRequest): Promise<void> {
        await this.updateDatabaseRaw(requestParameters);
    }

    /**
     * Updates an existing `Task`.
     * Update a Task
     */
    async updateTaskRaw(requestParameters: UpdateTaskRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.taskId === null || requestParameters.taskId === undefined) {
            throw new runtime.RequiredError('taskId','Required parameter requestParameters.taskId was null or undefined when calling updateTask.');
        }

        if (requestParameters.task === null || requestParameters.task === undefined) {
            throw new runtime.RequiredError('task','Required parameter requestParameters.task was null or undefined when calling updateTask.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tasks/{taskId}`.replace(`{${"taskId"}}`, encodeURIComponent(String(requestParameters.taskId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TaskToJSON(requestParameters.task),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates an existing `Task`.
     * Update a Task
     */
    async updateTask(requestParameters: UpdateTaskRequest): Promise<void> {
        await this.updateTaskRaw(requestParameters);
    }

    /**
     * Updates an existing `Worksheet`.
     * Update a Worksheet
     */
    async updateWorksheetRaw(requestParameters: UpdateWorksheetRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.worksheetId === null || requestParameters.worksheetId === undefined) {
            throw new runtime.RequiredError('worksheetId','Required parameter requestParameters.worksheetId was null or undefined when calling updateWorksheet.');
        }

        if (requestParameters.worksheet === null || requestParameters.worksheet === undefined) {
            throw new runtime.RequiredError('worksheet','Required parameter requestParameters.worksheet was null or undefined when calling updateWorksheet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.accessToken || this.configuration.apiKey)) {
            const token = this.configuration.accessToken || this.configuration.apiKey;
            const tokenString = typeof token === 'function' ? token("Token", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/worksheets/{worksheetId}`.replace(`{${"worksheetId"}}`, encodeURIComponent(String(requestParameters.worksheetId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: WorksheetToJSON(requestParameters.worksheet),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates an existing `Worksheet`.
     * Update a Worksheet
     */
    async updateWorksheet(requestParameters: UpdateWorksheetRequest): Promise<void> {
        await this.updateWorksheetRaw(requestParameters);
    }

}
