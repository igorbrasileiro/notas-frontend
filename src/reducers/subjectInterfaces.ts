export type Id = {
  _id: string;
};

export type id = Id[keyof Id];

interface Subject extends Id {
  createdAt: string;
  name: string;
}

export interface StudentSubjectConfig extends Id {
  gradeColumns: string;
  studentIdentification: string;
  studentIdentificationColumn: string;
  subject: Subject;
  grades?: string[];
}

export interface TeacherSubjectConfig extends Id {
  name: string;
  spreadsheetId: string;
}

export type SubjectConfig = TeacherSubjectConfig | StudentSubjectConfig;

interface SubjectById<T = SubjectConfig> {
  [key: string]: T;
}

export interface SubjectReduceState<T> {
  allIds: string[];
  byId: SubjectById<T>;
}
