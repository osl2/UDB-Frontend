import Course from '@/dataModel/Course';
import {
  AliasResponse,
  CreateCourseRequest,
  DefaultApi,
  DeleteCourseRequest, GetAliasRequest,
  GetCourseRequest,
  ObjectType,
  UpdateCourseRequest,
} from "@/api/DefaultApi";
import DataManagementService from "@/services/DataManagementService";
import ApiControllerAbstract from "@/controller/ApiControllerAbstract";

export default class CourseController extends ApiControllerAbstract implements DataManagementService<Course> {

  private _courses: Map<string, Course>;  // The Map is not reactive, so needs to be reassigned on change
  private _aliases: Map<string, string>;

  constructor(api: DefaultApi) {
    super(api);
    this._courses = new Map<string, Course>();
    this._aliases = new Map<string, string>();
  }

  /**
   * Loads all courses available to the currently logged in Teacher
   */
  public loadAll(): void {
    this.api.getCourses()
      .then((response: Course[]) => {
        response.forEach((course: Course) => {
          this.api.getAlias({uuid: course.id} as GetAliasRequest)
            .then((aliasResponse: AliasResponse) => {
              course.alias = aliasResponse.alias;
              this._aliases = new Map<string, string>(this._aliases.set(course.alias, course.id));
              this._courses = new Map<string, Course>(this._courses.set(course.id, course));
            })
            .catch((response) => {
            throw new Error("Error getting course alias: " + response.status + " " + response.statusText);
          });
        });
      }).catch((response) => {
      throw new Error("Error loading coursses: " + response.status + " " + response.statusText);
    });
  }

  /**
   * Loads a course with given id
   *
   * @param id
   */
  public load(id: string): void {
    const courseTemp = this._courses.get(id);
    if (courseTemp === undefined && id !== undefined) {
      this.api.getCourse({courseId: id} as GetCourseRequest)
        .then((course: Course) => {
          this.api.getAlias({uuid: course.id} as GetAliasRequest)
            .then((response: AliasResponse) => {
              course.alias = response.alias;
              this._aliases = new Map<string, string>(this._aliases.set(course.alias, course.id));
              this._courses = new Map<string, Course>(this._courses.set(course.id, course));
            }).catch((response) => {
            throw new Error("Error loading course alias: " + response.status + " " + response.statusText);
          });
        })
        .catch((response) => {
          throw new Error("Error loading course: " + response.status + " " + response.statusText);
        });
    }
  }

  /**
   * Load a course when given the alias
   * @param alias
   */
  public loadWithAlias(alias: string): void {
    const tmpCourse = Array.from(this._courses.values()).find((course) => course.alias === alias);

    if (tmpCourse === undefined) {
      this.api.getUUID({alias})
        .then((response: AliasResponse) => {
          if (response.objectType === ObjectType.COURSE) {
            this._aliases = new Map<string, string>(this._aliases.set(alias, response.uuid));
            this.api.getCourse({courseId: response.uuid} as GetCourseRequest)
              .then((course: Course) => {
                this._courses = new Map<string, Course>(this._courses.set(course.id, course));
              }).catch((response) => {
              throw new Error("Error getting course: " + response.status + " " + response.statusText);
            });
          }
        })
        .catch((response) => {
          throw new Error("Error loading course: " + response.status + " " + response.statusText);
        });
    }
  }

  /**
   * Create a new course and add to courses as soon as API call is successful
   *
   * @param course
   */
  public create(course: Course): Promise<string> {
    return this.api.createCourse({course} as CreateCourseRequest)
      .then((response: string) => {
        course.id = response;
        this._courses = new Map<string, Course>(this._courses.set(course.id, course));

        this.api.createAlias({objectId: course.id, objectType: ObjectType.COURSE})
          .then((aliasResponse: string) => {
            course.alias = aliasResponse;
            this._aliases = new Map<string, string>(this._aliases.set(course.alias, course.id));
            this._courses = new Map<string, Course>(this._courses);
          })
          .catch((error) => {
            throw new Error("Error creating alias for course " + course.id + ": " + error);
          });
        return course.id;
      })
      .catch((error) => {
        throw new Error("Error creating course: " + error);
      });
  }

  public save(object: Course): void {
    this.api.updateCourse({course: object, courseId: object.id} as UpdateCourseRequest)
      .then(() => {
        if (this._courses.get(object.id) !== undefined) {
            this._courses = new Map<string, Course>(this._courses.set(object.id, object));
        }
      }).catch((response) => {
      throw new Error("Error saving course: " + response.status + " " + response.statusText);
    });
  }

  /**
   * Delete course and sync with backend.
   * @param object
   */
  public remove(object: Course): void {
    this.api.deleteCourse({courseId: object.id} as DeleteCourseRequest)
      .then((response) => {
          this._courses.delete(object.id);
          this._aliases.delete(object.alias);
          this._aliases = new Map<string, string>(this._aliases);
          this._courses = new Map<string, Course>(this._courses);
      }).catch((response) => {
      throw new Error("Error deleting course: " + response.status + " " + response.statusText);
    });
  }

  public get(id: string): Course {
      const course = this._courses.get(id);
      if (course === undefined) {
          throw Error("Course not found");
      }
      return course;
  }

  public getWithAlias(alias: string): Course {
      const tempCourse = Array.from(this._courses.values()).find((course) => course.alias === alias);
      if (tempCourse === undefined) {
          throw Error("Course not found");
      }
      return tempCourse;
  }

  get all(): Course[] {
      return Array.from(this._courses.values());
  }

  get courses(): Map<string, Course> {
      return this._courses;
  }

  get aliases(): Map<string, string> {
    return this._aliases;
  }
}
