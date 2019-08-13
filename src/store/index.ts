import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {DefaultApi} from "@/api/DefaultApi";
import {RootState} from "@/store/types";
import SQLExecutor from "@/controller/SQLExecutor";
import CourseController from "@/controller/CourseController";
import WorksheetController from "@/controller/WorksheetController";
import TaskController from "@/controller/TaskController";
import DatabaseController from "@/controller/DatabaseController";
import SubtaskController from "@/controller/SubtaskController";
import UserController from "@/controller/UserController";
import User from "@/dataModel/User";
import UserGroup from "@/dataModel/UserGroup";
import LocalStorageController from "@/controller/LocalStorageController";


Vue.use(Vuex);

const api = new DefaultApi();

const store: StoreOptions<RootState> = {
    state: {
        api,
        user: new User("", "", "", "", UserGroup.Unauthenticated),
        sqlExecutor: new SQLExecutor(),
        courseController: new CourseController(api),
        worksheetController: new WorksheetController(api),
        taskController: new TaskController(api),
        databaseController: new DatabaseController(api),
        subtaskController: new SubtaskController(api),
        userController: new UserController(api),
        localStorageController: new LocalStorageController(),
    },
    getters: {
        api: (state) => {
            return state.api;
        },
        sqlExecutor: (state) => {
            return state.sqlExecutor;
        },
        courseController: (state) => {
            return state.courseController;
        },
        worksheetController: (state) => {
            return state.worksheetController;
        },
        taskController: (state) => {
            return state.taskController;
        },
        databaseController: (state) => {
            return state.databaseController;
        },
        subtaskController: (state) => {
            return state.subtaskController;
        },
        userController: (state) => {
            return state.userController;
        },
        localStorageController: (state) => {
            return state.localStorageController;
        },
    },
};

export default new Vuex.Store<RootState>(store);
