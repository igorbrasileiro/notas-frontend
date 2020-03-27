import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TeacherSubjectCard from "./TeacherSubjectCard";

const TeacherSubjectList = ({ subjects }) =>
  subjects.map((subject) => (
    <TeacherSubjectCard key={subject._id} subject={subject} />
  ));

TeacherSubjectList.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      spreadsheetId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function mapStateToProps({ subject }) {
  return {
    subjects: subject.allIds.map((id) => subject.byId[id]),
  };
}

export default connect(mapStateToProps)(TeacherSubjectList);
