export enum Scope {
  Student = "student",
  Teacher = "teacher",
}

const scopeList: Record<Scope, string[]> = {
  teacher: [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.rosters.readonly",
    "https://www.googleapis.com/auth/classroom.announcements",
  ],
  student: [],
};

export const getScopeInfo = (scope: Scope) => scopeList[scope].join(" ");
