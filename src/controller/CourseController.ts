import ParentService from '@/services/ParentService';
import Course from '@/dataModel/Course';
import Worksheet from '@/dataModel/Worksheet';

export default class CourseController implements ParentService<Course, Worksheet> {
    public getChildren(object: Course): Worksheet[] {
        throw new Error("Method not implemented.");
    }
    public create(): Course {
        throw new Error("Method not implemented.");
    }
    public remove(object: Course): void {
        throw new Error("Method not implemented.");
    }
    public save(object: Course): void {
        throw new Error("Method not implemented.");
    }
    public get(id: string): Course {
        throw new Error("Method not implemented.");
    }
    public getAll(): Course[] {
        throw new Error("Method not implemented.");
    }
}
