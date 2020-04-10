import React, { FC } from "react";
import { useSelector } from "react-redux";

import SubjectCard from "./SubjectCard";
import {
  SubjectReduceState,
  StudentSubjectConfig,
  id,
} from "../../../reducers/subjectInterfaces";

const SubjectList: FC = () => {
  const { byId, allIds } = useSelector(
    ({
      subject,
    }: {
      subject: SubjectReduceState<StudentSubjectConfig>;
    }): SubjectReduceState<StudentSubjectConfig> => subject
  );
  return (
    <>
      {allIds.map((subjectId: id) => {
        const subject: StudentSubjectConfig = byId[subjectId];
        return <SubjectCard key={subject._id} subject={subject} />;
      })}
    </>
  );
};

export default SubjectList;
