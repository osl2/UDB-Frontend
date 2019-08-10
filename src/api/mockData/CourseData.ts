import Course from "@/dataModel/Course";
import UUIDGenerator from "@/api/mockData/UUIDGenerator";

export default class CourseData {
  public courseDataMap: Map<string, Course> = new Map<string, Course>();


  public createCourse(course: Course) {
    course.id = UUIDGenerator.uuid();
    course.alias = course.id;
    this.courseDataMap.set(course.id, course);
  }

  public updateCourse(course: Course) {
    this.courseDataMap.set(course.id, course);
  }

  public getCourse(courseId: string): Course {
    if (this.courseDataMap.has(courseId)) {
      return this.courseDataMap.get(courseId)!;
    } else {
      throw new Error("Course does not exist " + courseId);
    }
  }

  public getAll(): Course[] {
    const result: Course[] = [];
    this.courseDataMap.forEach((value, key) => {
      result.push(value);
    });
    return result;
  }

  public removeCourse(courseId: string) {
    this.courseDataMap.delete(courseId);
  }
}
