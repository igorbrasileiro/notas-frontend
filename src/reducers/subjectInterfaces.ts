export type Id = {
  _id: string;
};

export type id = Id[keyof Id];

interface Subject extends Id {
  createdAt: string;
  name: string;
}

export interface SubjectConfig extends Id {
  gradeColumns: string;
  studentIdentification: string;
  studentIdentificationColumn: string;
  subject: Subject;
  grades?: string[];
}

interface SubjectById {
  [key: string]: SubjectConfig;
}

export interface SubjectReduceState {
  allIds: string[];
  byId: SubjectById;
}
