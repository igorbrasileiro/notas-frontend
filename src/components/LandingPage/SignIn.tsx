import React, { PropsWithChildren, ReactNode, useEffect, FC } from "react";
import * as Yup from "yup";
import classNames from "classnames";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import {
  Grow,
  Zoom,
  Input,
  Button,
  Dialog,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  FormHelperText,
  CircularProgress,
  withMobileDialog,
  Theme,
  makeStyles,
  GrowProps,
  WithMobileDialog,
} from "@material-ui/core";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

const LOGIN = loader("../../graphql/login.graphql");

const Transition = (props: GrowProps) => {
  return <Grow in {...props} />;
};

interface SignInExternalProps extends WithMobileDialog {
  open: boolean;
  onClose: () => void;
}

type Props = SignInExternalProps & PropsWithChildren<ReactNode>;

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  singinDialogRoot: {
    minWidth: "30vw",
  },
  signinDialogRootXs: {
    width: "100%",
  },
  signinDialogRootSm: {
    width: "70%",
  },
  signinDialogRootMd: {
    width: "50%",
  },
  signinDialogRootLg: {
    width: "40%",
  },
  signinDialogRootXl: {
    width: "30%",
  },
  formControl: {
    marginBottom: theme.spacing(),
  },
  signinButtonSubmitWrapper: {
    position: "relative",
  },
  singinButtonProgress: {
    left: "50%",
    marginLeft: -12,
    marginTop: -12,
    position: "absolute",
    top: "50%",
    zIndex: 1,
  },
}));

function getErrorMessage(errorStatus: string) {
  switch (errorStatus) {
    case "0":
      return "Houve algum problema na conexão.";
    case "404":
      return "Login ou senha estão incorretos";
    default:
      return "Algo de errado aconteceu.";
  }
}

const Signin: FC<Props> = ({ fullScreen, open, onClose, width }: Props) => {
  const classes = useStyles();
  const [login, { data, loading, error }] = useLazyQuery(LOGIN);
  const history = useHistory();

  const {
    handleChange,
    handleReset,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (formValues) => {
      login({ variables: { input: formValues } });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Email inválido.")
        .required("Email obrigatório."),
      password: Yup.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres.")
        .max(30, "Senha não pode ter mais que 30 caracteres.")
        .required("Senha obrigatória."),
    }),
  });

  useEffect(() => {
    const handleLogin = () => {
      if (!data?.login) {
        return;
      }
      localStorage.setItem("token", data.login);
      history.push("/");
    };

    handleLogin();
  }, [data, error, history]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      onBackdropClick={handleReset}
      classes={{
        paper: classNames({
          [classes.signinDialogRootXs]: width === "xs",
          [classes.signinDialogRootSm]: width === "sm",
          [classes.signinDialogRootMd]: width === "md",
          [classes.signinDialogRootLg]: width === "lg",
          [classes.signinDialogRootXl]: width === "xl",
        }),
      }}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form className={classes.form}>
          <FormControl
            className={classes.formControl}
            error={touched.email && errors.email !== undefined}
          >
            <InputLabel>Email: </InputLabel>
            <Input
              name="email"
              value={values.email || ""}
              onChange={handleChange}
            />
            {touched.email && errors.email && (
              <Zoom in>
                <FormHelperText id="signin__email-error-text">
                  {errors.email}
                </FormHelperText>
              </Zoom>
            )}
          </FormControl>
          <FormControl
            className={classes.formControl}
            error={touched.password && errors.password !== undefined}
          >
            <InputLabel htmlFor="signin__password">Senha</InputLabel>
            <Input
              id="signin__password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            {touched.password && errors.password && (
              <Zoom in>
                <FormHelperText id="signin__password-error-text">
                  {errors.password}
                </FormHelperText>
              </Zoom>
            )}
          </FormControl>
          <DialogActions>
            <Button color="primary" disabled={loading} onClick={onClose}>
              Cancelar
            </Button>
            <div className={classes.signinButtonSubmitWrapper}>
              <Button
                color="primary"
                disabled={loading}
                onClick={() => handleSubmit()}
              >
                Login
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.singinButtonProgress}
                />
              )}
            </div>
          </DialogActions>
          {error?.message && (
            <Zoom in>
              <FormHelperText error>
                {getErrorMessage(error.message)}
              </FormHelperText>
            </Zoom>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

Signin.defaultProps = {
  open: false,
};

const SignInFinalComponent = withMobileDialog({
  breakpoint: "xs",
})(Signin);

export default SignInFinalComponent;
