import {DefaultApi} from "@/api/DefaultApi";
import SQLExecutor from "@/controller/SQLExecutor";
import CourseController from "@/controller/CourseController";
import WorksheetController from "@/controller/WorksheetController";
import TaskController from "@/controller/TaskController";
import DatabaseController from "@/controller/DatabaseController";
import SubtaskController from "@/controller/SubtaskController";
import UserController from "@/controller/UserController";
import User from "@/dataModel/User";
import LocalStorageController from "@/controller/LocalStorageController";

export interface RootState {
    api: DefaultApi;
    user: User;
    sqlExecutor: SQLExecutor;
    courseController: CourseController;
    worksheetController: WorksheetController;
    taskController: TaskController;
    databaseController: DatabaseController;
    subtaskController: SubtaskController;
    userController: UserController;
    localStorageController: LocalStorageController;
}
