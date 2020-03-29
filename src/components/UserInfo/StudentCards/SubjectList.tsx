import React, { FC } from "react";
import { useSelector } from "react-redux";

import SubjectCard from "./SubjectCard";
import {
  SubjectReduceState,
  SubjectConfig,
  id,
} from "../../../reducers/subjectInterfaces";

const SubjectList: FC = () => {
  const { byId, allIds } = useSelector(
    ({ subject }: { subject: SubjectReduceState }): SubjectReduceState =>
      subject
  );
  return (
    <>
      {allIds.map((subjectId: id) => {
        const subject: SubjectConfig = byId[subjectId];
        return <SubjectCard key={subject._id} subject={subject} />;
      })}
    </>
  );
};

export default SubjectList;
