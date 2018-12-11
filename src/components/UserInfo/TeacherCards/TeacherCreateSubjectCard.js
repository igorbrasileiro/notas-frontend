import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, withFormik } from 'formik';
import React, { PureComponent } from 'react';
import { createTeacherSubject } from '../../../actions/subject';
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
  withStyles,
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

const fields = ['subjectName', 'spreadsheetId'];

const convertToLabel = field => {
  switch (field) {
    case fields[0]:
      return 'Nome da Disciplina';
    case fields[1]:
      return 'Spreadsheet ID';
    default:
      return '';
  }
};

class TeacherCreateSubjectCard extends PureComponent {
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
              onClick={this.handleExpandCard}
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

TeacherCreateSubjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    spreadsheetId: PropTypes.string,
    subjectName: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  touched: PropTypes.shape({
    spreadsheetId: PropTypes.bool,
    subjectName: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    spreadsheetId: PropTypes.string.isRequired,
    subjectName: PropTypes.string.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    createSubject: input => dispatch(createTeacherSubject(input)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(
  withFormik({
    mapPropsToValues() {
      return {
        spreadsheetId: '',
        subjectName: '',
      };
    },
    validationSchema: () =>
      Yup.object().shape({
        spreadsheetId: Yup.string().matches(/(\w|\d|[-|_]?)+/, {
          message: 'Padrão da Spreadsheet ID está errado!',
          excludeEmptyString: true,
        }),
        subjectName: Yup.string().required('Nome da Disciplina não pode ser vazio!'),
      }),
    handleSubmit(values, { props, resetForm, setSubmitting }) {
      props.createSubject(values).then(res => {
        if (res.data) {
          setSubmitting(false);
          resetForm({
            spreadsheetId: '',
            subjectName: '',
          });
        }
      });
    },
  })(withStyles(style)(TeacherCreateSubjectCard)),
);
