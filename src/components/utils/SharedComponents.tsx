import React, { PropsWithChildren } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  withWidth,
  Typography,
  Grow,
  GrowProps,
  TypographyTypeMap,
  WithWidth,
  ButtonProps,
} from "@material-ui/core";

const FadeInButtonStyles = (delay = 125) => {
  return makeStyles({
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
  })();
};

interface FadeInButtonProps {
  delay?: number;
}

export const FadeInButton = (props: FadeInButtonProps & ButtonProps) => {
  const classes = FadeInButtonStyles(props.delay);
  return <Button className={classes.root} {...props} />;
};

export const DefaultDialogTransition = (props: GrowProps) => (
  <Grow in {...props} />
);

// -------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  title: {
    margin: `${theme.spacing()}px ${theme.spacing(2)}px`,
  },
}));

interface Variants {
  [key: string]: TypographyTypeMap<{}, "span">["props"]["variant"];
}

const subTitleVariants: Variants = {
  xs: "h5",
  sm: "h4",
  md: "h4",
  lg: "h3",
  xl: "h3",
};

const titleVariants: Variants = {
  xs: "h4",
  sm: "h3",
  md: "h3",
  lg: "h2",
  xl: "h2",
};

type ComponentType = "h1" | "h2";

const Title = (variants: Variants, component: ComponentType = "h1") =>
  withWidth()(({ children, width }: PropsWithChildren<WithWidth>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();
    return (
      <Typography
        className={classes.title}
        variant={variants[width]}
        component={component}
      >
        {children}
      </Typography>
    );
  });

export const ResponsiveTitle = Title(titleVariants);
export const ResponsiveSubTitle = Title(subTitleVariants, "h2");
