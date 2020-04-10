import * as Yup from "yup";
import { connect } from "react-redux";
import { Form, withFormik, FormikProps, FormikBag } from "formik";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Collapse,
  FormControl,
  InputLabel,
  Input,
  CardActions,
  Button,
  FormHelperText,
  CardContent,
  Zoom,
  makeStyles,
} from "@material-ui/core";
import { AxiosPromise } from "axios";

import { createTeacherSubject } from "../../../actions/subject";

interface FormikValues {
  name: string;
  spreadsheetId: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  paper: {
    backgroundColor: "inherit",
    boxShadow: "none",
  },
  addButton: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(),
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
  },
  formControl: {
    marginBottom: theme.spacing(),
    width: "100%",
    "&:not(:last-child)": {
      marginRight: theme.spacing(),
    },
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(),
  },
}));

const fields: Array<keyof FormikValues> = ["name", "spreadsheetId"];

const convertToLabel = (field: string) => {
  switch (field) {
    case fields[0]:
      return "Nome da Disciplina";
    case fields[1]:
      return "Spreadsheet ID";
    default:
      return "";
  }
};

const TeacherCreateSubjectCard = ({
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
  touched,
  values,
}: FormikProps<FormikValues>) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandCard = () => {
    setExpanded(true);
  };

  return (
    <Card
      className={classes.root}
      classes={{
        root: classes.paper,
      }}
    >
      <CardHeader
        title="Adicione Nova Disciplina"
        action={
          !expanded && (
            <Button
              className={classes.addButton}
              variant="contained"
              color="primary"
              disabled={expanded}
              onClick={handleExpandCard}
            >
              Adicionar
            </Button>
          )
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                <Input
                  name={field}
                  value={values[field]}
                  onChange={handleChange}
                />
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
        <CardActions className={classes.actions}>
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="secondary"
            onClick={handleExpandCard}
          >
            Fechar
          </Button>
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            Adicionar
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    createSubject: (input: FormikValues) =>
      dispatch(createTeacherSubject(input)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues() {
      return {
        name: "",
        spreadsheetId: "",
      };
    },
    validationSchema: () =>
      Yup.object().shape({
        name: Yup.string().required("Nome da Disciplina não pode ser vazio!"),
        spreadsheetId: Yup.string().matches(/(\w|\d|[-|_]?)+/, {
          message: "Padrão da Spreadsheet ID está errado!",
          excludeEmptyString: true,
        }),
      }),
    handleSubmit(
      values,
      {
        props,
        resetForm,
        setSubmitting,
      }: FormikBag<
        { createSubject: (value: FormikValues) => AxiosPromise },
        FormikValues
      >
    ) {
      props
        .createSubject(values)
        .then((res) => {
          if (!res.data) {
            return;
          }
          setSubmitting(false);
          resetForm({
            name: "",
            spreadsheetId: "",
          });
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
  })(TeacherCreateSubjectCard)
);
