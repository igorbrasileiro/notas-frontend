import React, { FC } from "react";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";

import SubjectCard from "./SubjectCard";
import { StudentSubjectConfig } from "../../../reducers/subjectInterfaces";

const STUDENT_SUBJECTS = loader(
  "../../../graphql/subjects/StudentSubjects.graphql"
);

const SubjectList: FC = () => {
  const { data, loading } = useQuery(STUDENT_SUBJECTS);
  const subjects = data?.studentSubjects;

  return loading ? (
    <CircularProgress />
  ) : (
    subjects.map((subject: StudentSubjectConfig) => {
      return <SubjectCard key={subject._id} subject={subject} />;
    })
  );
};

export default SubjectList;
