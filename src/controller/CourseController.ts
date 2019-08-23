import Course from '@/dataModel/Course';
import {
    AliasResponse,
    CreateCourseRequest,
    DefaultApi,
    DeleteCourseRequest,
    GetAliasRequest,
    GetCourseRequest,
    ObjectType,
    UpdateCourseRequest,
} from '@/api/DefaultApi';
import DataManagementService from '@/services/DataManagementService';
import ApiControllerAbstract from '@/controller/ApiControllerAbstract';

export default class CourseController extends ApiControllerAbstract implements DataManagementService<Course> {
    constructor(api: DefaultApi) {
        super(api);
    }

    public getAll(): Promise<Course[]> {
        return this.api.getCourses().then((response: Course[]) => {
            const promises = response.map((course: Course) =>
                this.api.getAlias({ uuid: course.id } as GetAliasRequest)
            );
            return Promise.all(promises).then((aliasResponses: AliasResponse[]) => {
                for (let i = 0; i < response.length; i++) {
                    response[i].alias = aliasResponses[i].alias;
                }
                return response;
            });
        });
    }

    public get(id: string): Promise<Course> {
        return this.api.getCourse({ courseId: id } as GetCourseRequest).then((course: Course) => {
            return this.api.getAlias({ uuid: course.id } as GetAliasRequest).then((response: AliasResponse) => {
                course.alias = response.alias;
                return course;
            });
        });
    }

    public getWithAlias(alias: string): Promise<Course> {
        return this.api.getUUID({ alias }).then((response: AliasResponse) => {
            if (response.objectType === ObjectType.COURSE) {
                return this.api.getCourse({ courseId: response.uuid } as GetCourseRequest).then((course: Course) => {
                    course.alias = response.alias;
                    return course;
                });
            }
            return Promise.reject('Alias type wrong!');
        });
    }

    /**
     * Create a new course and add to courses as soon as API call is successful
     *
     * @param course
     */
    public create(course: Course): Promise<string> {
        return this.api.createCourse({ course } as CreateCourseRequest).then((response: string) => {
            course.id = response;
            return this.api
                .createAlias({ objectId: course.id, objectType: ObjectType.COURSE })
                .then((aliasResponse: string) => {
                    course.alias = aliasResponse;
                    return course.id;
                });
        });
    }

    public save(object: Course): Promise<void> {
        return this.api.updateCourse({ course: object, courseId: object.id } as UpdateCourseRequest);
    }

    /**
     * Delete course and sync with backend.
     * @param object
     */
    public remove(object: Course): Promise<void> {
        return this.api.deleteCourse({ courseId: object.id } as DeleteCourseRequest);
    }
}
