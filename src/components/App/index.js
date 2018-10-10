import React from 'react';
import { Table, TableHead, TableRow, TableCell } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
`

const App = () => {
  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Disciplina</TableCell>
            <TableCell variant="head">Sheetid</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </Container>
  );
};

export default App;
