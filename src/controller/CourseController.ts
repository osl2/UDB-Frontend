import ParentService from '@/services/ParentService';
import Course from '@/dataModel/Course';
import Worksheet from '@/dataModel/Worksheet';;
import {DefaultApi, CreateCourseRequest} from "@/api/DefaultApi";

export default class CourseController implements ParentService<Course, Worksheet> {
    private _api: DefaultApi;

    constructor(api: DefaultApi) {
        this._api = api
    }

    public getChildren(object: Course): Worksheet[] {
        throw new Error("Method not implemented.");
    }

    /**
     * Creates a course in backend and returns the uuid
     *
     * @param course
     */
    public create(course: Course): Promise<string> {
        return this._api.createCourse({course: course} as CreateCourseRequest)
    }
    public remove(object: Course): void {
        throw new Error("Method not implemented.");
    }
    public save(object_: Course): void {
        throw new Error("Method not implemented.");
    }
    public get(id: string): Course {
        throw new Error("Method not implemented.");
    }
    public getAll(): Promise<Course[]> {
        return this._api.getCourses()
    }
}
