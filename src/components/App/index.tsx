import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import theme from "../utils/theme";
import Route from "./Routes";

const Client = new ApolloClient({
  uri: "http://localhost:8001/",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

const App = () => {
  return (
    <ApolloProvider client={Client}>
      <MuiThemeProvider theme={theme}>
        <Route />
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

export default App;
