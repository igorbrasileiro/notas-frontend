import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "../utils/theme";
import Route from "./Routes";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Route />
    </MuiThemeProvider>
  );
};

export default App;
