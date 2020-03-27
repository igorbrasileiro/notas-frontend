import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, withWidth, Typography, Grow } from "@material-ui/core";

const FadeInButtonStyles = (delay) =>
  makeStyles({
    root: {
      animation: `$fadeIn ${delay * 2}ms`,
    },
    "@keyframes fadeIn": {
      "0%": {
        opacity: 0,
      },
      "50%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      },
    },
  });

export const FadeInButton = (props) => {
  const classes = FadeInButtonStyles(props.delay);
  return <Button className={classes.root} {...props} />;
};

export const DefaultDialogTransition = (props) => <Grow in {...props} />;

// -------------------------------------------------------
const styles = (theme) => ({
  title: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
});

const subTitleVariants = {
  xs: "h5",
  sm: "h4",
  md: "h4",
  lg: "h3",
  xl: "h3",
};

const titleVariants = {
  xs: "h4",
  sm: "h3",
  md: "h3",
  lg: "h2",
  xl: "h2",
};

const Title = (variants, component) =>
  withWidth()(
    withStyles(styles)(({ children, classes, width }) => (
      <Typography
        className={classes.title}
        variant={variants[width]}
        component={component}
      >
        {children}
      </Typography>
    ))
  );
Title.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.object,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  width: PropTypes.string,
};

Title.defaultProps = {
  component: "h1",
};

export const ResponsiveTitle = Title(titleVariants);
export const ResponsiveSubTitle = Title(subTitleVariants, "h2");
