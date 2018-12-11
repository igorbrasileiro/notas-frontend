import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Form, withFormik } from 'formik';
import { createStudentSubject } from '../../actions/subject';
import {
  Card,
  Zoom,
  Input,
  Button,
  Collapse,
  CardHeader,
  InputLabel,
  withStyles,
  FormControl,
  CardContent,
  FormHelperText,
  CardActions,
} from '@material-ui/core';

const style = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
  },
  paper: {
    backgroundColor: 'inherit',
    boxShadow: 'none',
  },
  addButton: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formControl: {
    marginBottom: theme.spacing.unit,
    width: '100%',
    '&:not(:last-child)': {
      marginRight: theme.spacing.unit,
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.unit,
  },
});

const fields = ['gradeColumns', 'studentIdentification', 'studentIdentificationColumn', 'subject'];

const convertToLabel = field => {
  switch (field) {
    case 'gradeColumns':
      return 'Colunas de Notas';
    case 'studentIdentification':
      return 'Sua Identificação na Planilha';
    case 'studentIdentificationColumn':
      return 'Coluna da Sua Identificação';
    case 'subject':
      return 'Identiticação de Planilha Google';
    default:
      return '';
  }
};

class CreateSubjectCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.handleExpandCard = this.handleExpandCard.bind(this);
    this.handleUnexpandCard = this.handleUnexpandCard.bind(this);
  }

  handleExpandCard() {
    this.setState({ expanded: true });
  }

  handleUnexpandCard() {
    this.setState({ expanded: false });
  }

  render() {
    const {
      classes,
      errors,
      handleChange,
      handleSubmit,
      isSubmitting,
      touched,
      values,
    } = this.props;
    const { expanded } = this.state;

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
              <div className={classes.addButtonContainer}>
                <Button
                  className={classes.addButton}
                  variant="contained"
                  color="primary"
                  disabled={expanded}
                  onClick={this.handleExpandCard}
                >
                  Adicionar
                </Button>
              </div>
            )
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Form className={classes.form}>
              {fields.map(field => (
                <FormControl
                  key={field}
                  className={classes.formControl}
                  error={touched[field] && errors[field] !== undefined}
                >
                  <InputLabel shrink margin="dense" htmlFor={field}>
                    {convertToLabel(field)}
                  </InputLabel>
                  <Input name={field} value={values[field]} onChange={handleChange} />
                  {touched[field] &&
                    errors[field] && (
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
              onClick={this.handleUnexpandCard}
            >
              Fechar
            </Button>
            <Button
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Adicionar
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    );
  }
}

CreateSubjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    gradeColumns: PropTypes.string,
    studentIdentification: PropTypes.string,
    studentIdentificationColumn: PropTypes.string,
    subject: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  touched: PropTypes.shape({
    gradeColumns: PropTypes.bool,
    studentIdentification: PropTypes.bool,
    studentIdentificationColumn: PropTypes.bool,
    subject: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    gradeColumns: PropTypes.string.isRequired,
    studentIdentification: PropTypes.string.isRequired,
    studentIdentificationColumn: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    createSubject: input => dispatch(createStudentSubject(input)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(
  withFormik({
    mapPropsToValues() {
      return {
        gradeColumns: '',
        studentIdentification: '',
        studentIdentificationColumn: '',
        subject: '',
      };
    },
    validationSchema: () =>
      Yup.object().shape({
        gradeColumns: Yup.string().matches(/\w+!\w+\d*:\w+\d*/, {
          message: 'Padrão da(s) Coluna(s) de Nota(s) errado!',
          excludeEmptyString: true,
        }),
        studentIdentification: Yup.string().required('Sua Identificação não pode ser vazio!'),
        studentIdentificationColumn: Yup.string().matches(/\w+!\w+\d*:\w+\d*/, {
          message: 'Padrão da Coluna de Sua Identificação está errado!',
          excludeEmptyString: true,
        }),
        subject: Yup.string().matches(/(\w|\d|[-|_]?)+/, {
          message: 'Padrão da Identificação da disciplina está errado!',
          excludeEmptyString: true,
        }),
      }),
    handleSubmit(values, { props, resetForm, setSubmitting }) {
      props.createSubject(values).then(res => {
        if (res.data) {
          setSubmitting(false);
          resetForm({
            gradeColumns: '',
            studentIdentification: '',
            studentIdentificationColumn: '',
            subject: '',
          });
        }
      });
    },
  })(withStyles(style)(CreateSubjectCard)),
);
