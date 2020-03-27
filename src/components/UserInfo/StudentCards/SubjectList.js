import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SubjectCard from "./SubjectCard";

const SubjectList = ({ subjects = [] }) =>
  subjects.map((subject) => (
    <SubjectCard key={subject._id} subject={subject} />
  ));

SubjectList.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      gradeColumns: PropTypes.string.isRequired,
      studentIdentification: PropTypes.string.isRequired,
      studentIdentificationColumn: PropTypes.string.isRequired,
      subject: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

function mapStateToProps({ subject }) {
  return {
    subjects: subject.allIds.map((id) => subject.byId[id]),
  };
}

export default connect(mapStateToProps)(SubjectList);
