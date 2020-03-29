import React, { FC } from "react";

import SubjectList from "./SubjectList";
import CreateSubjectCard from "./CreateSubjectCard";

const StudentCards: FC = () => (
  <>
    <CreateSubjectCard />
    <SubjectList />
  </>
);

export default StudentCards;
