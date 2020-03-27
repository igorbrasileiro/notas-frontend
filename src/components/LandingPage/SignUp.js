import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form, withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Zoom,
  Input,
  Paper,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
  Select,
  MenuItem,
} from "@material-ui/core";

import { FadeInButton } from "../utils/SharedComponents";
import { post } from "../../utils/HTTPClient";

const DEFAULT_ANIMATION_TIMING = 700;

const SignupContainer = styled(Paper)`
  animation: translatedFadein ${DEFAULT_ANIMATION_TIMING}ms 1;
  border-radius: 5px;
  padding: 12px;
  z-index: 10;
  margin-top: auto;
  margin-bottom: auto;

  @keyframes translatedFadein {
    0% {
      animation-timing-function: ease-in-out;
      opacity: 0;
      transform: translateY(100px);
    }

    50% {
      opacity: 0.8;
      transform: translateY(20px);
    }
    70% {
      opacity: 0.9;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (min-width: 1920px) {
    width: 30%;
  }

  @media screen and (min-width: 1280px) and (max-width: 1919px) {
    width: 40%;
  }

  @media screen and (min-width: 960px) and (max-width: 1279px) {
    width: 50%;
  }

  @media screen and (min-width: 600px) and (max-width: 959px) {
    width: 70%;
  }

  @media screen and (max-width: 599px) {
    width: 95%;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const styles = (theme) => ({
  signupButtonProgress: {
    left: "50%",
    marginLeft: -12,
    marginTop: -12,
    position: "absolute",
    top: "50%",
    zIndex: 1,
  },
  formControl: {
    marginBottom: theme.spacing.unit,
  },
  signupButtonWrapper: {
    margin: theme.spacing.unit,
    position: "relative",
  },
  signupSubmitButton: {
    width: "100%",
  },
});

const Signup = ({
  classes,
  handleChange,
  onHandleSignIn,
  values,
  errors,
  touched,
  isSubmitting,
  handleSubmit,
}) => (
  <SignupContainer>
    <StyledForm>
      <FormControl
        className={classes.formControl}
        error={touched.name && errors.name !== undefined}
      >
        <InputLabel htmlFor="name">Nome</InputLabel>
        <Input name="name" value={values.name} onChange={handleChange} />
        {touched.name && errors.name && (
          <Zoom in>
            <FormHelperText id="signup__name-error-text">
              {errors.name}
            </FormHelperText>
          </Zoom>
        )}
      </FormControl>
      <FormControl
        className={classes.formControl}
        error={touched.email && errors.email !== undefined}
      >
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        {touched.email && errors.email && (
          <Zoom in>
            <FormHelperText id="signup__email-error-text">
              {errors.email}
            </FormHelperText>
          </Zoom>
        )}
      </FormControl>
      <FormControl
        className={classes.formControl}
        error={touched.password && errors.password !== undefined}
      >
        <InputLabel htmlFor="password">Senha</InputLabel>
        <Input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {touched.password && errors.password && (
          <Zoom in>
            <FormHelperText id="signup__password-error-text">
              {errors.password}
            </FormHelperText>
          </Zoom>
        )}
      </FormControl>
      <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="type-required">Tipo</InputLabel>
        <Select
          name="role"
          value={values.role}
          onChange={handleChange}
          inputProps={{
            id: "type-required",
          }}
        >
          <MenuItem value="">Selecione seu tipo</MenuItem>
          <MenuItem value="student">Aluno</MenuItem>
          <MenuItem value="teacher">Professor</MenuItem>
        </Select>
      </FormControl>
      <div className={classes.signupButtonWrapper}>
        <FadeInButton
          className={classes.signupSubmitButton}
          color="primary"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          Registrar
        </FadeInButton>
        {isSubmitting && (
          <CircularProgress
            size={24}
            className={classes.signupButtonProgress}
          />
        )}
      </div>
      <FadeInButton
        color="secondary"
        delay={FadeInButton.defaultProps.delay * 1.3}
        onClick={onHandleSignIn}
      >
        Login
      </FadeInButton>
    </StyledForm>
  </SignupContainer>
);

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    password: PropTypes.string,
    requestError: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onHandleSignIn: PropTypes.func.isRequired,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    name: PropTypes.bool,
    password: PropTypes.bool,
    role: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(
  withFormik({
    mapPropsToValues() {
      return {
        name: "",
        email: "",
        password: "",
        role: "",
      };
    },
    validationSchema: () =>
      Yup.object().shape({
        email: Yup.string()
          .trim()
          .email("Você deve passar um email válido.")
          .required("Email obrigatório."),
        name: Yup.string()
          .trim()
          .lowercase()
          .min(6, "Nome deve ter pelo menos 6 caracteres.")
          .max(50, "Nome não pode ter mais de 50 caracteres.")
          .required("Nome obrigatório"),
        password: Yup.string()
          .min(6, "A senha deve ter pelo menos 6 caracteres.")
          .max(30, "Senha não pode ter mais que 30 caracteres.")
          .required("Senha obrigatória."),
        role: Yup.string()
          .oneOf(["student", "teacher"])
          .required("Tipo obrigatório."),
      }),
    handleSubmit(values, { setSubmitting, props, resetForm }) {
      post("user", values)
        .then(() => {
          setSubmitting(false);
          resetForm({
            name: "",
            email: "",
            password: "",
            role: "",
          });
          post("auth", { email: values.email, password: values.password })
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              props.history.push("/");
            })
            .catch();
        })
        .catch(setSubmitting(false));
    },
  })(withStyles(styles)(Signup))
);
