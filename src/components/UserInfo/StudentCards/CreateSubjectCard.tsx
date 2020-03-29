import * as Yup from "yup";
import { connect } from "react-redux";
import React, { useState } from "react";
import { Form, withFormik, FormikProps, FormikBag } from "formik";
import {
  Card,
  Zoom,
  Input,
  Button,
  Collapse,
  CardHeader,
  InputLabel,
  FormControl,
  CardContent,
  FormHelperText,
  CardActions,
  makeStyles,
} from "@material-ui/core";
import { AxiosPromise } from "axios";

import { createStudentSubject } from "../../../actions/subject";

interface FormikValues {
  gradeColumns?: string;
  studentIdentification?: string;
  studentIdentificationColumn?: string;
  subject: string;
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

const fields: Array<keyof FormikValues> = [
  "gradeColumns",
  "studentIdentification",
  "studentIdentificationColumn",
  "subject",
];

const convertToLabel = (field: keyof FormikValues) => {
  switch (field) {
    case "gradeColumns":
      return "Colunas de Notas";
    case "studentIdentification":
      return "Sua Identificação na Planilha";
    case "studentIdentificationColumn":
      return "Coluna da Sua Identificação";
    case "subject":
      return "Identiticação de Planilha Google";
    default:
      return "";
  }
};

const CreateSubjectCard = ({
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

  const handleUnexpandCard = () => {
    setExpanded(false);
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
            {fields.map((field: keyof FormikValues) => (
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
            onClick={handleUnexpandCard}
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
      dispatch(createStudentSubject(input)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues() {
      return {
        gradeColumns: "",
        studentIdentification: "",
        studentIdentificationColumn: "",
        subject: "",
      };
    },
    validationSchema: () =>
      Yup.object().shape({
        gradeColumns: Yup.string().matches(/\w+!\w+\d*:\w+\d*/, {
          message: "Padrão da(s) Coluna(s) de Nota(s) errado!",
          excludeEmptyString: true,
        }),
        studentIdentification: Yup.string().required(
          "Sua Identificação não pode ser vazio!"
        ),
        studentIdentificationColumn: Yup.string().matches(/\w+!\w+\d*:\w+\d*/, {
          message: "Padrão da Coluna de Sua Identificação está errado!",
          excludeEmptyString: true,
        }),
        subject: Yup.string().matches(/(\w|\d|[-|_]?)+/, {
          message: "Padrão da Identificação da disciplina está errado!",
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
      props.createSubject(values).then((res) => {
        if (!res.data) {
          return;
        }

        setSubmitting(false);
        resetForm({
          gradeColumns: "",
          studentIdentification: "",
          studentIdentificationColumn: "",
          subject: "",
        });
      });
    },
  })(CreateSubjectCard)
);
