import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter  } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import App from "./App";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6b75ea"
    },
    secondary: {
      main: "#0566D8"
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
