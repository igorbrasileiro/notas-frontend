import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import TeacherSubjectCard from "./TeacherSubjectCard";
import {
  SubjectReduceState,
  TeacherSubjectConfig,
} from "../../../reducers/subjectInterfaces";

const TeacherSubjectList = () => {
  const { allIds, byId } = useSelector(
    ({
      subject,
    }: {
      subject: SubjectReduceState<TeacherSubjectConfig>;
    }): SubjectReduceState<TeacherSubjectConfig> => subject
  );
  const subjects: TeacherSubjectConfig[] = useMemo(
    () => allIds.map((id: string): TeacherSubjectConfig => byId[id]),
    [allIds, byId]
  );

  return (
    <>
      {subjects.map((subject) => (
        <TeacherSubjectCard key={subject._id} subject={subject} />
      ))}
    </>
  );
};

export default TeacherSubjectList;
