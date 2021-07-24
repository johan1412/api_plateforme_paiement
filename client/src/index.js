import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import Demo from './components/demo';

ReactDOM.render(<Demo />, document.querySelector('#root'));


// ReactDOM.render(
//   <BrowserRouter>
//     <Demo />
//     {/* <App /> */}
//   </BrowserRouter>,
//   document.getElementById("root")
// );

