import React, { FC, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
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
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

import { FadeInButton } from "../utils/SharedComponents";

const CREATE_USER = loader("../../graphql/user/createUser.graphql");
const LOGIN = loader("../../graphql/user/login.graphql");

const DEFAULT_ANIMATION_TIMING = 700;

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
  signupContainer: {
    animation: `$translatedFadein ${DEFAULT_ANIMATION_TIMING}ms 1`,
    borderRadius: 5,
    padding: 12,
    zIndex: 10,
    marginTop: "auto",
    marginBottom: "auto",
    "@media screen and (min-width: 1920px)": {
      signupContainer: {
        width: "30%",
      },
    },
  },
  "@media screen and (min-width: 1280px) and (max-width: 1919px)": {
    signupContainer: {
      width: "40%",
    },
  },

  "@media screen and (min-width: 960px) and (max-width: 1279px)": {
    signupContainer: {
      width: "50%",
    },
  },

  "@media screen and (min-width: 600px) and (max-width: 959px)": {
    signupContainer: {
      width: "70%",
    },
  },

  "@media screen and (max-width: 599px)": {
    signupContainer: {
      width: "95%",
    },
  },
  "@keyframes translatedFadein": {
    "0%": {
      "animation-timing-function": "ease-in-out",
      opacity: 0,
      transform: "translateY(100px)",
    },

    "50%": {
      opacity: 0.8,
      transform: "translateY(20px)",
    },

    "70%": {
      opacity: 0.9,
      transform: "translateY(10px)",
    },

    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  signupButtonProgress: {
    left: "50%",
    marginLeft: -12,
    marginTop: -12,
    position: "absolute",
    top: "50%",
    zIndex: 1,
  },
  formControl: {
    marginBottom: theme.spacing(),
  },
  signupButtonWrapper: {
    margin: theme.spacing(),
    position: "relative",
  },
  signupSubmitButton: {
    width: "100%",
  },
}));

interface SignUpExternalProps {
  onHandleSignIn: () => void;
}

type Props = SignUpExternalProps;

const Signup: FC<Props> = ({ onHandleSignIn }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const [createUser, { data: createdUser, loading }] = useMutation(CREATE_USER);
  const [login, { data: logged }] = useLazyQuery(LOGIN);
  const { values, errors, touched, handleChange, handleReset } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    onSubmit: () => {},
    validationSchema: Yup.object().shape({
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
        .oneOf(["STUDENT", "TEACHER"])
        .required("Tipo obrigatório."),
    }),
  });

  useEffect(() => {
    if (!createdUser?.createUser) {
      return;
    }

    login({
      variables: {
        input: {
          email: createdUser.createUser.email,
          password: values.password,
        },
      },
    });
  }, [createdUser, login, values]);

  useEffect(() => {
    if (!logged?.login) {
      return;
    }
    localStorage.setItem("token", logged.login);
    history.push("/");
    handleReset(null);
  }, [handleReset, history, logged]);

  return (
    <Paper className={classes.signupContainer}>
      <form className={classes.form}>
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
            <MenuItem value="STUDENT">Aluno</MenuItem>
            <MenuItem value="TEACHER">Professor</MenuItem>
          </Select>
        </FormControl>
        <div className={classes.signupButtonWrapper}>
          <FadeInButton
            className={classes.signupSubmitButton}
            color="primary"
            disabled={loading}
            onClick={() => createUser({ variables: { user: values } })}
          >
            Registrar
          </FadeInButton>
          {loading && (
            <CircularProgress
              size={24}
              className={classes.signupButtonProgress}
            />
          )}
        </div>
        <FadeInButton
          color="secondary"
          delay={DEFAULT_ANIMATION_TIMING * 1.3}
          onClick={onHandleSignIn}
        >
          Login
        </FadeInButton>
      </form>
    </Paper>
  );
};

export default Signup;
