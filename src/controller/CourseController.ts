import Course from '@/dataModel/Course';
import {
    CreateCourseRequest,
    DefaultApi,
    DeleteCourseRequest,
    GetCourseRequest,
    ObjectType,
    UpdateCourseRequest,
} from "@/api/DefaultApi";
import DataManagementService from "@/services/DataManagementService";

export default class CourseController implements DataManagementService<Course> {

    private _api: DefaultApi;
    private _courses: Course[] = [];
    private _course?: Course = undefined;

    constructor(api: DefaultApi) {
        this._api = api;
    }

    /**
     * Loads all courses available to the currently logged in Teacher
     */
    public loadAll(): void {
        this._api.getCourses()
            .then((response: Course[]) => {
                this._courses = response;
            });
    }

    /**
     * Loads a course with given id
     *
     * @param id
     */
    public load(id: string): void {
        this._course = this._courses.find((course) => course.id === id);
        if (this._course === undefined) {
            this._api.getCourse({courseId: id} as GetCourseRequest)
                .then((response: Course) => {
                    this._course = response;
                });
        }
    }

    public loadWithAlias(alias: string): void {
        this._course = this._courses.find((course) => course.alias === alias);
        if (this._course === undefined) {
            this._api.getUUID({alias})
                .then((response: string) => {
                    this.load(response);
                });
        }
    }

    /**
     * Create a new course and add to courses as soon as API call is successful
     *
     * @param course
     */
    public create(course: Course): void {
        this._api.createCourse({course} as CreateCourseRequest)
            .then((response: string) => {
                course.id = response;
                this._courses.push(course);

                this._api.createAlias({ objectId: course.id, objectType: ObjectType.COURSE})
                    .then((aliasResponse: string) => {
                        course.alias = aliasResponse;
                    });

            })
            .catch((error) => {
                throw new Error("Error creating course: " + error);
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

    public remove(object: Course): void {   // hier reicht vielleicht auch UUID?
        this._api.deleteCourse({courseId: object.id} as DeleteCourseRequest)
            .then((response) => {
                const index = this._courses.indexOf(object, 0);
                if (index > -1) {
                    this._courses.splice(index, 1);
                }
            });
    }

    /**
     * Getter for loaded courses.
     */
    get all(): Course[] {
        return this._courses;
    }

    /**
     * Getter for single loaded course.
     */
    get one(): Course | undefined {
        return this._course;
    }
}
