import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import BackOffice from './BackOffice/Dashboard';

ReactDOM.render(
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>
  <BackOffice />,
  document.getElementById("root")
);

