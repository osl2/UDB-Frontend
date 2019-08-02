import ParentService from '@/services/ParentService';
import Course from '@/dataModel/Course';
import Worksheet from '@/dataModel/Worksheet';
import {
    DefaultApi,
    CreateCourseRequest,
    DeleteCourseRequest,
    UpdateCourseRequest,
} from "@/api/DefaultApi";
import Task from "@/dataModel/Task";
import WorksheetController from "@/controller/WorksheetController";

export default class CourseController implements ParentService<Course, Worksheet> {
    private _api: DefaultApi;
    private _courses: Course[];
    private _worksheetController: ParentService<Worksheet, Task>;

    constructor(api: DefaultApi) {
        this._api = api;
        this._courses = [];
        this._api.getCourses()
            .then((response: Course[]) => {
                this._courses = response;
            });
        // needed for getting children of a Course
        this._worksheetController = new WorksheetController(api);
    }

    public getChildren(object: Course): Worksheet[] {   // muss hier ein Kurs übergeben werden oder reicht die UUID?
        const worksheets: Worksheet[] = [];
        object.worksheetIds.forEach((worksheetId: string) => {
            worksheets.push(this._worksheetController.get(worksheetId));
        });
        return worksheets;
    }

    public create(course: Course): void {
        this._api.createCourse({course} as CreateCourseRequest)
            .then((response: string) => {
                course.id = response;
                this._courses.push(course);
            })
            .catch((error) => {
                throw new Error("Error creating course: " + error);
            });
    }
    public remove(object: Course): void {   // hier reicht vielleicht auch UUID?
        this._api.deleteCourse({courseId: object.id} as DeleteCourseRequest)
            .then((response) => {
                const index = this._courses.indexOf(object, 0);
                if (index > -1) {
                    this._courses.splice(index, 1);
                }
            });
    }
    public save(object: Course): void {
        this._api.updateCourse({course: object, courseId: object.id} as UpdateCourseRequest)
            .then(() => {
                const index = this._courses.findIndex((course) => course.id === object.id);
                if (index > -1) {
                    this._courses[index] = object;
                }
            });
    }
    public get(id: string): Course {
        const tempCourse = this._courses.find((course) => course.id === id);
        if (tempCourse === undefined) {
            throw new Error("Course not found");
        }
        return tempCourse;
    }
    public getAll(): Course[] {
        return this._courses;
    }
}
