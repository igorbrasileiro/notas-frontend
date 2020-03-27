import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form, withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { capitalize } from "@material-ui/core/utils";
import {
  Grow,
  Zoom,
  Input,
  Button,
  Dialog,
  withWidth,
  InputLabel,
  withStyles,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  FormHelperText,
  CircularProgress,
  withMobileDialog,
} from "@material-ui/core";

import { post } from "../../utils/HTTPClient";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const Transition = (props) => {
  return <Grow in {...props} />;
};

const styles = (theme) => ({
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
    marginBottom: theme.spacing.unit,
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
});

function getErrorMessage(errorStatus) {
  switch (errorStatus) {
    case "0":
      return "Houve algum problema na conexão.";
    case "404":
      return "Login ou senha estão incorretos";
    default:
      return "Algo de errado aconteceu.";
  }
}

const Signin = ({
  classes,
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
}) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      onBackdropClick={handleReset}
      classes={{
        paper: classes[`signinDialogRoot${capitalize(width)}`],
      }}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <StyledForm>
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
                onClick={handleSubmit}
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
        </StyledForm>
      </DialogContent>
    </Dialog>
  );
};

Signin.defaultProps = {
  open: false,
};

Signin.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    requestError: PropTypes.string,
  }).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(
  withWidth()(
    withMobileDialog({
      breakpoint: "xs",
    })(
      withRouter(
        withFormik({
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
          handleSubmit(values, { setSubmitting, props, resetForm }) {
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
              .catch(setSubmitting(false));
          },
          enableReinitialize: true,
        })(Signin)
      )
    )
  )
);
