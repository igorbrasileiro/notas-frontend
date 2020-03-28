import React, { PropsWithChildren, ReactNode } from "react";
import * as Yup from "yup";
import classNames from "classnames";
import { Form, withFormik, FormikProps, FormikBag, FormikErrors } from "formik";
import { withRouter, RouteComponentProps } from "react-router-dom";
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

import { post } from "../../utils/HTTPClient";

const Transition = (props: GrowProps) => {
  return <Grow in {...props} />;
};

interface SignInExternalProps extends RouteComponentProps {
  open: boolean;
  onClose: () => void;
}

interface FormikValues {
  email: string;
  password: string;
}

interface CustomFormikError extends FormikErrors<FormikValues> {
  requestError?: string;
}

type SignInInterProps = WithMobileDialog & {
  errors: CustomFormikError;
};

type Props = SignInExternalProps &
  FormikProps<FormikValues> &
  Partial<SignInInterProps> &
  PropsWithChildren<ReactNode>;

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

const Signin: React.FC<Props> = ({
  errors,
  fullScreen,
  handleChange,
  handleReset,
  handleSubmit,
  isSubmitting,
  values,
  open,
  onClose,
  touched,
  width,
}: Props) => {
  const classes = useStyles();
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
        <Form className={classes.form}>
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
            <Button color="primary" disabled={isSubmitting} onClick={onClose}>
              Cancelar
            </Button>
            <div className={classes.signinButtonSubmitWrapper}>
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
              >
                Login
              </Button>
              {isSubmitting && (
                <CircularProgress
                  size={24}
                  className={classes.singinButtonProgress}
                />
              )}
            </div>
          </DialogActions>
          {errors.requestError !== undefined && (
            <Zoom in>
              <FormHelperText error>
                {getErrorMessage(errors.requestError)}
              </FormHelperText>
            </Zoom>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};

Signin.defaultProps = {
  open: false,
};

const SignInFinalComponent = withMobileDialog({
  breakpoint: "xs",
})(
  withRouter(
    withFormik<SignInExternalProps, FormikValues>({
      mapPropsToValues() {
        return {
          email: "",
          password: "",
        };
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
      handleSubmit(
        values,
        { setSubmitting, props, resetForm }: FormikBag<SignInExternalProps, {}>
      ) {
        post("auth", values)
          .then((res) => {
            setSubmitting(false);
            localStorage.setItem("token", res.data.token);
            resetForm({
              email: "",
              password: "",
            });
            props.onClose();
            props.history.push("/");
          })
          .catch(() => setSubmitting(false));
      },
      enableReinitialize: true,
    })(Signin)
  )
);

export default SignInFinalComponent;
