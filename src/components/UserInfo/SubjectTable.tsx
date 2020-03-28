import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  Paper,
  Typography,
  makeStyles,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    paddingTop: theme.spacing(3),
    margin: theme.spacing(3),
  },
  paper: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const SubjectTable: FC = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.title}>
        Lista de Disciplinas
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Disciplina</TableCell>
            <TableCell variant="head">Sheetid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Portugues</TableCell>
            <TableCell>saudad-asdadsadsuda-</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>é Nós</TableFooter>
      </Table>
    </Paper>
  );
};

export default SubjectTable;
