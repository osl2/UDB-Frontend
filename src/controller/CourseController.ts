import Course from '@/dataModel/Course';
import {
  AliasResponse,
  CreateCourseRequest,
  DefaultApi,
  DeleteCourseRequest,
  GetCourseRequest,
  ObjectType,
  UpdateCourseRequest,
} from "@/api/DefaultApi";
import DataManagementService from "@/services/DataManagementService";
import ApiControllerAbstract from "@/controller/ApiControllerAbstract";

export default class CourseController extends ApiControllerAbstract implements DataManagementService<Course> {

  private _courses: Course[] = [];
  private _course?: Course = undefined;

  constructor(api: DefaultApi) {
    super(api);
  }

  /**
   * Loads all courses available to the currently logged in Teacher
   */
  public loadAll(): void {
    this.api.getCourses()
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
    if (this._course && this._course.id === id) {
      return;
    }
    const courseTemp = this._courses.find((course) => course.id === id);
    if (courseTemp === undefined) {
      this.api.getCourse({courseId: id} as GetCourseRequest)
        .then((response: Course) => {
          this._course = response;
        });
    } else {
      this._course = courseTemp;
    }
  }

  public loadWithAlias(alias: string): void {
    this._course = this._courses.find((course) => course.alias === alias);
    if (this._course === undefined) {
      this.api.getUUID({alias})
        .then((response: AliasResponse) => {
          if (response.objectType === ObjectType.COURSE) {
            this.load(response.uuid);
          }
        });
    }
  }

  /**
   * Create a new course and add to courses as soon as API call is successful
   *
   * @param course
   */
  public create(course: Course): void {
    this.api.createCourse({course} as CreateCourseRequest)
      .then((response: string) => {
        course.id = response;
        this._courses.push(course);

        this.api.createAlias({objectId: course.id, objectType: ObjectType.COURSE})
          .then((aliasResponse: string) => {
            course.alias = aliasResponse;
          });

      })
      .catch((error) => {
        throw new Error("Error creating course: " + error);
      });
  }

  public save(object: Course): void {
    this.api.updateCourse({course: object, courseId: object.id} as UpdateCourseRequest)
      .then(() => {
        const index = this._courses.findIndex((course) => course.id === object.id);
        if (index > -1) {
          this._courses[index] = object;
        }
      });
  }

  public remove(object: Course): void {   // hier reicht vielleicht auch UUID?
    this.api.deleteCourse({courseId: object.id} as DeleteCourseRequest)
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
