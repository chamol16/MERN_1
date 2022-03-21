import React, { Component } from "react";
import { render } from "react-dom";
import App from "./App";
import Footer from './Footer';
import Nav from "./Navigation";

render(<App />, document.getElementById("app"));
render(<Footer />, document.getElementById("footer"));
render(<Nav />, document.getElementById("nav"));

