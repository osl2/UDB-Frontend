import ParentService from '@/services/ParentService';
import Course from '@/dataModel/Course';
import Worksheet from '@/dataModel/Worksheet';
import {
    DefaultApi,
    CreateCourseRequest,
    DeleteCourseRequest,
    GetWorksheetRequest,
    UpdateCourseRequest
} from "@/api/DefaultApi";

export default class CourseController implements ParentService<Course, Worksheet> {
    private _api: DefaultApi;
    private _courses: Course[];

    constructor(api: DefaultApi) {
        this._api = api;
        this._courses = [];
        this._api.getCourses()
            .then((response: Course[]) => {
                this._courses = response;
            });
    }

    public getChildren(object: Course): Worksheet[] {   // muss hier ein Kurs übergeben werden oder reicht die UUID?
        let worksheets: Worksheet[] = []
        object.worksheetIds.forEach((worksheetId: string) => {
            this._api.getWorksheet({worksheetId: worksheetId} as GetWorksheetRequest)
                .then((worksheet: Worksheet) => {
                    worksheets.push(worksheet);
                });
        })
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
            })
    }
    public remove(object: Course): void {   //hier reicht vielleicht auch UUID?
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
                const index = this._courses.findIndex((course) => { return course.id == object.id; });
                if (index > -1) {
                    this._courses[index] = object;
                }
            })
    }
    public get(id: string): Course {
        let course = this._courses.find((course) => { return course.id == id; })
        if (course == undefined) {
            throw new Error("Course not found");
        }
        return course;
    }
    public getAll(): Course[] {
        return this._courses;
    }
}
