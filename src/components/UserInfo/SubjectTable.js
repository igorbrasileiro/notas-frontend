import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const styles = theme => ({
  title: {
    paddingTop: theme.spacing.unit * 3,
    margin: theme.spacing.unit * 3,
  },
});

const Wrapper = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
`;

const SubjectTable = ({ classes }) => (
  <Wrapper>
    <Paper>
      <Typography variant="title" className={classes.title}>
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
  </Wrapper>
);

SubjectTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubjectTable);
