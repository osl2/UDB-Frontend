/**
 * The enum UserGroup represents different restrictions for different users.
 * Teacher: The user is authenticated via login to the teachers area.
 * Student: The user enters a course via the course id.
 * Admin: The admin.
 * Unauthenticated: Users in other areas of the application without one
 *                  of the rights listed above.
 */

enum UserGroup {
    Teacher,
    Student,
    Unauthenticated,
    Admin,
}

export default UserGroup;
