import React from "react";
import { Form } from "formik";
import PropTypes from "prop-types";
import {
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Zoom,
} from "@material-ui/core";

const fields = ["name", "spreadsheetId"];

const convertToLabel = (field) => {
  switch (field) {
    case fields[0]:
      return "Nome da Disciplina";
    case fields[1]:
      return "Spreadsheet ID";
    default:
      return "";
  }
};

const TeacherCardContent = ({
  classes,
  errors,
  handleChange,
  touched,
  values,
}) => (
  <CardContent>
    <Form className={classes.form}>
      {fields.map((field) => (
        <FormControl
          key={field}
          className={classes.formControl}
          error={touched[field] && errors[field] !== undefined}
        >
          <InputLabel shrink margin="dense" htmlFor={field}>
            {convertToLabel(field)}
          </InputLabel>
          <Input name={field} value={values[field]} onChange={handleChange} />
          {touched[field] && errors[field] && (
            <Zoom in>
              <FormHelperText id={`create-subject__${field}-error-text`}>
                {errors[field]}
              </FormHelperText>
            </Zoom>
          )}
        </FormControl>
      ))}
    </Form>
  </CardContent>
);

TeacherCardContent.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    spreadsheetId: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  touched: PropTypes.shape({
    name: PropTypes.bool,
    spreadsheetId: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
    spreadsheetId: PropTypes.string.isRequired,
  }).isRequired,
};
